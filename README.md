# @dalisoft/dns-helper

A tool for utilizing the power of [NXEnhanced](https://github.com/hjk789/NXEnhanced), giving tool for processing the
configuration got from [NXEnhanced](https://github.com/hjk789/NXEnhanced)

## Installation

Just [Node.js](https://nodejs.org/en/) should be installed, no dependencies required

- Install [Node.js](https://nodejs.org/en/)
- Clone this repo

## Preparing

- Install [NXEnhnced](https://github.com/hjk789/NXEnhanced)
- Download your NextDNS config
- Put your config to this project folder
- Change NextDNS config name to `nextdns-config.json`
- Change NXEnhanced config name to `nxe-config.json`
- You can run [Running](#running) command

## Formats

| Format    | Where used                          |
|-----------|-------------------------------------|
| **rules** | AdGuard, uBlock Origin or AdBlocker |
| **hosts** | OS-level `hosts` file               |

## Running

`npm run build:rules` or `npm run build:hosts` depending of which format do you want.

You can see output file in project folder

## License

MIT License
