require("dotenv").config();
var keys = require("./keys.js");
var axios = require('axios');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var task = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (task === "concert-this") {
    var bandURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(function(response) {
        var jsonData = response.data;
        for (n=0;n<jsonData.length;n++) {
            var eventData = [
                "Venue: " + jsonData[n].venue.name,
                "Location: " + jsonData[n].venue.city + ", " + jsonData[n].venue.country,
                "Date: " + jsonData[n].datetime.split("T").join(" "),
                "\n-------------------\n"
            ].join("\n");
            console.log(eventData);
        }
    })
}
else if (task === "spotify-this-song") {
    if (!term) {term = "The Sign"};
    spotify.search({ type: 'track', query: term }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var jsonData = data.tracks.items;
        for (n=0;n<jsonData.length;n++) {
            var songData = [
                "Artist(s): " + data.tracks.items[n].artists[0].name,
                "Song name: " + data.tracks.items[n].name,
                "Preview URL: " + data.tracks.items[n].preview_url,
                "Album name: " + data.tracks.items[n].album.name,
                "\n-------------------\n"
            ].join("\n");
            console.log(songData);
        }
    });
}
else if (task === "movie-this") {
    var movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + term;
    axios.get(movieURL).then(function(response) {
        var jsonData = response.data;
        var movieData = [
            "\n",
            "Title: " + jsonData.Title,
            "Release year: " + jsonData.Year,
            "IMDB rating: " + jsonData.imdbRating,
            "Rotten Tomatoes rating: " + jsonData.Ratings[1].Value,
            "Country of production: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Summary: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
            "\n"
        ].join("\n");
        console.log(movieData);
    })
}