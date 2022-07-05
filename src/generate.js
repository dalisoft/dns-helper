import fs from 'fs/promises';
import path from 'path';
import nextdnsConfig from '../nextdns-config.json' assert { type: 'json' };
import constants from './constants.json' assert { type: 'json' };
import { filters } from './filters.js';

const { ACTIVE_ALLOW_RULE_PREFIX, ACTIVE_BLOCK_RULE_PREFIX } = constants;

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
