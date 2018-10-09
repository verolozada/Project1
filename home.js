$(document).ready(function () {

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
            venues.forEach(venue => {
                console.log(venue);
                $("#thingsToDo").append('<p>' + venue.name + '</p>');
            });

            venues.forEach(venue => {
                console.log("This is the Venue ==>", venue);
                $(".thingToDo").append('<p>' + venue + '</p>');
            });

        });
    });

    function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }


    function googleApiClientReady() {
        gapi.client.setApiKey("AIzaSyD3VXMd8bzXIQijinIuKOKsgqQ1mg6bv80");
        gapi.client.load('youtube', 'v3', function () {
            searchA();
        });
    }
    function searchA() {
        var q = encodeURIComponent($("#search").val()).replace(/%20/g, "+")
        var request = gapi.client.youtube.channels.list({
            part: 'snippet',
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2017-01-01T00:00:00Z",
        });
        //execute request 
        request.execute(function (response) {
            var results = response.result;
            $(".vlogs").html("");
            $.each(results.items, function (index, item) {
                $.get("tpl/item.html", function (data) {
                    $(".vlogs").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoID }]));
                });
            });
            resetVideoHeight();
        });
    };

$(window).on("resize", resetVideoHeight);

function resetVideoHeight() {
    $("video").css("height")
} 

});











