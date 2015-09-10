[![NPM](https://nodei.co/npm/rssupdates.png?downloads=true&stars=true)](https://nodei.co/npm/rssupdates/)

# rssupdates
Check all your favourite RSS Feeds for updates


## Requirements

- [feedparser](https://github.com/danmactough/node-feedparser)
- [request](https://github.com/request/request)

## Installation

```bash
npm install rssupdates
```

## Usage

```bash
node rssupdate.js config        Show all configured RSS URLs
node rssupdate.js add <URL>     Add a new RSS Feed to config
node rssupdate.js remove <URL>  Remove RSS Feed from config
node rssupdate.js check         Check all Feeds for updates
```

