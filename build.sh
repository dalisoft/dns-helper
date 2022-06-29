#!/bin/sh

rm -rf converted originals lists.json dalisoft.txt
node src/generate.js
python3 src/convertlists.py lists.json converted/
rm -rf domains.txt hosts.txt rules.txt
cat converted/lists/* | sort | uniq >>domains.txt
node src/compile.js
