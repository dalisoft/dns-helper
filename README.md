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

## Preparing

- Install [NXEnhnced](https://github.com/hjk789/NXEnhanced)
- Download your NextDNS config
- Put your config to this project folder
- Change NextDNS config name to `nextdns-config.json`
- Change NXEnhanced config name to `nxe-config.json`
- You can run [Running](#running) command

## Formats

| Format    | Where used                          | Direct link                                                                       |
| --------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| **rules** | AdGuard, uBlock Origin or AdBlocker | [Link](./releases/latest/download/rules.txt) |
| **hosts** | OS-level `hosts` file               | [Link](./releases/latest/download/hosts.txt) |

## Running

Run `sh build.sh` and wait.

You can see output file in project folder

## License

Apache-2.0 License
