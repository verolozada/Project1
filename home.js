$(document).ready(function () {

//Add in enter button functionality for submit button
    var input = document.getElementById("test"); 

    // Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("test").click();
    }
  });


  let city;
  let country;


});

