// JavaScript source code

//Prevents jQuery code from running before document is ready.

console.log("Script loaded")

var animationBusy = false;
var questionIndex = 0;
var questionArr = ["How cheap do you want the food?",
    "How heavy do you want the food to be?", "Are you feeling something spicy?", "How much meat do you want on your food?",
    "What type of cuisine?"];

var answer1Arr = ["Very cheap", "Very heavy", "Very spicy", "Meat mountain", "???"];
var answer2Arr = ["Cheap", "Heavy", "Little spicy", "Some meat", "???"];
var answer3Arr = ["No importance", "No importance", "No importance", "No importance", "???"];
var answer4Arr = ["Expensive", "Light", "Not spicy", "Little meat", "???"];
var answer5Arr = ["Very expensive", "Very light", "Very not spicy", "Vegetarian", "???"];

var QUESTION_NUMBER = 5;


$("#answer1").click(function () {
    console.log("Button Clicked");
    newQuestion('#answer1', '#answer2', '#answer3', '#answer4', '#answer5');     
});
$("#answer2").click(function () {
    console.log("Button Clicked");
    newQuestion('#answer2', '#answer1', '#answer3', '#answer4', '#answer5');
});
$("#answer3").click(function () {
    console.log("Button Clicked");
    newQuestion('#answer3', '#answer2', '#answer1', '#answer4', '#answer5');
});
$("#answer4").click(function () {
    console.log("Button Clicked");
    newQuestion('#answer4', '#answer2', '#answer3', '#answer1', '#answer5');
});
$("#answer5").click(function () {
    console.log("Button Clicked");
    newQuestion('#answer5', '#answer2', '#answer3', '#answer4', '#answer1');
});

//Hover animations
$('#answer1').hover(function () {
    $('#answer1').stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
        $('#answer1').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});
$('#answer2').hover(function () {
    $("#answer2").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
        $('#answer2').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});
$('#answer3').hover(function () {
    $("#answer3").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
        $('#answer3').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});
$('#answer4').hover(function () {
    $("#answer4").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
        $('#answer4').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});
$('#answer5').hover(function () {
    $("#answer5").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
    $('#answer5').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});


function newQuestion(chosenanswer, unchosen1, unchosen2, unchosen3, unchosen4) {

    $('#answer1').stop(true).fadeTo(500, 0, function() {
        $('#answer1').text(answer1Arr[questionIndex]);
        $('#answer1').stop(true).fadeTo(100, 1);
    });

    $('#answer2').stop(true).fadeTo(500, 0, function () {
        $('#answer2').text(answer2Arr[questionIndex]);
        $('#answer2').stop(true).fadeTo(100, 1);
    });

    $('#answer3').stop(true).fadeTo(500, 0, function () {
        $('#answer3').text(answer3Arr[questionIndex]);
        $('#answer3').stop(true).fadeTo(100, 1);
    });

    $('#answer4').stop(true).fadeTo(500, 0, function () {
        $('#answer4').text(answer4Arr[questionIndex]);
        $('#answer4').stop(true).fadeTo(100, 1);
    });

    $('#answer5').stop(true).fadeTo(500, 0, function () {
        $('#answer5').text(answer5Arr[questionIndex]);
        $('#answer5').stop(true).fadeTo(100, 1);
    });

    if (questionIndex < QUESTION_NUMBER-1) {
        questionIndex += 1;
    }
    else {
        questionIndex = 0;
    }

    console.log(questionIndex);
    $('#question').stop(true).fadeTo(500, 0, function () {
        $('#question').text(questionArr[questionIndex]);
        $('#question').stop(true).fadeTo(100, 1);
    });

}

function showResult() {

}

function hoverIn() {
    $('#question1').stop(true).animate({ padding: "0.75vw 1.25vw" });
}

function hoverOut() {
    $('#question1').stop(true).animate({ padding: "0.5vw 1vw" });
}