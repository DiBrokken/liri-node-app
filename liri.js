var fs = require("fs");
var keysExport = require("./keys.js");

require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commandOne = (process.argv[2])
