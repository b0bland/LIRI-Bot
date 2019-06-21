require("dotenv").config();
var keys = require("./keys.js");
var axios = require('axios');

// var spotify = new Spotify(keys.spotify);

var task = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (task === "concert-this") {
    var bandURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(function(response) {
        var jsonData = response.data;
        console.log(jsonData.length);
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
