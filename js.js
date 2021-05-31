
//getting location using watch

//global variables for location
var showPosition = ""
var watchID;
var geoLoc;

//location peramater
function showLocation(position) {
   var lat = position.coords.latitude;
   var long = position.coords.longitude;
   console.log(`Latitude: ${lat} Longitude: ${long}`);
}

// error handling for location
function errorHandler(err) {
   if(err.code == 1) {
      alert("Error: Access is denied!");
   } else if( err.code == 2) {
      alert("Error: Position is unavailable");
   }
}

//function to start the watch, includes timeout
function getLocationUpdate(){
   
   if(navigator.geolocation){
      
      // timeout at 60 seconds
      var options = {timeout:60000};
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
   } else {
      alert("Error: Your current browser does not support geolocation");
   }
}
//setting basic buttons for testing
$('#main').append($('<button>',{id: "start","class": 'start'}));
$('#main').append($('<button>',{id: "stop","class": 'stop'}));

//giving the testing buttons functions

//starting the watch
$('#start').click(function(){
    getLocationUpdate();
})

//ending the watch
$('#start').click(function(){
    stopWatch();
    console.log(showPosition)
})

//cocktail web api
function getDrink() {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "05cb4e09a7msh93309c9b3565e0ap1b3350jsnabbb582f1cf3",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	}
};
//getting the ajax response
$.ajax(settings).done(function (response) {
	console.log(response);
});
}

// recipe fetch

function getRecipe() {
let a ="sdfsdfsdfsdfsdfsdfds"

}