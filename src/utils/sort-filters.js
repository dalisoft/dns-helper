const sortFilters = (rules) =>
  rules.sort((a, b) => a.domain - b.domain).sort((a, b) => b.active - a.active);

module.exports = sortFilters;
