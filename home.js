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
        console.log("HEllo");
    });


    //calling the YouTube API


});

