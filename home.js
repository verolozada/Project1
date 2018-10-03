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
<<<<<<< HEAD
        // Attempting to call fourSquare API
         var type = $(this).attr("name");
        var fsURl = 'https://api.foursquare.com/v2/venues/explore?client_id=D4PJXJ4YDXIGGJXL0HU1XM1AZFXHDZTXFCIY0XKP5ALGUXJL&client_secret=L5O4FMUQAILJDX4SYQJBJLGXMG31P5LIGN2OQVL3WC4JVIU5&v=20180323&limit=4&near=' + city + ',' + country;
        console.log(fsURl)
        $.ajax({
            url: fsURl,
            method: "GET"
        }).then(function (response){
            console.log('Response from FourSquare===>', response);
        })
=======
        console.log("HEllo");
>>>>>>> 26b3546a930e68c9932e947b920ba350eb491392
    });





});

