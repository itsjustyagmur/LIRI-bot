//variables//

var keys = require("./keys.js");
var omdb = require("omdb");
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();


 ///functions//
 function concertEvent() {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
            if(response.data.length <= 0) {
                console.log(" We have no information for this Artist at the moment!")
            }else{ 
                for(var i = 0; i < response.data.length; i++){
                    
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[0].venue.region);
                    console.log("Date Of Concert: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                
                }
            }


        })
}

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


 function spotifymusic(song){
    if (!song){
        song = ""
    }

    spotify.search({type: "track", query: song}, function (err, data){
        if (err) {
            throw err;
        } 
        var songData = data.tracks.items[0];
        for(var i = 0; i < data.tracks.items.length; i++){
        
            console.log("-----------------------");
			console.log("Artist: " + songData.artists[0].name);
			console.log("Song title: " + songData.name);
			console.log("Preview link: " + songData.preview_url);
            console.log("Album title: " + songData.album.name);
            console.log("-----------------------");
        }
    })
}

function omdbmovie (){
    //to pull from the api using axios//
    axios.get("http://www.omdbapi.com/?t=" + movieSelection.movieName + "&y=&plot=short&apikey=trilogy")
    .then( function (err, response){
        var movieData = response;
        if (!err ) {
        console.log("-----------------------");    
        console.log("Title: " + movieData.Title);
        console.log("Release Year: " + movieData.Year);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
        console.log("-----------------------");

        }
    })
}
var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function (err, data) {
        if(err){
            return console.log(err)
        }
        
        var dataArr = data.split(",")
        theCommands(dataArr[0], dataArr[1])
    });
}


//switch commands// 
var theCommands =  function(command, commandParam){
    switch(command){
        case "concert-this":
        concertEvent(commandParam)
        break;
        
        case "spotify-this-song": 
        spotifymusic(commandParam)
        break;
   
        case "Movie-this":
        omdbmovie(commandParam)
        break;
        
        case "do-what-it-says":
        doWhatItSays()
        break;
    }
       }
   
theCommands(process.argv[2], process.argv[3])
