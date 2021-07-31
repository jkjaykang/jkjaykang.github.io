// JavaScript source code
$(function () {
    //Sliding through project carousel
    var counter = 2;
    var max = 3;
    //0 for mobile size initailly, 1 for desktop initially
    var initialMode = 0;
    var addedClickEvent = false;
    

    function carouselLeftMove(counter) {
        $("#project_" + counter).find("figcaption").css("display", "none");
        $("#project_" + counter).animate({
            opacity: 0.5,
            left: "20%",
            marginTop: "9.75vw",
            marginLeft: "-13vw",
            width: "26vw",
            height: "19.5vw",
        });
        $("#project_" + counter).find("img").animate({
            width: "26vw",
            height: "19.5vw",
        });
        console.log("Carousel moving left!");
    }

    function carouselRightMove(counter) {
        $("#project_" + counter).find("figcaption").css("display", "none");
        $("#project_" + counter).animate({
            opacity: 0.5,
            left: "80%",
            marginTop: "9.75vw",
            marginLeft: "-13vw",
            width: "26vw",
            height: "19.5vw",
        });
        $("#project_" + counter).find("img").animate({
            width: "26vw",
            height: "19.5vw",
        });
        console.log(getComputedStyle(document.documentElement).getPropertyValue('--proj-side-height'));
    }

    function carouselCenterMove(counter) {
        $("#project_" + counter).animate({
            opacity: 1.0,
            left: "50%",

            marginTop: "6.5vw",
            marginLeft: "-16.25vw",
            width: "32.5vw",
            height: "26vw",
        }, function () {
            $(this).find("figcaption").css("display", "block");
        });
        $("#project_" + counter).find("img").animate({
            width: "32.5vw",
            height: "26vw",
        });
    }

    if ($(window).width() <= 700) {
        initialMode = 0;

        //Make project slides into links
        $(document).on('click', '#project_1', function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/antri_home.html');
        });
        $(document).on('click', '#project_2', function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/Adventure%20In%20Antri/antri_adventure.html');
        });
        $(document).on('click', '#project_3', function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/blacksmith_store.html');
        });

    } else {
        initialMode = 1;
        addedClickEvent = true;

        //Carousel hover description effect
        $(document).on({
            "mouseenter.namespace": function () {
                $(this).find("figcaption").css("display", "block");
            },
            "mouseleave.namespace": function () {
                $(this).find("figcaption").css("display", "none");
            }

        }, ".active-carousel");

        $(document).on("click.namespace", ".right-carousel", function () {
            $("#project_" + counter).toggleClass("active-carousel");
            $("#project_" + counter).toggleClass("left-carousel");
            $("#project_" + counter).css("zIndex", 1);
            carouselLeftMove(counter);

            var left_carousel = counter - 1;
            if (left_carousel < 1) {
                left_carousel = max;
            }

            //Move the leftmost carousel to rightmost position (cycle)
            $("#project_" + left_carousel).css("zIndex", 0);
            carouselRightMove(left_carousel);
            $("#project_" + left_carousel).toggleClass("left-carousel");
            $("#project_" + left_carousel).toggleClass("right-carousel");

            counter += 1;
            if (counter > max) {
                console.log("Counter reset");
                counter = 1;
            }
            $("#project_" + counter).toggleClass("right-carousel");
            $("#project_" + counter).toggleClass("active-carousel");
            carouselCenterMove(counter);
            $("#project_" + counter).css("zIndex", 2);
        });

        $(document).on("click.namespace", ".left-carousel", function () {
            $("#project_" + counter).toggleClass("active-carousel");
            $("#project_" + counter).toggleClass("right-carousel");
            $("#project_" + counter).css("zIndex", 1);
            carouselRightMove(counter);

            var right_carousel = counter + 1;
            if (right_carousel > max) {
                right_carousel = 1;
            }

            $("#project_" + right_carousel).css("zIndex", 0);
            carouselLeftMove(right_carousel);
            $("#project_" + right_carousel).toggleClass("right-carousel");
            $("#project_" + right_carousel).toggleClass("left-carousel");

            counter -= 1;
            if (counter < 1) {
                counter = max;
            }
            $("#project_" + counter).css("zIndex", 2);
            $("#project_" + counter).toggleClass("active-carousel");
            $("#project_" + counter).toggleClass("left-carousel");
            carouselCenterMove(counter);
        });

        //Make project slides into links
        $("#project_1_caption").click(function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/antri_home.html');
        });
        $("#project_2_caption").click(function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/Adventure%20In%20Antri/antri_adventure.html');
        });
        $("#project_3_caption").click(function () {
            window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/blacksmith_store.html');
        });
    }

    

    $(window).resize(function () {
        if ($(window).width() <= 700) {
            console.log("whello");
            $(".active-carousel").find("figcaption").css("display", "block");
            $(document).off('mouseenter.namespace mouseleave.namespace');
            $(document).off('click.namespace');

        } else {
            console.log("window is desktop mode")
            $(document).on({
                "mouseenter.namespace": function () {
                    $(this).find("figcaption").css("display", "block");
                },
                "mouseleave.namespace": function () {
                    $(this).find("figcaption").css("display", "none");
                }

            }, ".active-carousel");

            $(document).off('click', '#project_1');
            $(document).off('click', '#project_2');
            $(document).off('click', '#project_3');

            if (initialMode == 0 && addedClickEvent == false) {
                $(document).on("click.namespace", ".right-carousel", function () {
                    $("#project_" + counter).toggleClass("active-carousel");
                    $("#project_" + counter).toggleClass("left-carousel");
                    $("#project_" + counter).css("zIndex", 1);
                    carouselLeftMove(counter);

                    var left_carousel = counter - 1;
                    if (left_carousel < 1) {
                        left_carousel = max;
                    }

                    //Move the leftmost carousel to rightmost position (cycle)
                    $("#project_" + left_carousel).css("zIndex", 0);
                    carouselRightMove(left_carousel);
                    $("#project_" + left_carousel).toggleClass("left-carousel");
                    $("#project_" + left_carousel).toggleClass("right-carousel");

                    counter += 1;
                    if (counter > max) {
                        console.log("Counter reset");
                        counter = 1;
                    }
                    $("#project_" + counter).toggleClass("right-carousel");
                    $("#project_" + counter).toggleClass("active-carousel");
                    carouselCenterMove(counter);
                    $("#project_" + counter).css("zIndex", 2);
                });

                $(document).on("click.namespace", ".left-carousel", function () {
                    $("#project_" + counter).toggleClass("active-carousel");
                    $("#project_" + counter).toggleClass("right-carousel");
                    $("#project_" + counter).css("zIndex", 1);
                    carouselRightMove(counter);

                    var right_carousel = counter + 1;
                    if (right_carousel > max) {
                        right_carousel = 1;
                    }

                    $("#project_" + right_carousel).css("zIndex", 0);
                    carouselLeftMove(right_carousel);
                    $("#project_" + right_carousel).toggleClass("right-carousel");
                    $("#project_" + right_carousel).toggleClass("left-carousel");

                    counter -= 1;
                    if (counter < 1) {
                        counter = max;
                    }
                    $("#project_" + counter).css("zIndex", 2);
                    $("#project_" + counter).toggleClass("active-carousel");
                    $("#project_" + counter).toggleClass("left-carousel");
                    carouselCenterMove(counter);
                });

                $("#project_1_caption").click(function () {
                    window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/antri_home.html');
                });
                $("#project_2_caption").click(function () {
                    window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/Adventure%20In%20Antri/antri_adventure.html');
                });
                $("#project_3_caption").click(function () {
                    window.open('https://jkjaykang.github.io/Web-Developer-Course/Dungeon/blacksmith_store.html');
                });

                addedClickEvent = true;
            } else {
                $(document).on('click.namespace');
            }

            
        }
    });

    

    //Make navbar clicking into smooth scrolling
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var targetEle = this.hash;
        var $targetEle = $(targetEle);

        $('html, body').stop().animate({
            'scrollTop': $targetEle.offset().top
        }, 400, 'swing', function () {
            window.location.hash = targetEle;
        });
    });

});