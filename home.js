function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

$(document).ready(function () {

    $("#test").on("click", function () {
        // event.preventDefault();
        $(".response").empty();
   
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
            // This code returns the response for the venue's name, the venue's address and the venue's category from the FourSquare API.
            groups[0].items.forEach(item => venues.push(item.venue.name + "<br>" + " Address: " + (item.venue.location.address) + "<br>"+ " Category: " + (item.venue.categories[0].name)));
            console.log('normalized DATA ==>', venues);
            // appending the venue information to the class response.
            $(".response").append('<h4>Things to Do</h4>')
            venues.forEach(venue => {
                console.log("This is the Venue ==>", venue);
                $(".response").append('<p>' + venue + '</p>');
            });

        });

        var city = $("#autocomplete-input1").val().trim();
        var country = $("#autocomplete-input2").val().trim();
        //calling the youtube api
        var request = gapi.client.youtube.search.list({
            q: encodeURIComponent(city + 'things to do travel vlog' + country).replace(/%20/g,"+"),
            type: 'video',
            part: 'snippet',
            maxResults: 1,
            order: "viewCount",
            publishedAfter: "2017-01-01T00:00:00Z",
        });
        //execute api request
        request.execute(function (response) {
            var results = response.result;
            $(".vlogs").html("");
            $.each(results.items, function (index, item) {
                $.get("item.html", function (data) {
                    $(".vlogs").append(tplawesome(data, [{ "title": item.snippet.title, "videoId": item.id.videoId }]));
                });
                console.log(results)
            });

        });
    });

    //how to say it 
    // let phrases = ['to the airport please', 'thank you', 'where is the restroom?'];

    //     function buttons() {
    //         for (let i = 0; i < phrases.length; i++) {
    //             const text = $("<button>")
    //             text.addClass("btn1 waves-effect waves-light btn")
    //             text.attr("data-name", phrases[i]);
    //             text.text(phrases[i]);
    //             $("#text").append(text);
    //         }
    //     }
    //     buttons();

    //     let say;
    //     let phrase;
    //     let voicesDropdown;

    //     $('.dropdown-trigger').dropdown();

    //     $("#text").on("click", ".btn1", function () {
    //         say = $(this).attr("data-name");
    //         if (say === phrases[0]) {
    //             phrase = 'al aeropuerto porfavor';
    //         } else if (say === phrases[1]) {
    //             phrase = 'gracias';
    //         } else if (say === phrases[2]) {
    //             phrase = 'donde está el baño';
    //         }


    //         const options = phrase; //range incluides rate and pitch 

    //         msg.text = phrase; // grab the value that is in the textarea 

    //     });

    //     voicesDropdown = document.querySelector('[id="dropdown1"]');
    //     const speakButton = document.querySelector('#speak');
    //     const stopButton = document.querySelector('#stop');

    //     const msg = new SpeechSynthesisUtterance();
    //     let voices = [];


    //     function populateVoices() {
    //         voices = this.getVoices();
    //         let language = 'es'; //let because is going to change later depending of the country selected 

    //         voicesDropdown.innerHTML = voices
    //             .filter(voice => voice.lang.includes(language))
    //             .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`) //go over the array and 
    //             .join('');
    //     }

    //     function setVoice() {
    //         msg.voice = voices.find(voice => voice.name === this.value); //find the voice with the specific value of the voice clicked 
    //         console.log(this.value);
    //         toggle();
    //     }
    //     function toggle(startOver = true) {   //to cancel what happened before the new command
    //         speechSynthesis.cancel();
    //         if (startOver) {
    //             speechSynthesis.speak(msg);
    //         }
    //     }

    //     function setOption() {
    //         console.log(this.name, this.value);
    //         msg[this.name] = this.value;
    //         toggle();
    //     }
    //     speechSynthesis.addEventListener('voiceschanged', populateVoices); //voices changed is an event from  speechSynthesis
    //     voicesDropdown.addEventListener('change', setVoice); //everytime I change the voice I'll call the setVoice function
    //     // options.forEach(option => option.addEventListener('change', setOption));
    //     speakButton.addEventListener('click', toggle);
    //     console.log(speakButton);
    //     stopButton.addEventListener('click', () => toggle(false));

});

function init() {
    gapi.client.setApiKey("AIzaSyC-28ZxLgj-7ZEPWEN-8Cwaew0OF1AHaig")
    gapi.client.load("youtube", "v3", function () {

    })
}

