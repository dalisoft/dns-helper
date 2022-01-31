const RULES_COMMENT = `!
! Title: dalisoft's custom filter
! Description: Filter composed of several other filters based on user choice and simplified specifically to be better compatible with DNS-level ad blocking.
! Homepage: https://github.com/dalisoft/dns-helper
!
! Compiled by @dalisoft/dns-helper v1.0.0
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
#
# Filter composed of several other filters based on user choice and
# simplified specifically to be better compatible with DNS-level ad blocking
#
# Fetch the latest version of this file: https://github.com/dalisoft/dns-helper/releases/latest/download/hosts.txt
# Project home page: https://github.com/dalisoft/dns-helper
# Project releases: https://github.com/dalisoft/dns-helper/releases
#
# ===============================================================
`;

module.exports = { RULES_COMMENT, HOSTS_COMMENT };
