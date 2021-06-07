
//getting location using watch

//global variables for location
var showPosition = ""
var watchID;
var geoLoc;

//location peramater
function showLocation(position) {
   let lat = position.coords.latitude;
   let long = position.coords.longitude;
   console.log(`Latitude: ${lat} Longitude: ${long}`);

   localStorage.removeItem("latitude")
   localStorage.removeItem("longitude")
   localStorage.setItem("latitude", lat)
   localStorage.setItem("longitude", long)
}

// error handling for location
function errorHandler(err) {
   if (err.code == 1) {
      alert("Error: Access is denied!");
   } else if (err.code == 2) {
      alert("Error: Position is unavailable");
   }
}

//function to start the watch, includes timeout
function getLocationUpdate() {

   if (navigator.geolocation) {

      // timeout at 1 seconds
      var options = { timeout: 1000 };
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
   } else {
      alert("Error: Your current browser does not support geolocation");
   }
}

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
      let drinkArray = response.drinks
      console.log(drinkArray)
      localStorage.setItem("drink-list", JSON.stringify(drinkArray))

   });
}

// recipe fetch

// restaurant fetch

//button functionality for first page (casual)(romantic)
$('.btn').click(function generateDate() {
   // getLocationUpdate()
   Object.defineProperty(String.prototype, 'capitalize', {
      value: function () {
         return this.charAt(0).toUpperCase() + this.slice(1);
      },
      writable: true,
      configurable: true
   });

   //FETCHES

   //Drink fetch

   //getting the drink information
   getDrink()
   let getDrinkArray = JSON.parse(localStorage.getItem("drink-list"))

   //selecting the drink from the array
   let min = 0;
   let max = 9;
   let randomize = Math.floor(Math.random() * (max - min) + min);


   chosenDrink = getDrinkArray[randomize]

   //populating the drink modal with the information
   $('#drink-name').text(`Drink Name: ${chosenDrink.strDrink}`)
   $('#drink-glass').text(`Drink Glass: ${chosenDrink.strGlass}`)
   $('#drink-instructions').text(`Instructions: ${chosenDrink.strInstructions}`)

   // for loop for populating the ingrediants and measurements
   for (i = 1; i < 8; i++) {
      let ingredient = `strIngredient${i}`
      let measure = `strMeasure${i}`
      if (chosenDrink[ingredient] !== null) {
         let ingItem = $('<li>', { id: "item" + i, class: "ingredient-item" })
         ingText = ingItem.text(chosenDrink[ingredient])
         $('#drink-ingredients').append(ingItem)
      } else { }

      if (chosenDrink[measure] !== null) {
         let measureText = $('<span>', { id: "measurement-text", class: "measurement-item" })
         measureText.text(` ${chosenDrink[measure]}`)
         $('#item' + i).append(measureText)
      } else { }
   }

   // end of drink population


   //start of testing for if function is running from refresh or intiital

   //for initial
   if (localStorage.getItem("refreshed") !== "true") {
      localStorage.removeItem("refreshed")

      //storing the id
      let buttonId = $(this).attr("id")

      let buttonSplit = buttonId.split("-")[1]
      localStorage.setItem("buttonClicked", buttonSplit.capitalize())

      //removing page content on initial
      $('#slogan').remove();
      $('#btn-casual').remove();
      $('#btn-romantic').remove();
      $('#buttonDiv').remove();
      $('#forAppend').remove();

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
      for (i = 0; i < 3; i++) {

         $("#link-" + i).remove();
         $("#button-" + i).remove();
         $("#result-" + i).remove();
      }
      
   }

   //end of refresh testing


   //creating the buttons
   for (i = 0; i < 3; i++) {
      let resultDiv = $('<div>', { id: "result-" + i, class: "column is-one-fifth" })
      let buttonLink = $('<a>', { id: "link-" + i, class: "modal-0-1-2", href: "#ex" + i, rel: "modal:open" })
      let buttonChoices = $('<button>', { id: "button-" + i, class: "button-0-1-2 btn btn-style" })
      let buttonSpan = $('<span>', { id: "span-" + i, class: "gradient-text" })
      $('#column-container').append(resultDiv)
      buttonLink.append(buttonChoices)
      buttonChoices.append(buttonSpan)
      resultDiv.append(buttonLink)

      if ($('#result-0')) {
         $('#result-0').addClass("is-offset-one-fifth")
      }
   }

   //setting content for the buttons
   $('.button-0-1-2').each(function () {
      let buttonTitle = ["Drink", "Recipe", "Restaurant"];
      let textItem = $(this).attr("id").split("-")[1]

      $(this).find('span').text(buttonTitle[textItem])
   })

   //generating refresh content(button, title, and span)
   let refreshDiv = $('<div>', { id: "refresh", class: "columns is-flex-direction-column" })
   let refreshWrapper = $('<div>', { id: "refresh-wrapper", class: "column is-one-fifth" })
   let refreshParaDiv = $('<div>', { id: "refresh-para-div"})
   let refreshPara = $('<p>', { id: "refresh-para" }).text("Don't like what you see or want another option? Click the refresh button!")
   let refreshBtn = $('<button>', { id: "refresh-btn", class: "refresh-btn btn btn-style" })
   let refreshSpan = $('<span>', { id: "refresh-span", class: "gradient-text" }).text("Refresh")

   $('body').append(refreshDiv)
   refreshDiv.append(refreshParaDiv)
   refreshParaDiv.append(refreshPara)
   refreshDiv.append(refreshWrapper)
   refreshWrapper.append(refreshBtn)
   refreshBtn.append(refreshSpan)

   //refresh button on click function
   $('#refresh-btn').click(function () {
      $('.ingredient-item').remove();
      localStorage.setItem("refreshed", "true")
      generateDate();
 
      $('#rest-input').removeClass("hide")
      $('#rest-search').removeClass("hide")
      $('#rest-inst').removeClass("hide")
      $('#rest-label').removeClass("hide")
   })

})

$('#rest-search').click(function(){
   zipCode = $('#rest-input').val().trim();
   console.log(zipCode);
   getRestaurant();
   $('#rest-div').removeClass("hide")
   $('#rest-input').addClass("hide")
   $('#rest-search').addClass("hide").removeClass("is-fullwidth")
   $('#rest-inst').addClass("hide")
   $('#rest-label').addClass("hide")
})



function getRestaurant() {
   //var finalLatitude = 40.68919
   //JSON.parse(localStorage.getItem("latitude"))
   //var finalLongitude = -73.992378
   //JSON.parse(localStorage.getItem("longitude"))
   // console.log(finalLongitude)
   // console.log(finalLatitude)
   let apiKey = "0fdef0c551bc67da00aa5e2127a110d5"
   
   fetch(`https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?key=${apiKey}`)
   .then(response => response.json())
   .then(({ data }) => {
       console.log(data);
       
   let min = 0;
   let max = 25;
   let randomize = Math.floor(Math.random() * (max - min) + min);
   let chosenRest = data[randomize]
   console.log(chosenRest)
   let restAddress = chosenRest.address.formatted.trim();
   console.log(restAddress)
   $('#rest-name').text(`Restaurant name: ${chosenRest.restaurant_name}`)
   $('#rest-number').text(`Phone number: ${chosenRest.restaurant_phone}`)
   $('#rest-frame').attr('src', `https://www.google.com/maps?q=${restAddress}&output=embed`)
})

}                  

