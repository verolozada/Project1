$(document).ready(function () {

    let city;
    let country;

    $("#test").on("click", function () {
        // event.preventDefault();
        console.log("I've been clicked");
        city = $("#autocomplete-input1").val().trim();
        console.log(city);
        country = $("#autocomplete-input2").val().trim();
        console.log(country);
        // Attempting to call fourSquare API
        var fsURl = 'https://api.foursquare.com/v2/venues/explore?client_id=D4PJXJ4YDXIGGJXL0HU1XM1AZFXHDZTXFCIY0XKP5ALGUXJL&client_secret=L5O4FMUQAILJDX4SYQJBJLGXMG31P5LIGN2OQVL3WC4JVIU5&v=20180323&limit=4&near=' + city + ',' + country;
        console.log(fsURl)
        $.ajax({
            url: fsURl,
            method: "GET"
        }).then(function (response) {
            console.log('Response from FourSquare===>', response);
            const { response:{ groups }} = response
            const venues = []
            groups[0].items.forEach(item => venues.push(item.venue.name))
            console.log('normalized DATA ==>', venues)
            // Looping through each result item.
            // for (var f = 0; f < data.length; f++) {
            //     // Creating and storing the thingsToDo div as the varaible recommendedDiv
            //     var recommendedDiv = $("#thingsToDo");
                    venues.forEach(venue => $("#venueName").append(venue))
            //     //Creating a paragraph tag with the responses venue name in it.
            //     var r = $("<p>").text(data[f].venue.name);

            // }
        })
    });







});

