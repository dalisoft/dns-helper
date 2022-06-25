const fs = require('fs/promises');
const path = require('path');
const mapFilters = require('./utils/map-filters');
const dedupe = require('./utils/dedupe');
const sortFilters = require('./utils/sort-filters');
const extractorHostImport = require('./extractor/host-import');
const hostsToList = require('./parser/hosts-to-list');
const CONSTANTS = require('./constants.json');
const EXTERNAL_HOSTS = require('./e-hosts.json');
const nextdnsConfig = require('../nextdns-config.json');
const rulesToList = require('./parser/rules-to-list');
const { RULES_COMMENT, HOSTS_COMMENT } = require('./comments');

// Extract `allowlist` and `denylist` from here
const { allowlist, denylist, privacy } = nextdnsConfig;
const safeHost = [
  'localhost',
  'local',
  'localhost.localdomain',
  'broadcasthost',
  '0.0.0.0',
  '127.0.0.1',
  'ip6-localhost',
  'ip6-loopback',
  'ip6-localnet',
  'ip6-mcastprefix',
  'ip6-allnodes',
  'ip6-allrouters',
  'ip6-allhosts'
];
const buggyRules = ['@@||@@||^'];
const ignoreHosts = ['fanboy-annoyance'];
const [runtime, execFile, type] = process.argv;

async function main() {
  const results = [];
  for (const provider of privacy.blocklists) {
    if (ignoreHosts.includes(provider)) {
      continue;
    }
    const result = await extractorHostImport(
      provider,
      EXTERNAL_HOSTS[provider]
    );
    results.push(result);
  }

  Promise.resolve(results)
    .then((results) => {
      return results
        .flat(1)
        .map((config) => {
          if (config.type === 'hosts') {
            return hostsToList(config.content);
          } else if (config.type === 'rules') {
            return rulesToList(config.content);
          }
          return {};
        })
        .flat(1);
    })
    .then((result) => {
      const blocklists = dedupe(
        [
          ...result
            .filter(({ type }) => type === 'blocklist')
            .map(({ list }) => list)
        ].flat(1)
      )
        .map((domain) => ({ active: true, domain }))
        .concat(denylist);
      const whitelists = dedupe(
        [
          ...result
            .filter(({ type }) => type === 'whitelist')
            .map(({ list }) => list)
        ].flat(1)
      )
        .map((domain) => ({ active: true, domain }))
        .concat(allowlist);

      return { blocklists, whitelists };
    })
    .then((result) => {
      if (type === '--rules') {
        result.blocklists = result.blocklists
          .filter(({ domain }) => domain && !safeHost.includes(domain))
          .map(
            mapFilters(
              CONSTANTS.ACTIVE_BLOCK_RULE_PREFIX,
              CONSTANTS.INACTIVE_BLOCK_RULE_PREFIX
            )
          );
        result.whitelists = result.whitelists
          .filter(({ domain }) => domain && !safeHost.includes(domain))

          .map(
            mapFilters(
              CONSTANTS.ACTIVE_ALLOW_RULE_PREFIX,
              CONSTANTS.INACTIVE_ALLOW_RULE_PREFIX
            )
          );

        result.mode = 'rules';
      } else if (type === '--hosts') {
        const whitelist = dedupe(
          result.whitelists
            .filter((entry) => entry.active && entry.domain)
            .map((entry) => entry.domain)
        );
        const hosts = dedupe(
          result.blocklists
            .filter(
              (block) =>
                block.active &&
                block.domain &&
                !whitelist.includes(block.domain) &&
                !safeHost.includes(block.domain)
            )
            .map((block) => block.domain)
        );

        result.whitelists.length = 0;
        result.blocklists = hosts.map((domain) => `0.0.0.0 ${domain}`);
        result.mode = 'hosts';
      }
      return result;
    })
    .then(({ mode, blocklists, whitelists }) => {
      const rules = dedupe([...blocklists, ...whitelists]).filter(
        (rule) => !buggyRules.includes(rule)
      );

      if (mode === 'rules') {
        return fs.writeFile(
          path.resolve('rules.txt'),
          RULES_COMMENT + rules.join('\n')
        );
      } else if (mode === 'hosts') {
        return fs.writeFile(
          path.resolve('hosts.txt'),
          HOSTS_COMMENT + rules.join('\n')
        );
      }
    });
}
main();
