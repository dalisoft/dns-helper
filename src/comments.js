const { name, description, version } = require('../package.json');

const RULES_COMMENT = `!
! Title: dalisoft's custom filter
! Version: ${version}
! Description: ${description}
! Homepage: https://github.com/dalisoft/dns-helper
!
! Compiled by ${name} ${version}
!
!
! Source name: dalisoft Custom DNS filters
! Source: https://github.com/dalisoft/dns-helper/releases/latest/download/rules.txt
!
!
! Section contains list of advertising networks
!
! The rules with hints are at the end of file
!
`;

const HOSTS_COMMENT = `# Title: dalisoft's custom filter
# Version: ${version}
#
# ${description}
#
# Fetch the latest version of this file: https://github.com/dalisoft/dns-helper/releases/latest/download/hosts.txt
# Project home page: https://github.com/dalisoft/dns-helper
# Project releases: https://github.com/dalisoft/dns-helper/releases
#
# Compiled by ${name} ${version}
#
# ===============================================================
`;

module.exports = { RULES_COMMENT, HOSTS_COMMENT };
