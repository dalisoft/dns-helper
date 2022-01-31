const { name, description, version, homepage } = require('../package.json');

const RULES_COMMENT = `!
! Title: dalisoft's custom filter
! Description: ${description}
! Version: ${version}
! TimeUpdated: ${new Date().toISOString().split('.')[0] + '+00:00'}
!
!
! Title: dalisoft's custom filter
! Description: ${description}
! Homepage: ${homepage}
! License: https://github.com/AdguardTeam/AdguardSDNSFilter/blob/master/LICENSE
! Last modified: ${new Date().toISOString()}
!
! Compiled by ${name} ${version}
!
!
! Source name: dalisoft Custom DNS filters
! Source: ${homepage}/releases/latest/download/rules.txt
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
# Date: ${new Date().toString()}
#
# Fetch the latest version of this file: ${homepage}/releases/latest/download/hosts.txt
# Project home page: ${homepage}
# Project releases: ${homepage}/releases
#
# Compiled by ${name} ${version}
#
# ===============================================================

`;

module.exports = { RULES_COMMENT, HOSTS_COMMENT };
