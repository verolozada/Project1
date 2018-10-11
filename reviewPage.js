
$(document).ready(function () {
    let validEmail;
    let validDate;
    // let validName;
    // let validComment;

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
    $("#add-review").on("click", function (event) {
        event.preventDefault();

        if (validEmail === true && validDate === true) {
            //  inputs from the user
            const userName = $("#icon_name").val().trim();
            //TODO: validate date
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
            $("#click-test").text("");

        } else {
            $("#click-test").text("please complete the form");
        }
    });

    // .on everytime the data changes I want to see the changes in my object in firebase
    // child_added (a new review is addded) TODO: child_removed for inappropriate comments
    database.ref().on("child_added", snap => {

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
        newCard.attr("id", snap.key)

        $("#userComments").prepend(newCard);
    });

    database.ref().on("child_removed", snap => {  //call the snap function 
        console.log(snap.key);
        const newCardRemoved = $("#" + snap.key);
        newCardRemoved.remove();
    });

    document.getElementById("email").addEventListener("keyup", pressHandler);
    document.getElementById("icon_date").addEventListener("keyup", pressHandler);


    function pressHandler(e) {
        const email = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
        const date = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
        console.log($(this).attr("id"));
        let inputId = $(this).attr("id")
        if (inputId === "email") {
            validEmail = email.test($(this).val())
            console.log(validEmail);
            colorValidation(validEmail, inputId);
        } else if (inputId === "icon_date") {
            validDate = date.test($(this).val())
            console.log(validDate);
            colorValidation(validDate, inputId);
        }
    }

    function colorValidation(value, input) {
        if (value === false && input === "email") {
            $("#email-test").css("color", "red"); //.css is a function of jQuery 
            $("#email-test").text("email must be a valid address (name@domain.com)");
        } else if (value === true && input === "email") {
            $("#email-test").css("color", "green");
            $("#email-test").text("valid email");
        } else if (value === false && input === "icon_date") {
            $("#date-test").css("color", "red");
            $("#date-test").text("enter a valid date");
        } else if (value === true && input === "icon_date") {
            $("#date-test").css("color", "green");
            $("#date-test").text("valid date");
        }
    }
});














