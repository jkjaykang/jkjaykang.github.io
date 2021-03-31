console.log("the message is here!");

//global variable are useful in front end web 
// bc you can query the Chrome console for them
let theBody, theTxt, visible, count;

// pass the body of the DOM into a variable
theBody = document.querySelector("body");
visible = 1;
count = 0;
// GET ELEMENT BY ID
// pass the button into a variable using it's id propety
let theButton = document.getElementById("myButton");
theButton.style.opacity = 1;
theTxt = document.querySelector('h2');
// EVENT LISTENER
// add an event listener and function to trigger to that variable
theButton.addEventListener('click', myGreatFunction);

function myGreatFunction(){
    console.log(visible);
    console.log(theButton.style.opacity);
    //jay lays it down
    //theBody.style.backgroundColor = "yellow";

    if (visible == 1) {
        theButton.style.opacity = theButton.style.opacity - 0.1;
        console.log("decreasing!");
        
    }
    else if (visible == 0){
        theButton.style.opacity = 1;
        visible = 1;
        console.log("increasing!");
    }
    
    if (theButton.style.opacity <= 0) {
        visible = 0;
    }
    else if (theButton.style.opacity > 1) {
        visible = 1;
    }
    count += 1;
    changeBackGroundColor(count);
    theTxt.textContent = "you pressed the button " + count + " times!";

    
    let temp = Math.floor(Math.random() * 110) + 50
    theButton.style.padding = temp + "px";
    theButton.style.borderStyle = "dotted";
    
}

function changeBackGroundColor(num) {
    if (num % 2 == 0) {
        theButton.style.backgroundColor = "green";
    }
    else if (num % 3 == 0) {
        theButton.style.backgroundColor = "blue";
    }
    else {
        theButton.style.backgroundColor = "cyan";
    }

}

// Es6 arrow notiona
document.addEventListener('keydown', theEvent => {
    console.log("key pressed!");
    theTxt.style.backgroundColor = "pink";

})