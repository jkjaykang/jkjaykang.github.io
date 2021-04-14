console.log("Script is running");

var messages = ["Now, this. This is art.", "It's a great drawing!", "Bold and brash", "Each line has a life of it's own",
                "Words can't explain this masterpiece.", "Amazing", "*sound of applause*"]


//code adapted from http://www.onlywebpro.com/2013/01/10/create-html5-canvas-drawing-board-within-5-minutes/
window.onload = function() {
    console.log("Creating art!");
    //var canvas = $("#drawingZone");
    var canvas = document.getElementById("drawingZone");
    var brushColor = "black";

    if (canvas) {
        console.log("Canvas has been grabbed");
        var brushPressed = false;
        var ctx = canvas.getContext("2d");
        var canvasX, canvasY;
        ctx.brushWidth = 5;

        $(canvas).mousedown(function(e) {
            brushPressed = true;
            ctx.beginPath();
            canvasX = e.pageX - canvas.offsetLeft;
            canvasY = e.pageY - canvas.offsetTop;
            ctx.moveTo(canvasX, canvasY);
        })

        $(canvas).mousemove(function(e) {
            if (brushPressed != false) {
                canvasX = e.pageX - canvas.offsetLeft;
                canvasY = e.pageY - canvas.offsetTop;
                ctx.lineTo(canvasX, canvasY);
                ctx.strokeStyle = brushColor;
                ctx.stroke();
            }
        })

        $(canvas).mouseup(function(e) {
            brushPressed = false;
            ctx.closePath();
        })
    }

    $(document).on('click', '#redButton', function () {
        console.log("changing to red color");
        brushColor = "red"; 
    });

    $(document).on('click', '#blueButton', function () {
        console.log("changing to blue color");
        brushColor = "blue";
    });

    $(document).on('click', '#yellowButton', function () {
        console.log("changing to yellow color");
        brushColor = "yellow";
    });

    $(document).on('click', '#blackButton', function () {
        console.log("changing to black color");
        brushColor = "black";
    });

    $(document).on('click', '#eraser', function () {
        console.log("changing to eraser");
        brushColor = "white";
    });
}

//$("#clearButton").on('click', clear());
$(document).on('click', '#clearButton', function () {
    console.log("clearing");
    var canvas = document.getElementById("drawingZone");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


$(document).ready(function () {
    $("#dialog").dialog({ autoOpen: false });
    $("#Submitbtn").click(function () {
        $("#dialog").dialog("open");
    });
});

$('#Yes').click(function () {
    //location.reload();
    console.log("Yes!");
    $("#dialog").dialog("close");
    $('#dialog2').dialog("open");
    var random = Math.floor(Math.random() * 7);
    $('#posMessage').html(messages[random]);
})

$(document).ready(function () {
    $("#dialog2").dialog({ autoOpen: false });
});

