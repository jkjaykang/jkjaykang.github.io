$(function () {
    var activeSlide = "titleCard";

    $("#aboutMeButton").click(function () {
        $("#" + activeSlide).css({ position: 'absolute' })
        $("#" + activeSlide).animate({
            width: "0"
        }, 500, function () {
            $("#" + activeSlide).css({ display: 'none' });
            activeSlide = "aboutMe";
            $("#" + activeSlide).css({ display: 'flex' });
            $("#" + activeSlide).animate({
                width: "100vw"
            }, 500);

        });
        
        
    });

});
