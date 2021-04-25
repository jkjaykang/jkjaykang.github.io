let slide_max = 7;
let slide_number = 1;

console.log("script laoded");

$("#back").on("click", function () {
    console.log("back");

    if (slide_number > 1) {
        slide_number -= 1;
        $('#slide').attr('src', 'images/' + slide_number + '.png');
    }
});

$("#forward").on("click", function () {
    console.log("forward");
    console.log('images/' + slide_number + '.png')
    if (slide_number < 7) {
        slide_number += 1;
        $('#slide').attr('src', 'images/' + slide_number + '.png');
    }
});
