
var hallStartTemplate = {
    name: "Hall Lightroot",
    portrait: "images/char_portrait/Hall_idle.png",
    hp: 15,
    exp: 10,
    str: 7,
    dex: 7,
    int: 4,
    chr: 5,
    backstory: `One of the numerous offspring of the previous hero, Hall was raised in the house of Lightborn as
                a potential hero for the next generation, going through rigorous training. While he was chosen as the next hero, Hall claims he had
                a 'minor' dispute with the managerial members of the house, and escaped the house. Now he enjoys his carefree 
                life as a adventurer, but he can't seem to quite get rid of his habit of helping people in need as a former
                hero canadiate.`,
    traits: ["freak_of_nature", "slow_starter"]
}

var veraStartTemplate = {
    name: "Vera Daran",
    portrait: "images/char_portrait/Vera_idle.png",
    hp: 35,
    exp: 10,
    str: 4,
    dex: 5,
    int: 9,
    chr: 4,
    backstory: `Studying a rather peculiar field of magic, Vera is an avid conoisseur of everything to do with fear.
                While she claims she is studying fear magic to help people get over their fears, she seems to find
                an awful amount of joy making a bandit or a monster run away crying.Due to the amount of scary stories
                she reads to research fear doesn't help her fall asleep, resulting in the bags under her eyes.`,
    traits: ["magical_aptitude", "insomniac"],
    items: ["wooden_staff", "leather_armor"],
    skills: ["ball_o_fear"]
}

var previous_slide;


//These are the variables for the current stat of the character
var hpStat = {
    currHp: 35,
    maxHp: 35,
    currArmor: 0,
    defaultArmor: 0
};

var expStat = {
    currExp: 0,
    maxExp: 30
};

var level = 1;

var weaponInventory = {
    sword: 0,
    dagger: 0,
    wooden_staff: 0,
}

var armorInventory = {
    leather_armor: 0,
    chainmail: 0
}

var useInventory = {
    health_potion_small: 0
}

var miscInventory = {
    key: 0
}

var cardModifier = {
    strike_count: 5,
    defend_count: 5
}

var playerGold = 0;

var equippedItem = {
    head: "None",
    chest: "None",
    weapon: "None",
    jewel: "None",
    feet: "None",
}

var moveDeck = [];

var playerSkills = []

//Variables for dungeon
var dungeonFloor = 0;

//Variables for combat 
var currentCombat = "intro";
var combatDrawPile = moveDeck;
var combatDiscardPile = [];

var curr_action_points = 3;
var max_action_points = 3;

var combat_turn = 0;
var enemy_count = 0;

var enemyArray;
var enemy_index = 0;  

var enemies_stat = {
    enemy_1: {
        health: 0,
        max_health: 0,
        armor: 0,
        alive: false
    },

    enemy_2: {
        health: 0,
        max_health: 0,
        armor: 0,
        alive: false
    },

    enemy_3: {
        health: 0,
        max_health: 0,
        armor: 0,
        alive: false
    }
    
}

//EDIT STUFF TO BE CONST!!!

//Game Assest Description
var traitsDict = {
    strong_willed: {
        name: 'strong-willed',
        description: 'I am strong-willed!'
    },
    talented: {
        name: "talented",
        description: 'Am talented'
    },
    clumsy: {
        name: "clumsy",
        description: 'Geez am clumsy'
    },
    magical_aptitude: {
        name: "magical aptitude",
        description: "Spell cards deal more damage"
    },
    insomniac: {
        name: "insomniac",
        description: "Heal less at taverns"
    },
    freak_of_nature: {
        name: "freak of nature",
        description: "What is his body made of?"
    },
    slow_starter: {
        name: "slow starter",
        description: "Start off each combat with 1 less AP"
    }
}

var itemDict = {
    sword: {
        name: 'Sword',
        description: 'Standard sword. Sharp!',
        cost: 20,
        type: "weapon",
        card: "strike",
    },

    dagger: {
        name: 'Dagger',
        description: 'Small, concealable weapon. Sharp!',
        cost: 15,
        type: "weapon",
        card: "strike"
    },

    wooden_staff: {
        name: 'Wooden staff',
        description: 'This is basically just a big stick. Attack: staff strike',
        cost: 10,
        type: "weapon",
        card: "staff_strike"
    },

    leather_armor: {
        name: 'Leather armor',
        description: 'Armor made of leather. Defend: block',
        cost: 50,
        type: "chest",
        card: "block"
    },

    health_potion_small: {
        name: 'Health potion (s)',
        description: 'A small health potion. Recovers 20 hp. Carbonated.',
        cost: 20,
        type: "use"
    }
}

var shopDict = {
    cambria_potion_shop: {
        name: "Potion Shop",
        items: ["health_potion_small", "health_potion_small", "health_potion_small", "health_potion_small", "health_potion_small",],
        leave: "cambria"
    }
}

var movesDict = {
    strike: { type: "attack", value: 5, cost: 1},
    defend: { type: "defend", value: 5, cost: 1},
    special: { type: "attack", value: 10, cost: 2 },
    staff_strike: {
        name: "staff strike",
        type: "attack",
        value: 5,
        cost: 1,
        description: "Vera strikes with her staff dealing damage"
        },
    block: {
        name: "block",
        type: "defend",
        value: 5,
        cost: 1,
        description: "Block 5 damage"
    },
    ball_o_fear: {
        name: "Ball-o-fear",
        type: "aoe",
        value: 5,
        cost: 2,
        description: "Vera lobs a solidified ball of fear, dealing damage to all enemies"
    }
}

var enemiesDict = {
    slime_1: {
        turns: [["attack", 5], ["attack", 6], ["defend", 5], ["defend", 5], ["attack", 7]],
        health: 10,
        armor: 0
    },
    slime_2: {
        turns: [["defend", 4], ["attack", 5], ["defend", 4], ["attack", 6], ["defend", 5]],
        health: 10,
        armor: 0
    },
    slime_3: {
        turns: [["attack", 5], ["attack", 5], ["defend", 5], ["defend", 5], ["attack", 5]],
        health: 10,
        armor: 0
    },
    slime_boss: {
        turns: [["attack", 100], ["attack", 200]],
        health: 200,
        armor: 0
    }
}

var combatDict = {
    intro: {
        area: "Caves I",
        enemies: ["slime_1"],
        reward: ["gold"],
        next: ["change_slide", "map"]
    },

    caves_1: {
        area: "Caves",
        enemies: ["slime_1", "slime_1"],
        reward: [["xp", 4], ["gold", 40]],
        next: ["dungeon_slide", "caves"]
    },

    test_boss: {
        area: "Deep caves",
        enemies: ["slime_boss"],
        reward: ["gold"],
        next: ["dungeon_slide", "caves"]
    }
}

var eventDict = {
    intro_slide_1: {
        title : "A strange guest",
        image : "intro_encounter",
        description : `After a day of dungeon crawling, you decide to rest a the tavern. A strange man approaches you,
                                taking out some food from his coat. <span class='yellow'> "You look quite hungry, how about a treat? On the house, of course."</span> Although you
                                are not supposed to take foods from stranger, you are strangely compelled to have a bite...`,
        choices : ["Eat the cupcake", "Eat the apple", "Eat the pizza"],
        choicesEffects : [["change_slide", "intro_slide_2"], ["change_slide", "intro_slide_2"], ["change_slide", "intro_slide_2"]]
    },

    intro_slide_2: {
        title : "A strange guest",
        image : "intro_encounter",
        description : `You take a bite... And it tastes great! Almost too great? Oh, yea, it's too great.
                                Yup, it's hitting you now. You start to lose conciousness...`,
        choices : ["Faint"],
        choicesEffects : [["change_slide", "map", "dialogue", "intro_dialogue_vera"]]
    },

    cambria_potion_seller: {
        title: "Potion shop",
        image: "cambria_potion_seller",
        description: `You walk into the potion shop. The shopowner greets you. "Don't mind the smoke, just a little mixing accident". She takes a sip of a potion.
                     "Ah, I assure you, every product is safe as it can be!"`,
        choices: ["Shop", "Leave"],
        choicesEffects : [["open_shop", "cambria_potion_shop"], ["change_slide","cambria"]]
    },

    campfire: {
        title: "Campfire",
        image: "intro_encounter",
        description: `You light a campfire to take a breather. This is a great time to swap out equipment, eat some food,
                      and just rest.`,
        choices: ["Rest"],
        choicesEffects: [["dungeon_slide", "caves"]]
    },

    caves_1: {
        title: "Rat chef",
        image: "intro_encounter",
        description: "You see a rat. He do be cooking.",
        choices: ["Eat"],
        choicesEffects: [["dungeon_slide", "caves"]]
    }

    

}

var dungeonDict = {
    caves: {
        area: "Caves",
        description: `Dark and rocky, caves are a home to many creatures who prefer the darkness to the morning sun. Caves are also hard to navigate and home to many blockages,
                            so bring torches, shovels, and maybe even bombs.Be careful when clearing blockages, unless you prefer a closed casket funeral.`
    }
}

var townDict = {
    cambria: {
        choices: ["Tavern", "Potion Shop", "Blackmsith", "Muck around", "Leave"],
        choicesEffects: [[], ["change_slide", "cambria_potion_seller"], [], [], ["change_slide", "map"]]
    }
}


//Game Dialogue Dictionary
var dialogueDict = {
    intro_dialogue_vera: {
        speaker: ["Vera", "Vera", "Vera", "Vera", "Vera", "Vera", "Vera", "Vera"],
        image: ["Vera_annoyed", "Vera_annoyed", "Vera_idle", "Vera_idle", "Vera_intro_suprised",
                "Vera_idle", "Vera_idle", "Vera_idle", "Vera_idle", "Vera_idle",
                "Vera_idle", "Vera_idle", "Vera_idle", "Vera_idle", "Vera_idle", "Vera_idle"],
        quote: ["Ow, that's one nasty headache...", "What happened? Did I faint? What was in that food?", "Why do I feel so sluggish?",
            "Lets see...", "Level 1??!", "What happened?", "There goes my university education.", "But if I'm level one...",
            "Yup, all my equipment is gone too.", "And the only skill I have access to is 'Ball-o-fear'. First spell I ever devised.",
            "This won't do, I need to bolster my list of skills. Huh? I think I feel something in my inventory? (Open weapons tab by clicking the 'weapons' button upper right)",
            "Better than nothing. Let's equip it by clicking the 'e'(equip) button.", "That should give me access to some additional skills while I have it equipped.",
            "I can unequip my items by dragging it to bag icon in my 'equip' tab, but no reason to right now.", "I guess I should see how weak I've really gotten.",
            "The caves next to the desert is a begineer's dungeon if I remember correctly. (Finish the dialogue by pressing the forward button, and click on the cave icon on the map)"],
        function: ["None", "None", "None", "show_char_stat", "None", "None", "None", "show_inventory"]
    },
    intro_cambria_vera: {
        speaker: ["Vera"],
        image: ["Vera_idle", "Hall_idle", "Hall_idle", "Vera_idle", "Hall_idle", "Hall_idle", "Vera_idle", "Hall_idle", "Vera_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle",
            "Vera_idle", "Hall_idle", "Vera_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Hall_idle", "Vera_idle", "Hall_idle", "Hall_idle",
            "Vera_idle", "Hall_idle"],
        quote: ["As  you enter the town, a familiar voice greets you", "Heyo, where did you go last night? I was searching for you all morning.", "You seem different? Did you get a haircut?",
            "You explain the predicament you have found yourself in", "Dare I say 'deserved'? This has to be karmic justice for you using me as a labrat all the time",
            "Thanks to you, I now have an irrational fear of eating food off the floor", "That's a good thing.", "Well, you're an elf, so no sweat right? It's not like you're getting older",
            "I suppose that's an optimistic way of looking at it.", "Wait, but I'm not an elf. I don't want to be an old man next time we go dungeon crawling together.",
            "Hm... You still have your old gear? No? Let's go buy some then. My treat.", "Let's just visit all the shops and pick out what you need.", "Tavern is the place where you can buy food",
            "Food is relatively cheap and heals a lot, but it can't be used during combat", "Why are you explaining me this. I know all of this",
            "But it's in my nature to explain, nay not as a man, but as a supporting character. You got to let me have this.", "Fine. But only because you're paying for all this",
            "Yay! Here have some chicken", "Next is the potion shop", "Potions can be used during combat, and they have an array of effects", "I suppose some health and energy potions will do for now",
            "And finally. We're at the blackmsith.", "You can buy all sorts of weapons, armor, and even traveling gear here.", "I'll buy you some armor and torches.", "Well I think that does it.",
            "Really? Aren't you loaded with all the adventuring gold, buy me more potions", "Not anymore, I spent it all trying to befriend a dragon.",
            "In fact, I'm gonna have to sleep outside today since I bought you these stuff", "Huh. Thanks for your help then.", "Leeching off is what friends are for! Have fun."],
        function: []
    }
}

var currentDialogue = "None";
var currentDialogueSlide = 0;
var currentDialogueMax = 0;

$(function () {

    //Set up jquery ui tooltip
    $(document).tooltip({
        track: true,
        show: false,
        hide: false
    });

    //Set up dialogue functionality
    function startDialogue(dialogueKey) {

        $("#dialogue_container").slideDown({
            start: function () {
                $("#dialogue_container").css({
                    display: "flex"
                })
            }
        });

        currentDialogue = dialogueKey;
        currentDialogueSlide = 0;
        currentDialogueMax = dialogueDict[dialogueKey].quote.length;
        $("#dialogue_portrait_name").html(dialogueDict[dialogueKey].speaker[0]);
        $("#dialogue_portrait_image").attr("src", "images/char_portrait/" + dialogueDict[dialogueKey].image[0] + ".png");    
        $("#dialogue_content").html(dialogueDict[dialogueKey].quote[0]);
    }

    $("#back_dialogue_button").click(function () {
        //alert("backward button clicked");
        if (currentDialogue != "None") {
            if (currentDialogueSlide != 0) {
                currentDialogueSlide -= 1;
                $("#dialogue_portrait_name").html(dialogueDict[currentDialogue].speaker[currentDialogueSlide]);
                $("#dialogue_portrait_image").attr("src", "images/char_portrait/" + dialogueDict[currentDialogue].image[currentDialogueSlide] + ".png");     
                $("#dialogue_content").html(dialogueDict[currentDialogue].quote[currentDialogueSlide]);
            }
        }
    });

    $("#forward_dialogue_button").click(function () {
        //alert("forward button clicked");
        if (currentDialogue != "None") {
            currentDialogueSlide += 1;
            if (currentDialogueSlide >= currentDialogueMax) {
                currentDialogue = "None";
                currentDialogueSlide = 0;
                urrentDialogueMax = 0;
                $("#dialogue_portrait_image").attr("src", "images/dialogue/empty_dialogue.png");
                $("#dialogue_portrait_name").html("")
                $("#dialogue_content").html("");
                $("#dialogue_container").slideUp();
            } else {
                $("#dialogue_portrait_name").html(dialogueDict[currentDialogue].speaker[currentDialogueSlide]);
                $("#dialogue_portrait_image").attr("src", "images/char_portrait/" + dialogueDict[currentDialogue].image[currentDialogueSlide] + ".png");
                $("#dialogue_content").html(dialogueDict[currentDialogue].quote[currentDialogueSlide]);

                switch (dialogueDict[currentDialogue].function[currentDialogueSlide]) {
                    case "None":
                        break;
                    case "show_char_stat":
                        show_char_stat();
                        break;
                    case "show_inventory":
                        show_inventory();
                        break;
                }
            }
        }
    });

    function show_char_stat() {
        $("#char_container").fadeIn({
            start: function () {
                $("#char_container").css({
                    display: "grid"
                })
            }

        });
    }

    function show_inventory() {
        $("#inventory_container").fadeIn({
            start: function () {
                //$("#inventory_container").css({
                //    //display: "flex"
                //})
            }
        });
    }


    //Set up toggle between inventory buttons
    $(document).on("click", ".inventory_button", function () {

        var activeButton = $(".active_inventory_button");
        var activeContainer = $("#equip_container");

        switch (activeButton.attr("id")) {
            case "equip_button":
                activeContainer = $("#equip_container");
                break;
            case "weapons_button":
                activeContainer = $("#weapons_container");
                break;
            case "armor_button":
                activeContainer = $("#armor_container");
                break;
            case "use_button":
                activeContainer = $("#use_container");
                break;
            case "misc_button":
                activeContainer = $("#misc_container");
                break;
        }

        activeContainer.css("display", "none");
        activeButton.toggleClass("active_inventory_button");
        $(this).toggleClass("active_inventory_button");

        switch (this.id) {
            case "equip_button":
                $("#equip_container").css("display", "block");
                break;
            case "weapons_button":
                $("#weapons_container").css("display", "block");
                break;
            case "armor_button":
                $("#armor_container").css("display", "block");
                break;
            case "use_button":
                $("#use_container").css("display", "block");
                break;
            case "misc_button":
                $("#misc_container").css("display", "block");
                break;
        };

        
    });

    //Set up inventory items to be draggable and sortable
    $(".sortable").sortable({
        revert: true
    });
    $("ul, li").disableSelection();

    //Set up equip items to be draggable
    $(document).on("mouseenter", ".draggable", function () {

        var item = $(this);
        if (!item.is(".ui-draggable")) {
            item.draggable({
                revert: true
            });
        }

    });

    $("#unequip_box").droppable({
        accept: ".equip_box",
        classes: {
            
        },
        drop: function (event, ui) {
            //alert("equip item dropped");
            //draggedItemId = ui.draggable.attr("id");
            //alert(draggedItemId);
            var itemClass = ui.draggable.attr('class').split(' ')[2];
            var equipBox = ui.draggable.attr("id");
            unequipItem(equipBox, itemClass);
        }
    });

    //Set up item equip button
    $(document).on("click", ".item_equip_button", function () {
        //alert("equipbutton clicked");
        var equipSlot = $(this).parent().attr("class").split(' ')[1];
        var itemClass = $(this).parent().attr("class").split(' ')[0];
        var equipBox = equipSlot + "_box";

        //alert(equipSlot);

        //check if slot to equip to is filled already

        //filled
        if (equippedItem[equipSlot] != "None") {
            //unequip previous item
            var previousItemClass = $("#" + equipBox).attr("class").split(' ')[2];
            unequipItem(equipBox, previousItemClass);
        }

        equipItem(equipSlot, itemClass);

        $(this).parent().remove();
    });

    function equipItem(equipSlot, itemClass) {
        //$("#equip_container").prepend("<div class=\x22equip_box draggable " + itemClass +  "\x22 id=\x22" + equipSlot + "_box\x22></div>");
        addEquipBox(itemClass, equipSlot);

        equippedItem[equipSlot] = itemClass;

        switch (equipSlot) {
            case "head":
                armorInventory[itemClass] -= 1;
                break;
            case "chest":
                armorInventory[itemClass] -= 1;
                addDefense(itemClass);
                break;
            case "weapon":
                weaponInventory[itemClass] -= 1;
                addStrike(itemClass);
                break;
            case "jewel":
                armorInventory[itemClass] -= 1;
                break;
            case "feet":
                armorInventory[itemClass] -= 1;
                break;
        }

        updateDeckUI();
    }

    function addStrike(itemClass) {
        for (var i = 0; i < cardModifier.strike_count; i++) {
            moveDeck.push(itemDict[itemClass].card);
        }
    }

    function addDefense(itemClass) {
        //console.log("adding defnse");
        for (var i = 0; i < cardModifier.defend_count; i++) {
            moveDeck.push(itemDict[itemClass].card);
        }
        
    }

    function updateSkill() {
        moveDeck.push.apply(moveDeck, playerSkills);
    }

    function unequipItem(equipBox, itemClass) {
        console.log("unequipping item");
        switch (equipBox) {
            case "head_box":
                headInventory[itemClass] += 1;
                equippedItem["head"] = "None";
                addItem(itemClass);
                $("#head_box").remove();
                break;
            case "chest_box":
                chestInventory[itemClass] += 1;
                equippedItem["chest"] = "None";
                addItem(itemClass);
                $("#chest_box").remove();
                break;
            case "weapon_box":
                weaponInventory[itemClass] += 1;
                equippedItem["weapon"] = "None";
                addItem(itemClass);
                $("#weapon_box").remove();
                break;
            case "jewel_box":
                jewelInventory[itemClass] += 1;
                equippedItem["jewel"] = "None";
                addItem(itemClass);
                $("#jewel_box").remove();
                break;
            case "feet_box":
                feetInventory[itemClass] += 1;
                equippedItem["feet"] = "None";
                addItem(itemClass);
                $("#feet_box").remove();
                break;
        }

        moveDeck = moveDeck.filter(a => a !== itemDict[itemClass].card);
        combatDrawPile = moveDeck.slice();
        console.log(moveDeck);
        updateDeckUI();
        
        
    }

    function addItem(itemClass) {
        var name = itemDict[itemClass].name;
        var description = itemDict[itemClass].description;
        var itemType = itemDict[itemClass].type;

        switch (itemType) {
            case "head":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` head\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
            case "chest":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` chest\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
            case "weapon":
                $("#weapons_list").append(`
                    <li class=\x22`+ itemClass + ` weapon\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                weaponInventory[itemClass] += 1;
                break;
            case "jewel":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` jewel\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
            case "feet":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` feet\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
            case "use":
                $("#use_list").append(`
                    <li class=\x22`+ itemClass + ` use\x22 title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_use_button">U</button>
                    </li>
                `);
                useInventory[itemClass] += 1;
                break;

        }

        
    }

    function addGold(amount) {
        playerGold += amount;
        $("#gold_count").html("Gold: " + playerGold);
    }

    function removeGold(amount) {
        playerGold -= amount;
        $("#gold_count").html("Gold: " + playerGold);
    }

    function addEquipBox(itemClass, equipSlot) {
        var description = itemDict[itemClass].description;
        $("#equip_container").append("<div class=\x22equip_box draggable " + itemClass + "\x22 id=\x22" + equipSlot + "_box\x22 title = \x22"+description+"\x22>" + "<img src=\x22images/items/" + itemClass +".png\x22/></div>");
    }

    //Set up usable items button
    $(document).on("click", ".item_use_button", function () {
        alert("usebutton clicked");
        //var equipSlot = $(this).parent().attr("class").split(' ')[1];
        //var itemClass = $(this).parent().attr("class").split(' ')[0];
        //var equipBox = equipSlot + "_box";

        ////alert(equipSlot);

        ////check if slot to equip to is filled already

        ////filled
        //if (equippedItem[equipSlot] != "None") {
        //    //unequip previous item
        //    var previousItemClass = $("#" + equipBox).attr("class").split(' ')[2];
        //    unequipItem(equipBox, previousItemClass);
        //}

        //equipItem(equipSlot, itemClass);

        //$(this).parent().remove();
    });


    //Set up combat and combat screen

    //Set up toggle between deck tabs
    $(document).on("click", ".deck_button", function () {

        var activeButton = $(".active_deck_button");
        var activeList = $("#moves_list");

        switch (activeButton.attr("id")) {
            case "draw_pile_button":
                activeList = $("#draw_pile");
                break;
            case "discard_pile_button":
                activeList = $("#discard_pile");
                break;
            case "deck_list_button":
                activeList = $("#moves_list");
                break;
        };

        activeList.css("display", "none");
        activeButton.toggleClass("active_deck_button");
        $(this).toggleClass("active_deck_button");

        switch (this.id) {
            case "draw_pile_button":
                $("#draw_pile").css("display", "block");
                break;
            case "discard_pile_button":
                $("#discard_pile").css("display", "block");
                break;
            case "deck_list_button":
                $("#moves_list").css("display", "block");
                break;
        };


    });

    

    function startCombat() {
        combatDrawPile = moveDeck.slice();
        combatDiscardPile = [];
        updateDrawPile();
        emptyDiscardPile();
        newTurn();
        combat_turn = 0;
        enemy_count = $(".enemy").length;
        //console.log(enemy_count);

        //Display intenet for each enemy
        $(".enemy").each(function (i) {
            var classArr = $(this).attr('class').split(' ');

            //classArr[1] is the enemy name/type ex) slime_2
            displayIntent(this.id, classArr[1], combat_turn);
            initializeEnemyStats(this.id, classArr[1]);
        });
    }

    
    function drawCard(amount) {
        for (var i = 0; i < amount; i++) {
            //###RESHUFFLE ONCE DRAW PILE IS DEPLETED#####
            if (combatDrawPile.length <= 0) {
                if (combatDiscardPile.length <= 0) {
                    return;
                }
                combatDrawPile = combatDiscardPile;
                emptyDiscardPile();
                updateDrawPile();
                
            } 
            var cardIndex = Math.round(Math.random() * (combatDrawPile.length - 1));
            var card = combatDrawPile[cardIndex];
            $(".player_hand").append(
                "<div data-aos='fade-left' class=\x22move_card " + card + " " + movesDict[card].type + " " + movesDict[card].value + " " + movesDict[card].cost + " draggable\x22>" + "<img src=\x22images/card/" + card + ".png\x22 />" +"</div>"
            );

            //console.log($(".move_card"));

            //$(".move_card:last").fadeIn(1000);

            combatDrawPile.splice(cardIndex, 1);
            $("#draw_pile").find('.' + card + ":first").remove();
            //console.log("Draw pile: " + combatDrawPile);
            //console.log("Discard pile: " + combatDiscardPile);
            
            
        }
        
    }

    function updateDrawPile() {
        $("#draw_pile").empty();
        for (var i = 0; i < combatDrawPile.length; i++) {
            $("#draw_pile").append(
                "<li class=\x22" + combatDrawPile[i] + "\x22>" + combatDrawPile[i] + "</li>"
            );
        }
    }

    function emptyDiscardPile() {
        $("#discard_pile").empty();
    }

    //UPDATES THE DECK UI, NOT THE VARIABLE
    function updateDeckUI() {
        $("#moves_list").empty();
        for (var i = 0; i < moveDeck.length; i++) {
            $("#moves_list").append(
                "<li title= \x22" + movesDict[moveDeck[i]].description + "\x22>" + movesDict[moveDeck[i]].name + "</li>"
            );
        }
    }

    $(document).on("mouseenter", ".move_card", function () {

        var item = $(".enemy");
        if (!item.is(".ui-droppable")) {
                item.droppable({
                    classes: {
                        "ui-droppable-hover": "ui-state-hover"
                    },
                    drop: function (event, ui) {
                        var classArr = ui.draggable.attr('class').split(' ');
                        if (curr_action_points < parseInt(classArr[4])) {
                            //Play an error sound, maybe make action point shine?
                        } else {
                            playCard(classArr, this.id);
                            ui.draggable.remove();
                        }
                        
                    }
            });
        }
    });


    function playCard(classArr, enemyId) {
        console.log(enemyId);

        var card_cost = parseInt(classArr[4])
        curr_action_points -= card_cost;
        updateActionPointUI();
        //Card effect. classArr[2] is type, classArr[3] is value
        switch (classArr[2]) {
            case "attack":
                console.log("attacking!");

                var damage = classArr[3];
                var armor = enemies_stat[enemyId].armor;

                //Calculate damage
                var result = calculateDamage(damage, armor)
                damage = result[0];
                armor = result[1];
                //if (enemies_stat[enemyId].armor > 0) {
                //    damage -= enemies_stat[enemyId].armor;
                //    if (damage < 0) {
                //        damage = 0;
                //    }
                //    enemies_stat[enemyId].armor -= classArr[3];
                //    if (enemies_stat[enemyId].armor < 0) {
                //        enemies_stat[enemyId].armor = 0;
                //    }
                //    
                //}
                enemies_stat[enemyId].armor = armor;
                $("#" + enemyId).find(".enemy_armor").html(enemies_stat[enemyId].armor);

                //Adjust enemy health based on damage
                enemies_stat[enemyId].health = enemies_stat[enemyId].health - damage;
                if (enemies_stat[enemyId].health < 0) {
                    enemies_stat[enemyId].health = 0;
                }
                $("#" + enemyId).find(".enemy_health").html(enemies_stat[enemyId].health);


                console.log(enemies_stat)
                    
                checkEnemyDeath(enemyId);

                break;
            case "defend":
                console.log("defending!");
                hpStat.currArmor += parseInt(classArr[3]);
                console.log(hpStat.currArmor);
                $("#char_arm").html(hpStat.currArmor);
                console.log(hpStat);
                break;
            case "aoe":
                $(".enemy").each(function () {
                    var damage = classArr[3];
                    var armor = enemies_stat[this.id].armor;
                    var result = calculateDamage(damage, armor);

                    damage = result[0];
                    armor = result[1];
                    console.log(armor);

                    enemies_stat[this.id].armor = armor;
                    $("#" + this.id).find(".enemy_armor").html(enemies_stat[this.id].armor);

                    //Adjust enemy health based on damage
                    enemies_stat[this.id].health = enemies_stat[this.id].health - damage;
                    if (enemies_stat[this.id].health < 0) {
                        enemies_stat[this.id].health = 0;
                    }
                    $("#" + this.id).find(".enemy_health").html(enemies_stat[this.id].health);

                    checkEnemyDeath(this.id);
                });

                break;
        }

        //Put card in discard pile
        combatDiscardPile.push(classArr[1]);
        $("#discard_pile").append(
            "<li class=\x22" + classArr[1] + "\x22>" + classArr[1] + "</li>"
        );
        
        
    };

    function calculateDamage(damage, armor) {

        var return_damage = damage;
        var return_armor = armor;

        if (armor > 0) {
            return_damage -= armor;
            if (return_damage < 0) {
                return_damage = 0;
            }
            return_armor -= damage;
            if (return_armor < 0) {
                return_armor = 0;
            }
        }
        return [return_damage, return_armor];
    }

    function checkEnemyDeath(enemyId) {
        //Check if enemy is killed
        if (enemies_stat[enemyId].health <= 0) {
            //$("#" + enemyId).animate({ opacity: 0 }, 1000);
            $("#" + enemyId).remove();
            enemies_stat[enemyId].alive = false;
            enemy_count -= 1;

            //If all enemy is dead... End combat
            if (enemies_stat["enemy_1"].alive == false && enemies_stat["enemy_2"].alive == false && enemies_stat["enemy_3"].alive == false) {
                console.log(currentCombat);
                endCombat("win");
            }
        }
    }

    //End Turn
    $(document).on("click", "#end_turn_button", function () {
        $(".move_card").each(function (i) {
            var classArr = $(this).attr('class').split(' ');
            combatDiscardPile.push(classArr[1]);
            $("#discard_pile").append(
                "<li class=\x22" + classArr[1] + "\x22>" + classArr[1] + "</li>"
            );
            $(this).remove();
        });

        //$(".move_card").remove();

        enemyArray = $(".enemy");
        enemy_index = 0;

        conductEnemyTurn();
        

        

        
    });

    function newTurn() {
        curr_action_points = max_action_points;
        hpStat.currArmor = hpStat.defaultArmor;
        updateActionPointUI();

        drawCard(5);

        //Display intenet for each enemy
        $(".enemy").each(function (i) {
            var classArr = $(this).attr('class').split(' ');
            var turn_index = combat_turn % (enemiesDict[classArr[1]].turns.length);
            displayIntent(this.id, classArr[1], turn_index);
        });

        
    }


    function updateActionPointUI() {
        $("#action_points").html(curr_action_points + "/" + max_action_points);
    }

    function displayIntent(enemy_id, enemy_name, combat_turn) {

        var enemy_turn = enemiesDict[enemy_name].turns

        var enemy_action = enemy_turn[combat_turn][0];
        var enemy_action_value = enemy_turn[combat_turn][1];
        $("#" + enemy_id).find(".intent").html(enemy_action + " " + enemy_action_value);

    }

    function initializeEnemyStats(enemy_id, enemy_name) {
        enemies_stat[enemy_id].health = enemiesDict[enemy_name].health;
        enemies_stat[enemy_id].max_health = enemiesDict[enemy_name].health;
        enemies_stat[enemy_id].armor = enemiesDict[enemy_name].armor;
        enemies_stat[enemy_id].alive = true;
        $("#" + enemy_id).find(".enemy_health").html(enemies_stat[enemy_id].max_health);
        $("#" + enemy_id).find(".enemy_armor").html(enemies_stat[enemy_id].armor);
    }

    //function conductEnemyTurn() {
    //    //alert("Starting enemy turn!");
    //    $(".enemy").each(function (i) {
    //        var classArr = $(this).attr('class').split(' ');
    //        console.log(this.id);
    //        if (enemies_stat[this.id].alive) {
    //            $(this).animate({
    //                opacity: '0.3'
    //            }, 2000 , function () {
    //                    conductEnemyAction(this.id, classArr[1], combat_turn);
    //            });
                
    //        }
    //        //Conduct enemy action
    //    });
    //}

                    //  set your counter to 1

    function conductEnemyTurn() {         //  create a loop function
        setTimeout(function () {   //  call a 2s setTimeout when the loop is called
            //console.log("This is the enemy that is attacking: " + enemyArray[enemy_index].id);
            console.log("Enemy count:" + enemy_count);
            if (enemies_stat[enemyArray[enemy_index].id].alive) {
                //console.log(enemyArray[enemy_index].class);
                var classArr = $("#" + enemyArray[enemy_index].id).attr("class").split(' ');
                conductEnemyAction(enemyArray[enemy_index].id, classArr[1], combat_turn);
                //$("#" + enemyArray[enemy_index].id).find("img").attr("src", "images/enemy/slime_1_attacking.gif");
                $("#" + enemyArray[enemy_index].id).find("img").effect("bounce", { distance: 30, times: 3 }, "slow");
            }
            enemy_index++;                    //  increment the counter
            //Revert the changed image of the enemy attacking
            if (enemy_index < enemy_count) {           //  if the counter < 10, call the loop function
                conductEnemyTurn();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
            if (enemy_index >= enemy_count) {
                console.log("Ya should only see this once!");
                combat_turn += 1;
                newTurn();
            }
        }, 1200)
    }
        
    function conductEnemyAction(enemy_id, enemy_name, combat_turn) {
        //console.log("Enemy name: " + enemy_name);
        //console.log("Combat turn: " + combat_turn);
        //console.log("Turn actions: " + enemies[enemy_name].turns[combat_turn][0]);
        //console.log("Turn action value: " + enemies[enemy_name].turns[combat_turn][1]);

        //Reset enemy armor
        enemies_stat[enemy_id].armor = 0;
        $("#" + enemy_id).find(".enemy_armor").html(enemies_stat[enemy_id].armor);

        

        var enemy_turn = enemiesDict[enemy_name].turns
        turn_index = combat_turn % (enemy_turn.length);
        switch (enemy_turn[turn_index][0]) {
            case "attack":
                console.log("monster is Attacking!");
                var damage = enemy_turn[turn_index][1]

                //adjusting damage if player has armor
                if (hpStat.currArmor != 0) {
                    damage -= hpStat.currArmor
                    if (damage < 0) {
                        damage = 0;
                    }
                    hpStat.currArmor -= enemy_turn[turn_index][1]
                    if (hpStat.currArmor < 0) {
                        hpStat.currArmor = 0;
                    }
                    $("#char_arm").html(hpStat.currArmor);

                }

                console.log("damage to take: " + damage);

                //Take the actual damage
                var targetValue = hpStat.currHp - parseFloat(damage);
                animateHpBar($("#hp_bar"), targetValue);

                //Player lose combat
                if (hpStat.currHp <= 0) {
                    endCombat("lose");
                }

                break;
            case "defend":
                console.log("monster is Defending!");

                enemies_stat[enemy_id].armor += enemy_turn[turn_index][1];
                $("#" + enemy_id).find(".enemy_armor").html(enemies_stat[enemy_id].armor);
                break;
        }
        //enemies[enemy_name];
    }

    function endCombat(outcome) {
        

        if (outcome == "win") {
            //Actually give out the rewards
            console.log("You won!");

            for (var i = 0; i < combatDict[currentCombat].reward.length; i++) {
                console.log("Distributing reward loop");
                console.log("reward length: " + combatDict[currentCombat].reward.length);
                console.log("Actual rewards: " + combatDict[currentCombat].reward);
                console.log("Current combat: " + currentCombat);
                switch (combatDict[currentCombat].reward[i][0]) {
                    case "gold":
                        addGold(combatDict[currentCombat].reward[i][1]);
                        $("#reward_list").append("<li>" + combatDict[currentCombat].reward[i][1] +" gold</li>")
                        break;
                    case "xp":
                        var targetValue = expStat.currExp + combatDict[currentCombat].reward[i][1];
                        console.log("targetValue: " + targetValue);
                        $("#reward_list").append("<li>" + combatDict[currentCombat].reward[i][1] + " exp</li>")
                        animateExpBar($("#exp_bar"), targetValue)
                        break;
                    case "item":
                        break;
                }
            }
        } else if (outcome == "lose") {
            $("#outcome").html("Defeat...");
            console.log("You lost!");
            $("#outcome_proceed_button").removeClass();
            $("#outcome_proceed_button").addClass("choice");
            $("#outcome_proceed_button").addClass("change_slide");
            $("#outcome_proceed_button").addClass("map");
        }

        //Display outcome screen w/rewards
        $(".outcome_screen").fadeIn(1000);

        combatDrawPiel = [];
        updateDrawPile();
        combatDiscardPile = [];
        emptyDiscardPile();

    }

    //Set up game shops
    $(document).on("click", ".shop_purchase_button", function () {
        //console.log($(this).attr("class"));
        var classArr = $(this).attr('class').split(' ');

        //Check if player has enough gold
        if (playerGold >= itemDict[classArr[1]].cost) {
            addItem(classArr[1]);
            removeGold(itemDict[classArr[1]].cost)
        } else {
            //Play an error sound? for not enough gold
        }

        

        //alert("purchase button clicked");
    });

    //Set up game map (hoverable markers, etc)
    $(document).on({
        mouseenter: function () {
            $(this).find("img").attr("src", "images/map/markers/" + this.id + "_active_marker.png");
        },
        mouseleave: function () {
            $(this).find("img").attr("src", "images/map/markers/" + this.id + "_marker.png");
        }
    }, ".map_marker");

    //Set up game state changing(choice) buttons up
    $(document).on("click", ".choice", function () {
        var classArr = $(this).attr('class').split(' ');
        changeGameState(classArr);
    });


    //Set up initializing button
    $(document).on("click", ".initialize_button", function () {
        initializeStats(this.id);
        changeGameSlide('intro_slide_1');
    });

    //Character select screen hover image change
    //$(document).on({
    //    mouseenter: function () {
    //        $(this).find("img").attr("src", "images/char_portrait/Ita_laughing.gif");
    //    },
    //    mouseleave: function () {
    //        $(this).find("img").attr("src", "images/char_portrait/Ita_idle.png");
    //    }
    //}, ".csp_ita");

    function changeGameState(arr) {
        if (arr.length % 2 == 0) {
            alert("Error with array to change character stats, not odd number of items!");
        }

        for (var i = 1; i < arr.length; i += 2) {
            switch (arr[i]) {
                case "subtract_health":
                    var targetValue = hpStat.currHp - parseFloat(arr[i + 1]);
                    animateHpBar($("#hp_bar"), targetValue);
                    //var id = setInterval(function () {  }, 50);
                    break;
                case "add_exp":
                    var targetValue = expStat.currExp + parseFloat(arr[i + 1]);
                    //console.log(expStat.currExp);
                    //console.log(arr[i + 1]);
                    animateExpBar($("#exp_bar"), targetValue);
                    break;
                case "change_slide":
                    changeGameSlide(arr[i + 1]);
                    break;
                case "dialogue":
                    startDialogue(arr[i + 1]);
                    break;
                case "combat_encounter":
                    combatEncounter(arr[i + 1]);
                    break;
                case "dungeon_slide":
                    dungeonSlide(arr[i + 1]);
                    break;
                case "leave_dungeon":
                    changeGameSlide(arr[i + 1]);
                    dungeonFloor = 0;
                    break;
                case "open_shop":
                    openShop(arr[i + 1]);
                    break;
            }
        }
        
    }

    function changeGameSlide(contentStr) {
        //Going back a slide (leaving)
        console.log('Changing game slide');


        $(".transition_effect").fadeIn(function () {
            if (contentStr == 0) {
                $('#content').detach();
                if (previous_slide == null) {
                    alert("ERROR THERE IS NO PREVIOUS SLIDE");
                } else {
                    $('#main_display_container').append(previous_slide);
                }

            } else {
                previous_slide = $('#content').detach();
                switch (contentStr) {
                    case "char_select_sli":
                        $('#main_display_container').append(`
                    <div id="content" class="char_select_screen">
                        <div class="character_select_portrait csp_hall">
                            <img id="char_choice_1" class="choice change_slide char_select_info_1_sli" 
                            src="images/char_portrait/Hall_idle.png" alt="hall_idle" />
                            <p>Hall Lightroot</p>
                        </div>
                        <div class="character_select_portrait csp_vera">
                            <img id="char_choice_2" class="choice change_slide char_select_info_2_sli"
                            src="images/char_portrait/Vera_idle.png" alt="vera_idle" />
                            <p>Vera Daran</p>
                        </div>
                    </div>
                `);
                        break;
                    case "char_select_info_1_sli":
                        $('#main_display_container').append(`
                    <div id="content" class="character_select_info_screen">
                        <div class="select_info_name_container">
                            <p>Hall Lightroot</p>
                        </div>

                        <div class="select_info_image_container">
                            <img src="images/char_portrait/Hall_idle.png" alt="hall" />
                        </div>

                        <div class="select_info_backstory_container">
                            <p>Race: Human</p>
                            <p>Class: Fighter</p>
                            <p class='select_backstory'>
                                One of the numerous offspring of the previous hero, Hall was raised in the house of Lightborn as
                                a potential hero for the next generation, going through rigorous training. While he was chosen as the next hero, Hall claims he had
                                a 'minor' dispute with the managerial members of the house, and escaped the house. Now he enjoys his carefree 
                                life as a adventurer, but he can't seem to quite get rid of his habit of helping people in need as a former
                                hero canadiate.
                            </p>
                        
                        </div>

                        <div class="select_info_stats_container">
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Strength determines, well, how strong you are">STR</p>
                                <p>7</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Jab Jab Throw the jab!">DEX</p>
                                <p>7</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Books are good, reading is gooder">INT</p>
                                <p>4</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="His words are like butter. God he needs to stop eating butter.">CHR</p>
                                <p>5</p>
                            </div>
                        </div>

                        <div class="select_info_traits_container">
                            <p class="center_align">
                                <span class="tooltip_attached" title="Deal more damage">Freak of nature</span>, 
                                <span class="tooltip_attached" title="Start with 1 less AP each combat">Slow starter</span>, 
                            </p>
                        </div>

                        <div class="select_info_deck_container">
                            <h3>Deck/Combat style:</h3>
                            <p>Hall fights through relentless attacks. His actions become stronger if they are performed in combos.</p>
                        </div>

                        <div class="select_info_button_container">
                            <button id='Hall' class='initialize_button'>Start!</button>
                            <button class='choice change_slide 0'>Go back</button>
                        </div>

                        </div>
                `);
                        break;
                    case "char_select_info_2_sli":
                        $('#main_display_container').append(`
                    <div id="content" class="character_select_info_screen">
                        <div class="select_info_name_container">
                            <p>Vera Daran</p>
                        </div>

                        <div class="select_info_image_container">
                            <img src="images/char_portrait/Vera_idle.png" alt="vera" />
                        </div>

                        <div class="select_info_backstory_container">
                            <p>Race: Elf</p>
                            <p>Class: Fear Mage</p>
                            <p class='select_backstory'>
                                Studying a rather peculiar field of magic, Vera is an avid conoisseur of everything to do with fear.
                                While she claims she is studying fear magic to help people get over their fears, she seems to find
                                an awful amount of joy making a bandit or a monster run away crying. Due to the amount of scary stories
                                she reads to research fear doesn't help her fall asleep, resulting in the bags under her eyes.
                            </p>
                        
                        </div>

                        <div class="select_info_stats_container">
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Strength determines how strong you are physically, and how healty you are.">STR</p>
                                <p>4</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Dexterity determines how swift and delicate you are with your actions!">DEX</p>
                                <p>5</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Intelligence determines your natural learning rate and knowledge you havea about the world">INT</p>
                                <p>9</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Charisma determines your ability to influence other people, positvely or negatively.">CHR</p>
                                <p>4</p>
                            </div>
                        </div>

                        <div class="select_info_traits_container">
                            <p class="center_align">
                                <span class="tooltip_attached" title="Good at magic">Magical Aptitude</span>, 
                                <span class="tooltip_attached" title="Sleep worse">Insomniac</span>, 
                            </p>
                        </div>

                        <div class="select_info_deck_container">
                            <h3>Deck/Combat Style:</h3>
                            <p>Vera fights utilizing the enemy's and her own fear. She will generally get stronger as the fight goes on.</p>
                        </div>

                        <div class="select_info_button_container">
                            <button id='Vera' class='initialize_button'>Start!</button>
                            <button class='choice change_slide 0'>Go back</button>
                        </div>

                        </div>
                `);
                        break;
                    case "map":
                        $('#main_display_container').append(`
                            <div id="content" class="map_screen">
                                <div class="map_container">
                                    <img class='fill_screen' src='images/map/map.png' alt='map' />
                                    <div id='dungeon' class='map_marker'>
                                        <img class='choice dungeon_slide caves' src='images/map/markers/dungeon_marker.png' />
                                    </div>
                                    <div id='cambria' class='map_marker'>
                                        <img class='choice change_slide cambria' src='images/map/markers/cambria_marker.png' />
                                    </div>
                                
                                </div>
                            
                            </div>
                        
                        `);
                        break;
                    case "intro_slide_1":
                        eventEncounter("intro_slide_1");
                        break;
                    case "intro_slide_2":
                        eventEncounter("intro_slide_2");
                        break;
                    case "campfire":
                        eventEncounter("campfire");
                        break;
                    case "caves_1": //Rat chef
                        eventEncounter("caves_1");
                        break;
                    case "cambria_potion_seller":
                        eventEncounter("cambria_potion_seller");
                        break;
                    case "test_slide":
                        $('#main_display_container').append(`
                    <div id="content" class="event_screen">
                        <div class="event_title flex_container">
                            <p>Ita's meal</p>
                        </div>

                        <div class="flex_container">
                            <div class="event_image_container">
                                <img src="images/event/test_event.gif" alt="event_img" />
                            </div>

                            <div class="event_choice_container">
                                Ita is eating her pumpkin soup. It smells really good. Man I'm hungry. You wonder if you should
                                ask her for a bite.
                                <button class="choice subtract_health 4 change_slide map">This is choice 1, quite gnarly yeah?</button>
                                <button class="choice subtract_health 4">This is choice 2, quite brutish yeah?</button>
                                <button class="choice change_slide 0">Leave</button>
                            </div>
                        </div>   
                    </div>
                `);
                        break;
                    case "cambria":
                        townSlide("cambria");
                        //startDialogue("intro_cambria_vera");
                        break;
                }
            }
            $(".transition_effect").fadeOut();
        });

        
    }

    function townSlide(town) {
        $('#main_display_container').append("<div id='content' class='town_screen'></div>");
        $('#content').append("<div class='town_choice_container'></div>");

        for (var i = 0; i < townDict[town].choices.length; i++) {
            $('.town_choice_container').append("<button id=\x22town_choice_" + i + "\x22 class='choice'>" + townDict[town].choices[i] + "</button>");
            for (var j = 0; j < townDict[town].choicesEffects[i].length; j++) {
                $('#town_choice_' + i).addClass(townDict[town].choicesEffects[i][j]);
            }
        }
    }

    function eventEncounter(eventCode) {
        console.log("event encounter is running");
        $('#main_display_container').append("<div id='content' class='event_screen'></div>");
        $('#content').append("<div class='event_title flex_container'> <p>" + eventDict[eventCode].title + "</p> </div>");
        $('#content').append("<div id='event_content_container' class=flex_container></div>");
        $('#event_content_container').append("<div class='event_image_container'><img src=\x22images/event/" + eventDict[eventCode].image + ".png\x22 /></div>");
        $('#event_content_container').append("<div id='choices' class='event_choice_container'></div>");
        $("#choices").append("<p>" + eventDict[eventCode].description + "</p>");

        //Append each choice
        for (var i = 0; i < eventDict[eventCode].choices.length; i++) {
            $('#choices').append("<button id = \x22c" + i + "\x22 class='choice'>" + eventDict[eventCode].choices[i] + "</button>");

            for (var j = 0; j < eventDict[eventCode].choicesEffects[i].length; j++) {
                $('#c' + i).addClass(eventDict[eventCode].choicesEffects[i][j]);
            }

        }
    }

    function openShop(shopCode) {
        $(".transition_effect").fadeIn(function () {
            previous_slide = $('#content').detach();

            $('#main_display_container').append("<div id='content' class='shop_screen'></div>");
            $('#content').append("<div class='shop_name'> <p>" + shopDict[shopCode].name + "</p> </div>");
            //$('#content').append("<img class='shop_owner_image src='images/shop/Chec.png>");
            $('#content').append("<div id ='shop_item_container'></div>");

            //Append each choice
            for (var i = 0; i < shopDict[shopCode].items.length; i++) {
                console.log("calling occuptants of planteary craft")
                //$('#shop_item_container').append("Hello");
                $('#shop_item_container').append("<div id=\x22shop_item_" + i + "\x22 class='shop_item' title=\x22" + itemDict[shopDict[shopCode].items[i]].description + "\x22></div>");
                $('#shop_item_' + i).append("<img src=\x22images/items/" + shopDict[shopCode].items[i] + ".png\x22 alt='shop_item'/>");
                $('#shop_item_' + i).append("<p class='item_price'>" + itemDict[shopDict[shopCode].items[i]].cost + "</p>");
                $('#shop_item_' + i).append("<button class=\x22shop_purchase_button " + shopDict[shopCode].items[i] + "\x22>Buy</button>");
            }

            $('#content').append("<button id='shop_leave_button' class='choice change_slide'>Leave</button>");
            $('#shop_leave_button').addClass(shopDict[shopCode].leave);

            $(".transition_effect").fadeOut();
        });

    }

    function dungeonSlide(dungeonCode) {
        $(".transition_effect").fadeIn(function () {
            dungeonFloor += 1;
            console.log("dungeon Floor: " + dungeonFloor);

            previous_slide = $('#content').detach();

            $('#main_display_container').append("<div id='content' class='dungeon_screen'></div>");
            $('#content').append("<div> <p class='dungeon_title'>" + dungeonDict[dungeonCode].area +": " + dungeonFloor + "</p> </div>");
            $('#content').append("<div id='dungeon_content_container' class='flex_container'></div>");
            $('#dungeon_content_container').append("<div id='dungeon_image_container'><img src=\x22images/dungeon/" + dungeonDict[dungeonCode].area + ".png\x22 alt='dungeon_image'/></div>");
            $('#dungeon_content_container').append("<div id='dungeon_choice_container'></div>");

            //Premonition... Random number generator
            

            //Depends on the premonition
            $("#dungeon_choice_container").append("<button id='proceed_button' class='choice'> Proceed </button>");

            if (dungeonFloor == 4) {
                //Campfire
                console.log("Campfire should be encountered");
                $("#dungeon_choice_container").prepend("<p>" + "You have a feeling you are going to rest soon" + "</p>");
                $("#proceed_button").addClass('change_slide');
                $("#proceed_button").addClass('campfire');

            } else if (dungeonFloor == 7) {
                //Boss Fight!!
                console.log("This should be a bossfight");
                $("#dungeon_choice_container").prepend("<p>" + "You have a feeling you are going to have a boss fight" + "</p>");
                $("#proceed_button").addClass('combat_encounter');
                $("#proceed_button").addClass('test_boss');
            } else {
                var rand = getRandomInt(0, 10);
                if (rand < 7) {
                    //Combat!!!!
                    console.log("This should have triggered combat");
                    $("#dungeon_choice_container").prepend("<p>" + "You have a feeling you are going to fight" + "</p>");
                    $("#proceed_button").addClass('combat_encounter');
                    $("#proceed_button").addClass('caves_1');
                } else {
                    //Event
                    console.log("This should have triggered an event");
                    $("#dungeon_choice_container").prepend("<p>" + "You have a feeling you are going to encounter an event" + "</p>");
                    $("#proceed_button").addClass('change_slide');
                    $("#proceed_button").addClass('caves_1');
                }
            }

            

            //Always lead to map
            $("#dungeon_choice_container").append("<button class='choice leave_dungeon map'> Channel Chec </button>");
            $("#dungeon_choice_container").append("<button class='choice leave_dungeon map'> Leave </button>");
            $('#content').append("<div><p id='dungeon_description'>" + dungeonDict[dungeonCode].description + "</p></div>");
            //$('#content').append("<img id='chec_shop' src='images/icon/chec.png' alt='chec'/>")

            $(".transition_effect").fadeOut();
        });
        

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function combatEncounter(combatCode) {
        $(".transition_effect").fadeIn(function () {
            currentCombat = combatCode;
            previous_slide = $('#content').detach();
            $('#main_display_container').append("<div id='content' class='combat_screen'></div>");
            //$('#content').append("<div id='area_name'> <p>" + combatDict[combatCode].area + "</p> </div>");
            $('#content').append("<div id='enemy_container'></div>");

            //Append each enemy
            for (var i = 1; i < combatDict[combatCode].enemies.length + 1; i++) {
                $('#enemy_container').append("<div id=\x22enemy_" + i + "\x22 class=\x22enemy " + combatDict[combatCode].enemies[i-1] + "\x22></div>");

                //intent
                $('#enemy_'+i).append("<div id=\x22intent_" + i + "\x22 class=\x22intent\x22></div>");

                //Enemy image
                $('#enemy_' + i).append("<img src=\x22images/enemy/" + combatDict[combatCode].enemies[i - 1] + ".png\x22 alt='enemy1'/>");

                //Health
                $('#enemy_' + i).append("<div id=\x22enemy_health_" + i + "\x22 class=\x22enemy_health\x22></div>");

                //Armor
                $('#enemy_' + i).append("<div id=\x22enemy_armor_" + i + "\x22 class=\x22enemy_armor\x22></div>");

            }

            $('#content').append(`
                <div class="player_hand">
                    <div id="action_points"></div>
                    <button id="end_turn_button">End turn</button>
                </div>
            `);

            
            $('#content').append(`
                <div class="outcome_screen">
                    <p id="outcome">Victory!</p>
                    <ul id="reward_list">
                        
                    </ul>
                    <button id="outcome_proceed_button" class="choice">Proceed</button>
                </div>
            `);

            $("#outcome_proceed_button").addClass(combatDict[combatCode].next[0]);
            $("#outcome_proceed_button").addClass(combatDict[combatCode].next[1]);

            $(".transition_effect").fadeOut();
            startCombat();
        });
    }

    function animateHpBar(targetBar, targetValue) {
        
        hpStat.currHp = targetValue
        if (hpStat.currHp < 0) {
            hpStat.currHp = 0;
        }
        targetBar.animate({width: hpStat.currHp/hpStat.maxHp * 100 + "%"}, 1000, function () {

        });
        $("#hp").html(hpStat.currHp + "/" + hpStat.maxHp);
        
    }

    function animateExpBar(targetBar, targetValue) {
        console.log("Animate exp bar running!");
        expStat.currExp = targetValue;
        if (targetValue >= expStat.maxExp) {
            console.log("Level up button should appear");
            $("#level_up_button").fadeIn();
        } else {
            console.log("Level up button should disappear");
            $("#level_up_button").css("display", "none");
        }
        var bar_width = expStat.currExp / expStat.maxExp * 100;
        console.log("bar_width: " + bar_width);
        if (bar_width > 100) {
            bar_width = 100;
        }
        targetBar.animate({ width: bar_width + "%" }, 1000, function () {

        });
        $("#exp").html(expStat.currExp + "/" + expStat.maxExp);
            

    }

    $("#level_up_button").click(function () {
        levelUp();
        $("#level_up_button").css("display", "none");
    });

    function levelUp() {
        level += 1;
        $("#lv").find("p").html("Lv. " + level);

        //console.log("currExp: " + expStat.currExp);
        //console.log("maxExp: " + expStat.maxExp);
        //console.log("Running fucntions");

        //Add total health
        hpStat.maxHp += 10;
        animateHpBar($("#hp_bar"), hpStat.currHp);

        //Adjust expbar and max exp
        expStat.currExp = expStat.currExp - expStat.maxExp;
        expStat.maxExp += 10;
        var expBar = $("#exp_bar");
        animateExpBar(expBar, expStat.currExp);


        //console.log("currExp: " + expStat.currExp);
        //console.log("maxExp: " + expStat.maxExp);
        //console.log("level: " + level);
        //console.log("Leveld up!");
    }

    $("#backstory_button").click(function () {
        $("#backstory_button").toggleClass("collapsible_button_active");
        if ($("#backstory").css("max-height") == "0px") {
            $("#backstory").css("max-height", $("#backstory").prop('scrollHeight') + "px");
        } else {
            $("#backstory").css("max-height", "0px");
        }
    });

    //Initalize Game
    function initializeStats(className) {
        var classTemplate;


        switch (className) {
            case "Hall":
                lassTemplate = hallStartTemplate;
                break;
            case "Vera":
                classTemplate = veraStartTemplate;
        }

        $("#char_portrait_img").attr("src", classTemplate.portrait);
        $("#char_name").html(classTemplate.name);
        $("#lv").find("p").html("Lv. 1");
        level = 1;

        $("#hp").html(classTemplate.hp+ "/" + classTemplate.hp);       
        hpStat.currHp = classTemplate.hp;
        hpStat.maxHp = classTemplate.hp;

        $("#exp").html("0/" + classTemplate.exp); 
        expStat.currExp = 0;
        expStat.maxExp = classTemplate.exp;

        $("#char_str").html(classTemplate.str); 
        $("#char_dex").html(classTemplate.dex); 
        $("#char_int").html(classTemplate.int); 
        $("#char_chr").html(classTemplate.chr);

        $("#backstory_text").html(classTemplate.backstory); 

        for (var i = 0; i < classTemplate.traits.length; i++) {
            $("#backstory").append("<p><span class='tooltip_attached'" + "title=\x22" + traitsDict[classTemplate.traits[i]].description +"\x22>" + classTemplate.traits[i] + "</span></p>")
        }

        for (var i = 0; i < classTemplate.items.length; i++) {
            addItem(classTemplate.items[i], itemDict[classTemplate.items[i]].type);
        }

        playerSkills = classTemplate.skills;
        //console.log(moveDeck);
        updateSkill();
        updateDeckUI();

    };

    //Transition
    function transition() {
        $(".transition_effect").fadeIn();
        $(".transition_effect").animate({
            width: "72vh"
        }, 700, function () {
            $(".transition_effect").animate({
                width: "0"
            }, 500)
        });
    }

    //Test/Debugging Functions
    //HP and EXP bar section
    $("#hp_test_button").click(function () {
        var hpBar = $("#hp_bar");

        animateHpBar(hpBar, 12);

        //var id = setInterval(function () { animateHpBar(id, hpBar, 12); }, 50);
    });

    $("#exp_test_button").click(function () {
        var expBar = $("#exp_bar");

        expStat.currExp = expStat.currExp += 20;
        animateExpBar(expBar, expStat.currExp);
    });

    $("#replace_content_button").click(function () {
        previous_slide = $('#content').detach();
        $('#main_display_container').append("<div id='content'><p>Yowza that's pretty gnarly ain't it?</p></div>");
        $("#content").append(`
            <div id="content" class="event_screen">
                <div class="event_title flex_container">
                    <p>Ita's meal</p>
                </div>

                <div class="flex_container">
                    <div class="event_image_container">
                        <img src="images/event/test_event.gif" alt="event_img" />
                    </div>
                
                    <div class="event_choice_container">
                        Ita is eating her pumpkin soup. It smells really good. Man I'm hungry. You wonder if you should
                        ask her for a bite.
                        <button class="choice subtract_health 4">This is choice 1, quite gnarly yeah?</button>
                        <button class="choice subtract_health 4">This is choice 2, quite brutish yeah?</button>
                        <button class="choice change_slide 0">Leave</button>
                    </div>
                </div>   
            </div>
        `);
    })

    $("#add_sword_button").click(function () {

        $("#weapons_list").append(`
            <li class="sword weapon">
                Sword
                <button class="item_equip_button">E</button>
            </li>

        `);
        weaponInventory.sword = weaponInventory.sword + 1;
    });

    $("#add_dagger_button").click(function () {

        addItem("dagger");
        
    });

    $("#console_item_button").click(function () {
        console.log(weaponInventory);
        console.log(armorInventory);
        console.log(useInventory);
        console.log(miscInventory);
    });

    $("#console_equip_button").click(function () {
        console.log(equippedItem);
    });

    $("#console_previous").click(function () {
        console.log(previous_slide);
    });

    $("#console_stats").click(function () {
        console.log(hpStat);
    });

    $("#update_deck_button").click(function () {
        updateDeckUI();
    });

    $("#test_dialogue_button").click(function () {
        startDialogue("test_dialogue");
    });

    $("#draw_button").click(function () {
        drawCard(1);
    });

    $("#draw_3_button").click(function () {
        drawCard(3);
    });

    $("#start_combat_button").click(function () {
        combatEncounter("caves_1");
    });

    $("#add_gold_button").click(function () {
        addGold(100);
    })

    $("#console_deck").click(function () {
        console.log("move deck: " + moveDeck);
        console.log("draw pile: " + combatDrawPile);
        console.log("discard pile: " + combatDiscardPile);
    })

    $("#test_sell_box").droppable({
        drop: function (event, ui) {

            draggedItemClass = ui.draggable.attr("class").split(' ')[0];
            weaponInventory[draggedItemClass] = weaponInventory[draggedItemClass] - 1;

            alert(draggedItemClass);

            ui.draggable.remove();
            
        }
    });

    $("#transition_button").click(function () {
        transition();
    });
});
