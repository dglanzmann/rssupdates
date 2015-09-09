var fs = require('fs');
var FeedParser = require('FeedParser');
var request = require('request');

var CONFIG_FILE = "./rssfeeds.json";
var MIN_DATE = new Date(1980,1,1);

//read feeds config file
var config;
try {
	config = require(CONFIG_FILE);
} catch (e) {
	config = [];
}

function saveConfig() {
	fs.writeFile(CONFIG_FILE, JSON.stringify(config), function(err) {
		if (err) {
			return console.error(err);
		}
	});
}

function addToConfig(newFeed) {
	config.push({ "feed" : newFeed, "date" : MIN_DATE });
	console.log("Add new RSS Feed: " + newFeed + "\n");
	saveConfig();
}

function removeFromConfig(removeFeed) {
	config.forEach(function (item, index, object) {
		if (item.feed == removeFeed) {
			object.splice(index, 1);
			console.log("Removed RSS Feed: " + removeFeed + "\n");
		}
	});
	saveConfig();
}

function showCurrentConfig() {
	console.log("Configured Feeds:");
	config.forEach(function(entry) {
		console.log("- " + entry.feed);
	});
	if (config.length == 0) {
		console.log("Currently no Feeds are configured.");
	}
}

function checkAllFeeds() {
	console.log('\nCheck %s Feeds:\n', config.length);
	config.forEach(function (entry, index, object) {
		var lastDate = MIN_DATE;
		var feedTitle;
		var newEntries = [];
		var entryDate = new Date(entry.date);

		var req = request(entry.feed);
		req.on('error', function (error) {
			console.error(error);
		})
		.pipe(new FeedParser())
		.on('error', function (error) {
			console.error(error);
		})
		.on('meta', function (meta) {
			feedTitle = meta.title;
		})
		.on('readable', function() {
			var stream = this, item;
			while (item = stream.read()) {
				if (entryDate < item.pubDate) {
					newEntries.push(item);
				}
				if (lastDate < item.pubDate) {
					lastDate = item.pubDate;
				}
			}
		})
		.on('end', function() {
			if (entryDate < lastDate) {
				object[index].date = lastDate;
				saveConfig();
			}
			console.log('===== %s =====', feedTitle);
			console.log(newEntries.length + " updates.\n");
			newEntries.forEach(function(newEntry) {
				console.log(newEntry.title + "\n" + newEntry.link + "\n");
			});
		});
	});
}

// parse command line arguments
if (process.argv[2] == "add") {
	addToConfig(process.argv[3]);
} else if (process.argv[2] == "remove") {
	removeFromConfig(process.argv[3]);
} else if (process.argv[2] == "config") {
	showCurrentConfig();
} else if (process.argv[2] == "check") {
	checkAllFeeds();
} else {
	// show help
	console.log("\nUsage:");
	console.log("node rssupdate.js config   \tShow all configured RSS URLs");
	console.log("node rssupdate.js add <URL>\tAdd a new RSS Feed to config");
	console.log("node rssupdate.js remove <URL>\tRemove RSS Feed from config");
	console.log("node rssupdate.js check     \tCheck all Feeds for updates");
}
