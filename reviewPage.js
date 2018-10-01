$(document).ready(function (){

// Initialize Firebase
const config = {
    apiKey: "AIzaSyARrDMzSc-2DHlnBpa38ZVGDbT5f1EIOt8",
    authDomain: "bonvoyage-8a3e7.firebaseapp.com",
    databaseURL: "https://bonvoyage-8a3e7.firebaseio.com",
    projectId: "bonvoyage-8a3e7",
    storageBucket: "bonvoyage-8a3e7.appspot.com",
    messagingSenderId: "425704545498"
};
firebase.initializeApp(config);

// variables to declare
const database = firebase.database();


// add reviews from the user
$("#add-review").on("click", function (event){
    event.preventDefault();

//  inputs from the user
 const userName = $("#icon_name").val().trim();
 const userDate = moment($("#icon_date").val().trim(), "MM/DD/YYYY").format("X");
//  TODO: input validation for email 
 const userEmail = $("#email").val().trim();
 const userComment = $("#icon_comment").val().trim();


//hold data 
const newUser = {
    name: userName,
    date: userDate,
    email: userEmail,
    comment: userComment
}

// ref gets yout to the root of the object in firebase 
database.ref().push(newUser);

console.log(newUser.name);
console.log(newUser.email);
console.log(newUser.date);
console.log(newUser.comment);

$("#icon_name").val("");
$("#icon_date").val("");
$("#email").val("");
$("#icon_comment").val("");
});

// .on everytime the data changes I want to see the changes in my object in firebase
// child_added (a new review is addded) TODO: child_removed for inappropriate comments
database.ref().on("child_added", function(snap){

// specify what we want to see from the snap, it could be key names, child changes, etc. In this case we want to see the values
const userName = snap.val().name;
const userDate = snap.val().date;
const userEmail = snap.val().email;
const userComment = snap.val().comment;

// change de date format to display it on the screen
const userDate1 = moment.unix(userDate).format("MM/DD/YYYY");

const newCard = $("<div>").append(
    $("<h5>").text(userName),
    $("<p>").text(userDate1),
    $("<p>").text(userComment))
    newCard.addClass("card-panel");


$("#userComments").prepend(newCard); 

})

});

