const hostsToList = (hosts_raw = '') => {
  const blocklist = hosts_raw
    .split('\n')
    .map((host) => {
      if (host.charAt(0) === '#') {
        return null;
      }
      const [ip, domain] = host.trim().split(' ');

      return host === ip ? ip : domain;
    })
    .filter((domain) => domain);

  return [{ type: 'blocklist', list: blocklist }];
};

module.exports = hostsToList;
