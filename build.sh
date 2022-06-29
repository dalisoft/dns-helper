#!/bin/sh

rm -rf converted originals lists.json domains.txt hosts.txt dalisoft.txt
node src/generate.js
python3 src/convertlists.py lists.json converted/
cat converted/lists/* | sort | uniq >>domains.txt
node src/compile.js
