$(document).ready(function () {

    var GoogleAuth;

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
            const { response: { groups } } = response;
            const venues = [];
            // const venuesAddress = [];
            groups[0].items.forEach(item => venues.push(item.venue.name + " Category: " + (item.venue.categories[0].name) + " Address:  " + (item.venue.location.address)));
            console.log('normalized DATA ==>', venues);
            // venues.forEach(venue => {
            //     console.log(venue);
            //     $("#thingsToDo").append('<p>' + venue.name + '</p>');
            // });

            venues.forEach(venue => {
                console.log("This is the Venue ==>", venue);
                $(".thingToDo").append('<p>' + venue + '</p>');
            });

        })
    });

    function search() {
        //Clear results
        $('.vlogs').html();
        $('#test').html();

        //Get Form Input 
        q = $("#query").val();

        //Run GET request on the API 
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet, id',
                q: q,
                type: 'video',
                key: AIzaSyDnJZQENCNACGclR0grH3IoXQJNGEZHEtM
            },
            function (data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
            }
        );

    }






});










