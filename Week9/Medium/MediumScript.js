let titleButton = document.getElementById("title_medium_button");
let imageButton = document.getElementById("image_medium_button");
let authorButton = document.getElementById("author_medium_button");
let textButton = document.getElementById("text_medium_button");

let colorIndex = 0;
let titleIndex = 0;
let imageIndex = 0;
let authorIndex = 0;
let textIndex = 0;

var colorArray = ["rgb(181,67,67)", "white", "green"]
var backgroundColorArray = ["rgb(143,53,53)", "white", "white"]
var textColorArray = ["white", "black", "white"]

var logoArray = ["images/eye.jfif", "images/nyt.png", "images/onion.jfif"];
var titleArray = ["THEY ARE WATCHING", "Data privacy a growing concern", "Man posts about warning of government survelience on Facebook as the platform leaks his data for the 5th time"];

var screenArray = ["images/1984.jfif","images/data.jfif","images/angry.jfif"];

var authorPictureArray = ["images/brain.jfif", "images/profile.png", "images/harold.jfif"];
var authorNameArray = ["T for Truth, not Tony", "Glenn Haena", "Harold"];
var authorDescArray = ["Tony is a part time conspiracy theorist, which makes him a full time clown. He spreads the truth to the people, even knowing he will be silenced. A true hero.",
    "Glenn Haena is a journalist and an associate professor who teaches classes on data privacy. He is very qualified, that's why he's on New York Times.",
    "Harold has been a writier for the Onion for many years now. He lives in a state of pain, as his satrical articles either are outdone by reality or turns true in a year or two."];


var articleArray = ["It's time to wake up people. The government got eyes all around, they are monitoring us! Those birds outside, they're drones, designed to keep watch",
"Data privacy is a growing concern. What can you do about it? Not much really.", "Leaked again. Yay."]



titleButton.addEventListener('click', changeWebsite);
imageButton.addEventListener('click', changeWebsitePicture);
authorButton.addEventListener('click', changeWebsiteAuthor);

function changeWebsite() {
    var screen = document.getElementById("screen");
    screen.style.animationName = "shake";
    changeWebsiteAuthor();
    changeWebsitePicture();
    changeWebsiteTitle();
}

function changeWebsiteTitle() {
    console.log("changing website title!");
    var logo = document.getElementById("logo");
    var title = document.getElementById("title");
    var banner = document.querySelector(".title_header")
    var body = document.querySelector("body");
    logo.src = logoArray[titleIndex];
    title.innerHTML = titleArray[titleIndex];
    title.style.color = textColorArray[colorIndex];
    banner.style.backgroundColor = colorArray[colorIndex];
    body.style.backgroundColor = backgroundColorArray[colorIndex];


    titleIndex = titleIndex + 1;
    colorIndex = colorIndex + 1;
    if (titleIndex >= logoArray.length) {
        titleIndex = 0;
        colorIndex = 0;
    }
}

function changeWebsitePicture() {
    console.log("changing website picture!");
    var screen = document.getElementById("screen");
    screen.src = screenArray[imageIndex];
    imageIndex = imageIndex + 1;
    console.log(imageIndex);
    if (imageIndex >= screenArray.length) {
        imageIndex = 0;
    }
}

function changeWebsiteAuthor() {
    console.log("changing website author!");
    var pic = document.getElementById("picture");
    var name = document.getElementById("name");
    var desc = document.getElementById("desc");
    var banner = document.querySelector("#author_info")

    pic.src = authorPictureArray[authorIndex];
    name.innerHTML = authorNameArray[authorIndex];
    desc.innerHTML = authorDescArray[authorIndex];
    banner.style.backgroundColor = colorArray[colorIndex];
    name.style.color = textColorArray[colorIndex];
    desc.style.color = textColorArray[colorIndex];
    authorIndex = authorIndex + 1;
    
    if (authorIndex >= authorNameArray.length) {
        authorIndex = 0;
    }
}
