function change_text() {
    document.getElementById("description").innerHTML = "The fire lights up the room, but only dimly.";
}

function change_text2() {
    document.getElementById("description").innerHTML = "You talk to yourself. Your party members look at you strangely.";
}

function change_page_p1() {
    location.href("party1_page.html")
}

function hover(element) {
    element.setAttribute('src', '/images/item1_a.png');
}

function unhover(element) {
    element.setAttribute('src', '/images/item1.png');
}



function toggleMusic() {
    var x = document.getElementById("background_music");

    if (x.paused) {
        x.play();
    }
    else {
        x.pause();
    }
    
}

function pauseAudio() {
    x.pause();
} 