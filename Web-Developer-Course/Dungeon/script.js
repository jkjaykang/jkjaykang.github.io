// JavaScript source code
var item_prices = {
    "sword": 100,
    "soup": 0,
    "shield": 50,
    "whetstone": 20,
    "dagger": 40,
    "old_shield": 20,
    "arrows": 20,
    "heavy_chestplate": 100,
    "light_chestplate": 70
};

var descriptions = {
    "sword": "It's sharpened and comes with a handguard. Fingers are precious after all.",
    "soup": "What am I eating? It's pumpkin soup. You want some?",
    "shield": "That will block most attacks, or it will break trying!",
    "whetstone": "That's my speical whetstone made with special alloy. Only one swipe needed to sharpen a blade.",
    "dagger": "Are daggers the cupcakes of swords? Aren't they just a smaller sword? Like how cupcakes are smaller cakes?",
    "old_shield": "Oops, how'd that get there? That's the first shield I made. It's mostly paperweight at this point.",
    "arrows": "We don't sell bows, but we do sell arrows.",
    "heavy_chestplate": "That's a heavy chestplate with some modification to make it easy and comfortable to wear.",
    "light_chestplate": "It doesn't protect as well as a traditional chestplate, but it won't weigh you down like one either."
};

var purchase_quotes = {
    "sword": "Thank you for your purchase!",
    "soup": "Well... have a bowl, on the house.",
    "shield": "Stay safe!",
    "whetstone": "Wait, am I saying my blades dull easily by selling a whetstone?",
    "dagger": "Don't commit too many crimes with it.",
    "old_shield": "Selling the first shield I made... I wonder if this is what it feels like to see your child go off to magic university.",
    "arrows": "If you need a new bow, visit Laman next doors",
    "heavy_chestplate": "Will you need that fitted?",
    "light_chestplate": "Try to get stabbed in the areas with the metal!"
}

var description_expression = {
    "sword": "talking",
    "soup": "eating",
    "shield": "talking",
    "whetstone": "talking",
    "dagger": "ponder",
    "old_shield": "scratch",
    "arrows": "talking",
    "heavy_chestplate": "talking",
    "light_chestplate": "talking"
}

var purchase_expression = {
    "sword": "happy",
    "soup": "laughing",
    "shield": "happy",
    "whetstone": "ponder",
    "dagger": "laughing",
    "old_shield": "crying",
    "arrows": "happy",
    "heavy_chestplate": "happy",
    "light_chestplate": "laughing"
}

var tooltip_text = {
    "sword": "Its a simple, but well crafted sword. It comes with a handguard. (100G)",
    "soup": "Soup that Ita is eating currently. It smells of pumpkins and potatoes. (Free if nicely asked)",
    "shield": "A shield made with steel and wood. (50G)",
    "whetstone": "A shiny whetstone. It seems to glow a faint blue. (20G)",
    "dagger": "A short dagger. Pointed to near perfection. (40G)",
    "old_shield": "A dinky wooden shield. It looks like it's been thrown around. (20G)",
    "arrows": "A bundle of steel arrows decorated with blue feathers. (20G)",
    "heavy_chestplate": "A chestplate with a leather clothing underneath it for maximum comfort. (100G)",
    "light_chestplate": "A chestplate that only guards the most neccessary areas. Extremely light. (70G)"
}

var item_spot = {
    "sword": 1,
    "soup": 9,
    "shield": 4,
    "whetstone": 3,
    "dagger": 2,
    "old_shield": 5,
    "arrows": 6,
    "heavy_chestplate": 7,
    "light_chestplate": 8
}

var total_price = 0;
var done_shopping = false;

var hover_sound = document.createElement('audio');
hover_sound.setAttribute("src", "sounds/hover.mp3");
var purchase_sound = document.createElement('audio');
purchase_sound.setAttribute("src", "sounds/purchase.wav");
var rustle_sound = document.createElement('audio');
rustle_sound.setAttribute("src", "sounds/rustle.wav");
var talking_sound = document.createElement('audio');
talking_sound.setAttribute("src", "sounds/talking.wav");

$(function () {
    //makes shop items draggable
    var being_dragged = false;

    $(document).tooltip({
        track: true,
        tooltipClass: "tooltip"
    });

    //make items draggable, 
    $(".shop_item").draggable({
        revert: "invalid",
        start: function () {
            //alert("drag event started")
            being_dragged = true;
            $(this).css({ 'cursor': 'pointer' });
            $(this).find('img').attr("src", "images/" + $(this).attr("id") + "_item.png");
            $(document).tooltip("disable");
            $(this).css({ 'zIndex': 2 });
            $("#pouch_sprite").attr("src", "images/pouch_open.png");
        },
        drag: function () {

        },
        stop: function () {
            //displayed_text[0] = false;
            being_dragged = false;
            $(this).css({ 'cursor': 'default' });
            $(this).find('img').attr("src", "images/" + $(this).attr("id") + "_item.gif");
            $(document).tooltip("enable");
            $(this).css({ 'zIndex': 1 });
            $("#pouch_sprite").attr("src", "images/pouch_closed.png");
        }
    });

    //items are abled to be dropped onto the pouch
    $("#pouch").droppable({
        drop: function (event, ui) {
            var draggableID = ui.draggable.attr("id");
            //updates purchased items
            var price = item_prices[draggableID]
            $("#bought_items").append("<div class='purchased_item'><p style='font-size: 0.45vw'>" + draggableID + ": " + price + "G</p><button class='refund_button' id="+draggableID+">x</button></div>");
            total_price += price;
            $("#total_cost").html("<p>Total: " + total_price + "G</p>");

            var str = purchase_quotes[draggableID];

            rustle_sound.play();

            ui.draggable.fadeOut(100);
            
            animate_text(str);      
            animate_face(purchase_expression[draggableID]);
        }
    });


    var displayed_text = [false, ""];

    //hover animations
    $(".shop_item").hover(
        function () {
            var hoverID = $(this).attr("id");
            var str = descriptions[hoverID];
            hover_animate(str, hoverID);
            if (being_dragged == false) {
                $(this).find('img').attr("src", "images/" + hoverID + "_item.png");
                $(this).css({ 'cursor': 'pointer' });
                animate_face(description_expression[hoverID]);
                hover_sound.play();
            }
        },
        function () {
            if (being_dragged == false) {
                $(this).css({ 'cursor': 'default' });
                var hoverID = $(this).attr("id");
                $(this).find("img").attr("src", "images/" + hoverID + "_item.gif");
            }


        }
    );

    $("#purchase_button").click(function () {
        if (total_price > 0) {
            animate_text("Thank you for your patronage!");
        } else {
            animate_text("Well, come back if you need anything!")
        }
        if (done_shopping == false) {
            purchase_sound.play();
        }
        animate_face("happy");
        done_shopping = true;
        $("#pouch").droppable('disable');
        
    });

    $('body').on('click', '.refund_button', function () {
        console.log("refund");
        var refund_ID = $(this).attr("id")
        var price = item_prices[refund_ID];
        total_price -= price;
        $("#total_cost").html("<p>Total: " + total_price + "G</p>");
        $(this).parent().fadeOut(0);
        replace_item(refund_ID);
        set_draggable();
        set_hover();
        animate_text("Not to your liking?");
        animate_face("talking");
    });

    //functions
    function hover_animate(str, ID) {
        if ((displayed_text[0] == false
            || displayed_text[1] != ID)
            && being_dragged == false) {
            animate_text(str);
        }
        displayed_text[0] = true;
        displayed_text[1] = ID;
    }


    function animate_text(str) {
        if (done_shopping == false) {
            var spans = "<span>" + str.split(/\s+/).join(' </span><span>') + '</span>';

            $("#dialogue").html("");

            //talking_sound.play();
            $(spans).hide().appendTo('#dialogue').each(function (i) {
                $(this).delay(100 * i).fadeIn(0);
            });
        }
    }

    function animate_face(expression) {
        if (done_shopping == false) {
            $("#char_pic").attr("src", "images/ita_" + expression + ".gif")
        }
    }

    function set_draggable() {
        $(".shop_item").draggable({
            revert: "invalid",
            start: function () {
                //alert("drag event started")
                being_dragged = true;
                $(this).css({ 'cursor': 'pointer' });
                $(this).find('img').attr("src", "images/" + $(this).attr("id") + "_item.png");
                $(document).tooltip("disable");
                $(this).css({ 'zIndex': 2 });
                $("#pouch_sprite").attr("src", "images/pouch_open.png");
            },
            drag: function () {

            },
            stop: function () {
                //displayed_text[0] = false;
                being_dragged = false;
                $(this).css({ 'cursor': 'default' });
                $(this).find('img').attr("src", "images/" + $(this).attr("id") + "_item.gif");
                $(document).tooltip("enable");
                $(this).css({ 'zIndex': 1 });
                $("#pouch_sprite").attr("src", "images/pouch_closed.png");
            }
        });
    }

    function set_hover() {
        $(".shop_item").hover(
            function () {
                var hoverID = $(this).attr("id");
                var str = descriptions[hoverID];
                hover_animate(str, hoverID);
                if (being_dragged == false) {
                    $(this).find('img').attr("src", "images/" + hoverID + "_item.png");
                    $(this).css({ 'cursor': 'pointer' });
                    animate_face(description_expression[hoverID]);
                    hover_sound.play();
                }
            },
            function () {
                if (being_dragged == false) {
                    $(this).css({ 'cursor': 'default' });
                    var hoverID = $(this).attr("id");
                    $(this).find("img").attr("src", "images/" + hoverID + "_item.gif");
                }


            }
        );
    }

    function replace_item(ID) {
        $("#item_container").append("<div class='shop_item item" + item_spot[ID] +"' id=" + ID + " title='" + tooltip_text[ID] + "'><img id=" + ID + "_sprite " + "src='images/" + ID + "_item.gif' alt=" +ID +"/></div>");

    }

});