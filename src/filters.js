import nextdnsConfig from '../nextdns-config.json' assert { type: 'json' };
import constants from './constants.json' assert { type: 'json' };
import EXTERNAL_HOSTS from './e-hosts.json' assert { type: 'json' };

const { ACTIVE_ALLOW_RULE_PREFIX, ACTIVE_BLOCK_RULE_PREFIX } = constants;

export const rawFilters = Object.entries(EXTERNAL_HOSTS)
  .filter(([name]) =>
    nextdnsConfig.privacy.blocklists.find(({ id }) => id === name)
  )
  .map(function mapFilter([name, entry]) {
    if (Array.isArray(entry)) {
      return entry.map((filter, i) => mapFilter([`${name}_${i}`, filter]));
    }
    return { name, entry };
  })
  .flat();
export const filters = rawFilters.map(({ name, entry }) => {
  return {
    name,
    url: entry?.filters?.rules ?? entry?.filters.hosts,
    format: entry?.filters?.rules ? 'adbp' : 'hosts',
    moreinformation: entry?.link,
    outputfile: `${name.toLowerCase()}.txt`
  };
});
