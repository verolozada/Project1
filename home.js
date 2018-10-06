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
        var x;
        $.ajax({
            url: fsURl,
            method: "GET"
        }).then(function (response) {
            console.log('Response from FourSquare===>', response);
            const { response: { groups } } = response;
            const venues = [];
            groups[0].items.forEach(item => venues.push(item.venue.name));
            console.log('normalized DATA ==>', venues);
            venues.forEach(venue => {
                console.log(venue);
                $(".thingToDo").append('<p>' + venue + '</p>');
            });

        })

      
//Insert YouTube API Call 
function youtubeApiCall() {
            $.ajax({
                cache: false,
                data: $.extend({
                    key: 'AIzaSyDnJZQENCNACGclR0grH3IoXQJNGEZHEtM',
                    q: $('#hyv-search').val(),
                    part: 'snippet'
                }, { maxResults: 5, pageToken: $("#pageToken").val() }),
                dataType: 'json',
                type: 'GET',
                timeout: 5000,
                url: 'https://www.googleapis.com/youtube/v3/search'
            })
                .done(function (data) {
                    $('.btn-group').show();
                    if (typeof data.prevPageToken === "undefined") {
                        $("#pageTokenPrev").hide();
                    } else {
                        $("#pageTokenPrev").show();
                    }
                    if (typeof data.nextPageToken === "undefined") {
                        $("#pageTokenNext").hide();
                    } else {
                        $("#pageTokenNext").show();
                    }
                    var items = data.items, videoList = "";
                    $("#pageTokenNext").val(data.nextPageToken);
                    $("#pageTokenPrev").val(data.prevPageToken);
                    $.each(items, function (index, e) {
                        videoList = videoList + '<li class="hyv-video-list-item"><div class="hyv-content-wrapper"><a href="" class="hyv-content-link" title="' + e.snippet.title + '"><span class="title">' + e.snippet.title + '</span><span class="stat attribution">by <span>' + e.snippet.channelTitle + '</span></span></a></div><div class="hyv-thumb-wrapper"><a href="" class="hyv-thumb-link"><span class="hyv-simple-thumb-wrap"><img alt="' + e.snippet.title + '" src="' + e.snippet.thumbnails.default.url + '" width="120" height="90"></span></a></div></li>';
                    });
                    $(".test").html(videoList);
                    // JSON Responce to display for user
                    new PrettyJSON.view.Node({
                        el: $(".hyv-watch-sidebar-body"),
                        data: data
                    });
                });
        }

    })



});










