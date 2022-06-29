import fs from 'fs/promises';
import path from 'path';
import nextdnsConfig from '../nextdns-config.json' assert { type: 'json' };
import constants from './constants.json' assert { type: 'json' };
import EXTERNAL_HOSTS from './e-hosts.json' assert { type: 'json' };

const { ACTIVE_ALLOW_RULE_PREFIX, ACTIVE_BLOCK_RULE_PREFIX } = constants;

const filters = Object.entries(EXTERNAL_HOSTS)
  .filter(([name]) => nextdnsConfig.privacy.blocklists.includes(name))
  .map(function mapFilter([name, entry]) {
    if (Array.isArray(entry)) {
      return entry.map((filter, i) => mapFilter([`${name}_${i}`, filter]));
    }

    return {
      name,
      url: entry?.filters?.rules ?? entry?.filters.hosts,
      format: entry?.filters?.rules ? 'adbp' : 'hosts',
      moreinformation: entry?.link,
      outputfile: `${name.toLowerCase()}.txt`
    };
  })
  .flat();

const allowlist = nextdnsConfig.allowlist
  .filter(({ active }) => active)
  .map(({ domain }) => `${ACTIVE_ALLOW_RULE_PREFIX}${domain}^`);
const denylist = nextdnsConfig.denylist
  .filter(({ active }) => active)
  .map(({ domain }) => `${ACTIVE_BLOCK_RULE_PREFIX}${domain}^`);
const list = [...allowlist, ...denylist];

filters.unshift({
  name: 'System hosts',
  url: 'file:///etc/hosts',
  format: 'hosts',
  outputfile: 'hosts.txt'
});
filters.push({
  name: "dalisoft's Custom Filter",
  url: `file://${path.resolve('dalisoft.txt')}`,
  format: 'adbp',
  outputfile: 'dalisoft.txt'
});

await Promise.all([
  fs.writeFile('dalisoft.txt', list.join('\n')),
  fs.writeFile('lists.json', JSON.stringify(filters, null, 2))
]);
