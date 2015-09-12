[![NPM](https://nodei.co/npm/rssupdates.png?downloads=true&stars=true)](https://nodei.co/npm/rssupdates/)

# rssupdates
Check all your favourite RSS Feeds for updates

## Installation
Install with the [Node.JS](https://nodejs.org/en/download/) package manager

```bash
npm install rssupdates
```

## Usage

```bash
node rssupdate.js [options]

Options:
- config        Show all configured RSS URLs
- add <URL>     Add a new RSS Feed to config
- remove <URL>  Remove RSS Feed from config
- check         Check all Feeds for updates
```

## Requirements

- [feedparser](https://github.com/danmactough/node-feedparser)
- [request](https://github.com/request/request)
