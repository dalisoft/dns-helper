# @dalisoft/dns-helper

A tool for utilizing the power of [NXEnhanced](https://github.com/hjk789/NXEnhanced), giving tool for processing the
configuration got from [NXEnhanced](https://github.com/hjk789/NXEnhanced)

## Installation

- Install  [Node.js](https://nodejs.org/en/)
- Install [Python 3.3+](https://www.python.org)
- Clone this repo
- Project dependencies (`pip install -r requirements.txt`)

## Used projects

- <https://github.com/justdomains/ci>

## Building

- Install [NXEnhnced](https://github.com/hjk789/NXEnhanced)
- Download your NextDNS config
- Put your config to this project folder
- Change NextDNS config name to `nextdns-config.json`
- Change NXEnhanced config name to `nxe-config.json`
- Run `sh build.sh`, wait and see `rules.txt` and `hosts.txt` file

## Formats

The are two formats. **Rules** and **Hosts** format (see release for files).

**Rules** are used in AdGuard, uBlock Origin or AdBlocker

**hosts** are used OS-level `hosts` file

## License

Apache-2.0 License
