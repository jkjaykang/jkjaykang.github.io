class Dialogue {
    constructor(length, text_arr, pic_arr) {
        this.length = length;
        this.text_arr = text_arr;
        this.pic_arr = pic_arr;
    }
}

function advance_text(dialogue, dia_num) {
    if (dia_num[0] >= dialogue.length) {
        return;
    }
    else {
        document.getElementById("description").innerHTML = dialogue.text_arr[dia_num[0]];
        document.getElementById("screen_pic").src = dialogue.pic_arr[dia_num[0]];
        dia_num[0] += 1;
    }
}

function change_topic(dialogue) {
    current_dialogue = dialogue;
    dia_num[0] = 0;
    advance_text(current_dialogue, dia_num)
}


function change_text() {
    document.getElementById("description").innerHTML = "The fire lights up the room, but only dimly. (1/1)";
}

function change_text2() {
    document.getElementById("description").innerHTML = "You talk to yourself. Your party members look at you strangely.";
}

function update_tooltip(action) {
    var tooltip = document.getElementById("tooltip_desc")
    tooltip.innerHTML = action;
    if (tooltip.style.opacity == 0) {
        tooltip.style.opacity = 1;
    }
    else {
        tooltip.style.opacity = 0;
    }
    
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