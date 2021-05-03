// JavaScript source code

//Prevents jQuery code from running before document is ready.

console.log("Script loaded")

$(document).ready(function () {
    

    $('#question1').hover(function () {
        $("#question1").stop().animate({ backgroundColor: '#9DB300', padding: "0.75vw 1.25vw"  });
    }, function () {
        $("#question1").stop().animate({ backgroundColor: '#BAC600', padding: "0.5vw 1vw" });
    });
    $('#question2').hover(function () {
        $("#question2").stop().animate({ backgroundColor: '#9DB300', padding: "0.75vw 1.25vw" });
    }, function () {
        $("#question2").stop().animate({ backgroundColor: '#BAC600', padding: "0.5vw 1vw" });
    });
    $('#question3').hover(function () {
        $("#question3").stop().animate({ backgroundColor: '#9DB300', padding: "0.75vw 1.25vw" });
    }, function () {
        $("#question3").stop().animate({ backgroundColor: '#BAC600', padding: "0.5vw 1vw" });
    });
    $('#question4').hover(function () {
        $("#question4").stop().animate({ backgroundColor: '#9DB300', padding: "0.75vw 1.25vw" });
    }, function () {
        $("#question4").stop().animate({ backgroundColor: '#BAC600', padding: "0.5vw 1vw" });
    });
    $('#question5').hover(function () {
        $("#question5").stop().animate({ backgroundColor: '#9DB300', padding: "0.75vw 1.25vw"  });
    }, function () {
        $("#question5").stop().animate({ backgroundColor: '#BAC600', padding: "0.5vw 1vw" });
    });

    $("#question1").click(function () {
        console.log("Button Clicked");
        newQuestion('#question1', '#question2', '#question3', '#question4', '#question5');
        //When a button is clicked, the button fades, new text displayed.
        //$('#question1').animate({ opacity: 0.0 }, 1000, function () {
        //    $('#question1').text("The question has changed");
        //    $('#question1').animate({ opacity: 1.0 }, 100);
        //});
    });
});

function newQuestion(chosenquestion, unchosen1, unchosen2, unchosen3, unchosen4) {
    $(chosenquestion).stop().animate({ opacity: 0.0 }, 1000, function () {
        $(chosenquestion).text("The question has changed");
        $(chosenquestion).css({ "background-color": '#fff' });
        $(chosenquestion).stop().animate({ opacity: 1.0 }, 100);
        $(unchosen1).text("The question has changed");
        $(unchosen2).text("The question has changed");
        $(unchosen3).text("The question has changed");
        $(unchosen4).text("The question has changed");
    });

    $(unchosen1).stop().animate({ opacity: 0.0 }, 1000, function () {
        $(unchosen1).text("The question has changed");
        $(unchosen1).stop().animate({ opacity: 1.0 }, 100);
    });

    $(unchosen2).stop().animate({ opacity: 0.0 }, 1000, function () {
        $(unchosen2).text("The question has changed");
        $(unchosen2).stop().animate({ opacity: 1.0 }, 100);
    });

    $(unchosen3).stop().animate({ opacity: 0.0 }, 1000, function () {
        $(unchosen3).text("The question has changed");
        $(unchosen3).stop().animate({ opacity: 1.0 }, 100);
    });

    $(unchosen4).stop().animate({ opacity: 0.0 }, 1000, function () {
        $(unchosen4).text("The question has changed");
        $(unchosen4).stop().animate({ opacity: 1.0 }, 100);
    });
}