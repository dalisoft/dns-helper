import pkg from '../package.json' assert { type: 'json' };
import { rawFilters } from './filters.js';
const { description, homepage, name, version } = pkg;

const RULES_COMMENT = `!
! Title: dalisoft's custom filter
! Version: ${version}
! Description: ${description}
! Homepage: ${homepage}
! TimeUpdated: ${new Date().toISOString().split('.')[0] + '+00:00'}
!
! License: ${homepage}/blob/master/LICENSE
! Last modified: ${new Date().toISOString()}
!
! Compiled by ${name} ${version}
!
!
! Source name: dalisoft Custom DNS filters
! Source: ${homepage}/blob/master/rules.txt
!
!
! Section contains these filters
${rawFilters.map(([name, { link }]) => `! - ${name} (${link})`).join('\n')}
!
`;

const HOSTS_COMMENT = `# ===============================================================
# Title: dalisoft's custom filter
# Homepage: ${homepage}
# Version: ${version}
# Description: ${description}
# TimeUpdated: ${new Date().toISOString().split('.')[0] + '+00:00'}
#
#
# License: ${homepage}/blob/master/LICENSE
# Last modified: ${new Date().toISOString()}
#
# Compiled by ${name} ${version}
#
#
# Source name: dalisoft Custom DNS filters
# Source: ${homepage}/blob/master/hosts.txt
#
#
# Section contains these filters
${rawFilters.map(([name, { link }]) => `# - ${name} (${link})`).join('\n')}
#
# ===============================================================

`;

export { RULES_COMMENT, HOSTS_COMMENT };
