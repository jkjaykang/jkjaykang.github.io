$(document).ready(function () {
    //Set up scroll up button
    $(window).scroll(function () {
        //if ($("body").scrollTop > 20 || $("html").scrollTop > 20) {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            $("#scroll_btn").css("display", "block");
        } else {
            $("#scroll_btn").css("display", "none");
        }
        
    });

    $("#scroll_btn").click(function () {
        jQuery('html,body').animate({ scrollTop: 0 }, 0, function () {
        });
        
    });

    //antri map
    //$("#area1").hover(function () {

    //});
})

