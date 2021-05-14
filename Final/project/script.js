// JavaScript source code

//Prevents jQuery code from running before document is ready.

console.log("Script loaded")

var animationBusy = false;
var questionIndex = 0;
var questionArr = ["How cheap do you want the food?",
    "How heavy do you want the food to be?", "Are you feeling something spicy?", "How much meat?"];

var answer1Arr = ["Very cheap", "Very heavy", "Very spicy", "Meat mountain"];
var answer2Arr = ["Cheap", "Heavy", "Little spicy", "Some meat"];
var answer3Arr = ["No importance", "No importance", "No importance", "No importance"];
var answer4Arr = ["Expensive", "Light", "Not spicy", "Little meat"];
var answer5Arr = ["Very expensive", "Very light", "Very not spicy", "No meat preferred"];

var QUESTION_NUMBER = 4;

console.log(answer1Arr[0]);

//price, weight, spice, meat
var desire = [0, 0, 0, 0];

var foodItem = function (parameters) {
    var stats = {
        name: 'placeholder',
        cheapness: 0,
        heaviness: 0,
        spice: 0,
        meat: 0,
    };

    this.construct = function (parameters) {
        $.extend(stats, parameters);
    };

    this.calculateFit = function () {
        console.log("Calculating fit!");
        calcFit();
    };

    var calcFit = function () {
        console.log("calc fit");
        console.log(stats.cheapness);
    };

    this.getName = function () {
        return stats.name;
    }

    this.getCheapness = function () {
        return stats.cheapness;
    }

    this.getHeaviness = function () {
        return stats.heaviness;
    }

    this.getSpice = function () {
        return stats.spice;
    }

    this.getMeat = function () {
        return stats.meat;
    }

    this.construct(parameters);
}

var burger = new foodItem({ name: 'burger', cheapness: 4, heaviness: 7, spice: 2, meat: 5 });
var pizza = new foodItem({ name: 'pizza', cheapness: 2, heaviness: 6, spice: 2, meat: 3 });
var salad = new foodItem({ name: 'salad', cheapness: 4, heaviness: 2, spice: 0, meat: 0 });
var ramen = new foodItem({ name: 'ramen', cheapness: 5, heaviness: 2, spice: 3, meat: 2 });
var curry = new foodItem({ name: 'curry', cheapness: 4, heaviness: 5, spice: 6, meat: 4 });
var burrito = new foodItem({ name: 'burrito', cheapness: 3, heaviness: 8, spice: 4, meat: 4 });
var falafel = new foodItem({ name: 'falafel', cheapness: 1, heaviness: 2, spice: 0, meat: 0 });
var sushi = new foodItem({ name: 'sushi', cheapness: 8, heaviness: 3, spice: 0, meat: 5 });

var menuArray = [burger, pizza, salad, ramen, curry, burrito, falafel, sushi];
console.log(burger.getName());

$("#answer1").click(function () {
    console.log("Button Clicked");
    desire[questionIndex] = 10;

    if (questionIndex >= QUESTION_NUMBER-1) {
        console.log("Showing Result");
        showResult(menuArray, desire);
    }
    else {
        newQuestion('#answer1', '#answer2', '#answer3', '#answer4', '#answer5'); 
    }   

    questionIndex += 1;
});
$("#answer2").click(function () {
    console.log("Button Clicked");
    desire[questionIndex] = 7;

    if (questionIndex >= QUESTION_NUMBER-1) {
        console.log("Showing Result");
        showResult(menuArray, desire);
    }
    else {
        newQuestion('#answer2', '#answer1', '#answer3', '#answer4', '#answer5');
    }

    questionIndex += 1;
});
$("#answer3").click(function () {
    console.log("Button Clicked");
    desire[questionIndex] = 5;

    if (questionIndex >= QUESTION_NUMBER-1) {
        console.log("Showing Result");
        showResult(menuArray, desire);
    }
    else {
        newQuestion('#answer3', '#answer2', '#answer1', '#answer4', '#answer5');
    }

    questionIndex += 1;
});
$("#answer4").click(function () {
    console.log("Button Clicked");
    desire[questionIndex] = 3;

    if (questionIndex >= QUESTION_NUMBER-1) {
        console.log("Showing Result");
        showResult(menuArray, desire);
    }
    else {
        newQuestion('#answer4', '#answer2', '#answer3', '#answer1', '#answer5');
    }

    questionIndex += 1;
});
$("#answer5").click(function () {
    console.log("Button Clicked");
    desire[questionIndex] = 0;

    if (questionIndex >= QUESTION_NUMBER-1) {
        console.log("Showing Result");
        showResult(menuArray, desire);
    }
    else {
        newQuestion('#answer5', '#answer2', '#answer3', '#answer4', '#answer1');
    }

    questionIndex += 1;
});

$('#choice1').click(function () {
    window.location.href = 'Foodselector.html';
    return false;
});
$('#choice2').click(function () {
    window.location.href = 'Foodselector_wheel.html';
    return false;
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
$('#choice1').hover(function () {
    $("#choice1").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
    $('#choice1').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});
$('#choice2').hover(function () {
    $("#choice2").stop(true).animate({ padding: "0.75vw 1.25vw", opacity: 1.0 });
}, function () {
    $('#choice2').stop(true).animate({ padding: "0.5vw 1vw", opacity: 1.0 });
});


function newQuestion(chosenanswer, unchosen1, unchosen2, unchosen3, unchosen4) {

    $('#answer1').stop(true).fadeTo(500, 0, function () {
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

    //if (questionIndex < QUESTION_NUMBER-1) {
    //    questionIndex += 1;
    //}
    //else {
    //    questionIndex = 0;
    //}

    console.log(questionIndex);
    $('#question').stop(true).fadeTo(500, 0, function () {
        $('#question').text(questionArr[questionIndex]);
        $('#question').stop(true).fadeTo(100, 1);
    });

    

}

function showResult(menuArray, desire) {
    var match =getMatch(menuArray, desire);
    $('#question').text("You should get " + match + "!");
    $('#answerFood').attr('src', 'images/' + match + '.png');
    $('#answerDisplay').css("display", "contents");
    $('#answer1').css("display", "none");
    $('#answer2').css("display", "none");
    $('#answer3').css("display", "none");
    $('#answer4').css("display", "none");
    $('#answer5').css("display", "none");
    console.Log
}

//function hoverIn() {
//    $('#question1').stop(true).animate({ padding: "0.75vw 1.25vw" });
//}

//function hoverOut() {
//    $('#question1').stop(true).animate({ padding: "0.5vw 1vw" });
//}




//Roulette code
var roul = {
    

    start: function () {
        angle = prize.rnd(0, prize.number - 1) * (360 / prize.number);
        console.log("angle:" + angle);
        this.rotate(angle);
    },

    rotate: function (angle) {
        foodArr = ["pizza", "salad", "ramen", "curry", "falafel", "burrito", "sushi", "burger"]
        v = parseInt(angle);
        $('#turntable').rotate({
            angle: 0,
            animateTo: v + 360 * 1,
            duration: 7000,
            callback: function () {
                pr = prize.get(angle);
                console.log("prize " + pr);
                $('#footerText').text("What about some " + foodArr[pr-1]);
            }
        });
    }
};

var prize = {
    number: 8,
    mapping: {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8},

    get: function (angle) {
        index = parseInt(angle / (360 / this.number));
        return this.mapping[index];
    },

    rnd: function (n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    },
};






function getMatch(menuArray, desire) {
    var bestMatch = [menuArray[0],200];

    for (var i = 0; i < menuArray.length; i++) {
        var score = 0;
        score += Math.abs(desire[0] - menuArray[i].getCheapness());
        score += Math.abs(desire[1] - menuArray[i].getHeaviness());
        score += Math.abs(desire[2] - menuArray[i].getSpice());
        score += Math.abs(desire[3] - menuArray[i].getMeat());
        console.log(score);
        if (bestMatch[1] > score) {
            bestMatch = [menuArray[i], score];
        }
    }
    return bestMatch[0].getName();
};
