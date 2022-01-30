const download = require('../utils/download');

const hostToBuffer = async (info) => {
  if (Array.isArray(info)) {
    const lists = await Promise.all(info.map(hostToBuffer));
    return lists.flat(1);
  }
  if (info.filters.hosts) {
    return [{ type: 'hosts', content: await download(info.filters.hosts) }];
  }
  if (info.filters.rules) {
    return [{ type: 'rules', content: await download(info.filters.rules) }];
  }
};

module.exports = hostToBuffer;
