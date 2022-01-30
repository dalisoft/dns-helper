const mapFilters =
  (activePrefix, inactivePrefix) =>
  ({ domain, active }) =>
    active ? `${activePrefix}${domain}^|` : `${inactivePrefix}${domain}^|`;

module.exports = mapFilters;
