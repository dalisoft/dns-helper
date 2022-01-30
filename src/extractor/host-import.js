const download = require('../utils/download');

const hostToBuffer = async (provider, info) => {
  if (Array.isArray(info)) {
    const lists = await Promise.all(
      info.map((_info) => hostToBuffer(provider, _info))
    );
    return lists.flat(1);
  }
  if (info.filters.hosts) {
    return [
      { provider, type: 'hosts', content: await download(info.filters.hosts) }
    ];
  }
  if (info.filters.rules) {
    return [
      { provider, type: 'rules', content: await download(info.filters.rules) }
    ];
  }
};

module.exports = hostToBuffer;
