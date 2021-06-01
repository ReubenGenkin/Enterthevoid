
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


//button functionality for first page (casual)(romantic)

$('.btn').click(function generateDate(){

   Object.defineProperty(String.prototype, 'capitalize', {
      value: function () {
          return this.charAt(0).toUpperCase() + this.slice(1);
      },
      writable: true,
      configurable: true
  });

  //start of testing for if function is running from refresh or intiital

  //for initial
  if (localStorage.getItem("refreshed") !== "true") {
   localStorage.removeItem("refreshed")

   //storing the id
   let buttonId = $(this).attr("id")
   console.log(buttonId)

   let buttonSplit = buttonId.split("-")[1]
   localStorage.setItem("buttonClicked", buttonSplit.capitalize())

   //removing page content on initial
   $('#slogan').remove()
   $('#btn-casual').remove()
   $('#btn-romantic').remove()

   //populating page with new content on initial
   $('#subheader').text(buttonSplit.capitalize())
   $('#page-direction').text('Please click the following buttons for more information.')

   //for refresh
  } else {
   localStorage.removeItem("refreshed")
   $('#refresh').remove()

   //populating page with new content on refresh
   $('#subheader').text(localStorage.getItem("buttonClicked"))
   $('#page-direction').text('Please click the following buttons for more information.')

   //removing previously generated buttons on refresh
   for (i=0; i<3; i++) {
      
      $("#link-"+ i).remove();
      $("#button-"+ i).remove();
   }
  }

  //end of refresh testing


   //creating the buttons
   for (i=0; i<3; i++) {
      
      let buttonLink = $('<a>', {id: "link-"+ i, "class": "modal-0-1-2", "href": "#ex"+i, "rel": "modal:open"})
      let buttonChoices = $('<button>', {id: "button-"+ i, "class": "gradient-text button-0-1-2"})

      $('#buttonDiv').append(buttonLink)
      buttonLink.append(buttonChoices)
   }
   //setting content for the buttons
   $('.button-0-1-2').each(function (){
      let buttonTitle = ["Drink", "Recipe", "Restaurant"];
      var textItem = $(this).attr("id").split("-")[1]

      $(this).text(buttonTitle[textItem])
   })

   //generating refresh content(button, title, and span)
   let refreshDiv = $('<div>', {id: "refresh"})
   let refreshTitle = $('<h3>', {id: "refresh-title"}).text("Refresh")
   let refreshSpan = $('<span>', {id: "refresh-span"}).text("If you want new option, please click the refresh button")
   let refreshBtn = $('<button>', {id: "refresh-btn", "class": "refresh-btn"}).text("Refresh")
   $('body').append(refreshDiv)
   refreshDiv.append(refreshTitle)
   refreshDiv.append(refreshSpan)
   refreshDiv.append(refreshBtn)

   //refresh button on click function
   $('#refresh-btn').click(function() {
      localStorage.setItem("refreshed", "true")
      generateDate();


   })
})