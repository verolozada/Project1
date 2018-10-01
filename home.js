$(document).ready(function () {

    let city;
    let country;

    $("#test").on("click", function () {
        console.log("I've been clicked");
        city = $("#autocomplete-input1").val().trim();
        console.log(city);
        country = $("#autocomplete-input2").val().trim();
        console.log(country);
    });
});