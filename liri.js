require("dotenv").config();

//VARIABLES

var fs = require("fs");
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = require('request');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var command = (process.argv[2]);

// FUNCTIONS

//Twitter Function

var runTwitter = function(){
    
    var params = { screen_name: "GaloreCoder", count: 20
    };

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
            }
        } else{
            console.log(error);
        }
      });
};


//Spotify Function

var ArtistName = function(artist){
    return artist.name;
};

var runSpotify = function(song){
   
    if(song === undefined){
        song = "The Seed 2.0";
    }
    spotify.search({ type: "track", query: song },function(err, data){
            if(err){
                return console.log("error occured: " + err);                
            }
            console.log(data);

            var songs = data.tracks.items;

            for (var i = 0; i<songs.length; i++){
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(ArtistName));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");                
            }
        }
    );
};


//Movie Function


var getMovie = function(movieName){

    if(movieName === undefined){
        movieName = "The Godfather";
    }

    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    console.log(url);
    request(url, function(err, response, body){
        
        if (!err && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
               
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    });
};

// Function for running a command from a text file

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        console.log(data);
       
        var dataArr = data.split(',')
        for (var i = 0; i < dataArr.length; i++) {
            console.log(dataArr[i]);
          }

    });
}


var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            runTwitter();
            break;
        case 'spotify-this-song':
            runSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('LIRI doesn\'t know that');
    }
}

//run this on load of js file
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says`