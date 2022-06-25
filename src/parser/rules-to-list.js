const {
  ACTIVE_ALLOW_RULE_PREFIX,
  ACTIVE_BLOCK_RULE_PREFIX
} = require('../constants.json');

const rulesToList = (rules_raw = '') => {
  const rules = rules_raw
    .split('\n')
    .map((rule) => {
      if (rule.charAt(0) === '!') {
        return null;
      }
      if (
        rule.length > 4 &&
        rule.substring(0, 4) === ACTIVE_ALLOW_RULE_PREFIX
      ) {
        return {
          type: 'allow',
          domain: rule.substring(4, rule.lastIndexOf('^')),
          active: true
        };
      } else if (
        rule.length > 2 &&
        rule.substring(0, 2) === ACTIVE_BLOCK_RULE_PREFIX
      ) {
        return {
          type: 'block',
          domain: rule.substring(2, rule.lastIndexOf('^')),
          active: true
        };
      }
    })
    .filter((rule) => rule);

  return [
    {
      type: 'whitelist',
      list: rules
        .filter(({ type }) => type === 'allow')
        .map(({ domain }) => domain)
    },
    {
      type: 'blocklist',
      list: rules
        .filter(({ type }) => type === 'block')
        .map(({ domain }) => domain)
    }
  ];
};

module.exports = rulesToList;
