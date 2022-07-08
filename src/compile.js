import fs from 'fs/promises';
import path from 'path';
import nextdnsConfig from '../nextdns-config.json' assert { type: 'json' };
import { HOSTS_COMMENT, RULES_COMMENT } from './comments.js';

const domains = (
  await fs.readFile(path.resolve('domains.txt'), { encoding: 'utf-8' })
)
  .split('\n')
  .filter((domain) => domain)
  .filter(
    (domain) =>
      !nextdnsConfig.allowlist.find(
        ({ domain: allowDomain, active }) => allowDomain === domain && active
      )
  );

const hosts = domains.map((domain) => `0.0.0.0 ${domain}`);
const rules = domains.map((domain) => `||${domain}^`);

await Promise.all([
  fs.writeFile(
    path.resolve('hosts.txt'),
    `${HOSTS_COMMENT}\n${hosts.join('\n')}`
  ),
  fs.writeFile(
    path.resolve('rules.txt'),
    `${RULES_COMMENT}\n${rules.join('\n')}`
  )
]);
