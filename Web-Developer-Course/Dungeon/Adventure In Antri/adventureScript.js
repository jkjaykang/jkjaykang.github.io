
var itaStartTemplate = {
    name: "Ita Chul",
    portrait: "images/char_portrait/Ita/Ita_laughing.gif",
    hp: 15,
    exp: 10,
    str: 6,
    dex: 4,
    int: 4,
    chr: 4,
    backstory: "Random backstory, yada yada yada yada, yup, yup, thats the good stuff",
    traits: ["strong_willed", "talented", "clumsy"]
}

var veraStartTemplate = {
    name: "Vera Daran",
    portrait: "images/char_portrait/Vera/Vera_idle.png",
    hp: 15,
    exp: 10,
    str: 4,
    dex: 5,
    int: 7,
    chr: 4,
    backstory: `Studying a rather peculiar field of magic, Vera is an avid conoisseur of everything to do with fear.
                While she claims she is studying fear magic to help people get over their fears, she seems to find
                an awful amount of joy making a bandit or a monster run away crying.Due to the amount of scary stories
                she reads to research fear doesn't help her fall asleep, resulting in the bags under her eyes.`,
    traits: ["magical_aptitude", "insomniac"],
    items: ["wooden_staff"],
    skills: ["ball_o_fear"]
}

var previous_slide;


//These are the variables for the current stat of the character
var hpStat = {
    currHp: 20,
    maxHp: 20,
    currArmor: 0,
    defaultArmor: 0
};

var expStat = {
    currExp: 0,
    maxExp: 30
};

var weaponInventory = {
    sword: 0,
    dagger: 0,
    wooden_staff: 0,
}

var armorInventory = {
    chainmail: 0
}

var useInventory = {
    potion: 0
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

//Variables for combat 
var currentCombat = "intro";
var combatDrawPile = moveDeck;
var combatDiscardPile = [];

var curr_action_points = 4;
var max_action_points = 4;

var combat_turn = 0;

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
    }
}

var moves = {
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
    protect: {
        name: "protect",
        type: "defend",
        value: 5,
        cost: 1,
        description: "Vera casts a protective spell, blocking damage for the turn"
    },
    ball_o_fear: {
        name: "Ball-o-fear",
        type: "aoe",
        value: 5,
        cost: 2,
        description: "Vera lobs a solidified ball of fear, dealing damage to all enemies"
    }
}

var enemies = {
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

    }
}

var combat = {
    intro: {
        area: "Caves I",
        enemies: ["slime_2"],
        reward: ["gold"]
    }
}


//Game Dialogue Dictionary
var dialogueDict = {
    //test_dialogue: [["narrator", "narrator", "narrator", "narrator"],
    //    ["images/char_portrait/Ita/Ita_idle.png", "images/char_portrait/Ita/Ita_idle.png", "images/char_portrait/Ita/Ita_idle.png", "images/char_portrait/Ita/Ita_laughing.gif"],
    //    ["This is a test dialogue, part1", "This is the next slide, part 2 to be exact", "This is the most-awaited slide 3", "This is the final slide. Go home."]],
    intro_dialogue_vera: {
        speaker: ["Vera", "Vera", "Vera", "Vera", "Vera", "Vera", "Vera", "Vera"],
        image: ["images/char_portrait/Vera/Vera_annoyed.png", "images/char_portrait/Vera/Vera_annoyed.png",
            "images/char_portrait/Vera/Vera_idle.png", "images/char_portrait/Vera/Vera_idle.png", "images/char_portrait/Vera/Vera_intro_suprised.png", "images/char_portrait/Vera/Vera_idle.png",
            "images/char_portrait/Vera/Vera_idle.png", "images/char_portrait/Vera/Vera_idle.png"],
        quote: ["Ow, that's one nasty headache...", "What happened? Did I faint? What was in that food?", "Wait... What am I feeling right now? I feel a bit less knowledgable...?",
            "Lets see...", "Level 1??!", "Why'd I bother going to university?", "Well. What can you do? Perks of being an elf, time is of little concern.", "But if I'm level one...",
            "Yup, all my equipment is gone too.", "Huh, I think I feel something in my weapons tab...(Switch to the weapon tab by clicking the 'weapons' button)",
            "Better than nothing, Let's equip it by clicking the equip(e) button", "Next is the 'deck list'...", "Yea, not much of my skills remain.",
            "I guess I should try going to a dungeon to see how weak I've really gotten.", "The cave next to the desert... That's a beginner dungeon I think? (Click on the cave)"],
        function: ["None", "None", "None", "show_char_stat", "None", "None", "None", "show_inventory"]
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
        $("#dialogue_portrait_image").attr("src", dialogueDict[dialogueKey].image[0]); 
        $("#dialogue_content").html(dialogueDict[dialogueKey].quote[0]);
    }

    $("#back_dialogue_button").click(function () {
        //alert("backward button clicked");
        if (currentDialogue != "None") {
            if (currentDialogueSlide != 0) {
                currentDialogueSlide -= 1;
                $("#dialogue_portrait_name").html(dialogueDict[currentDialogue].speaker[currentDialogueSlide]);
                $("#dialogue_portrait_image").attr("src", dialogueDict[currentDialogue].image[currentDialogueSlide]);     
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
                $("#dialogue_portrait_image").attr("src", dialogueDict[currentDialogue].image[currentDialogueSlide]);    
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
                headInventory[itemClass] -= 1;
                break;
            case "chest":
                chestInventory[itemClass] -= 1;
                addDefense(itemClass);
                break;
            case "weapon":
                weaponInventory[itemClass] -= 1;
                addStrike(itemClass);
                break;
            case "jewel":
                jewelInventory[itemClass] -= 1;
                break;
            case "feet":
                feetInventory[itemClass] -= 1;
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
        for (var i = 0; i < cardModifier.defense_count; i++) {
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
                addItem(itemClass, "head");
                $("#head_box").remove();
                break;
            case "chest_box":
                chestInventory[itemClass] += 1;
                equippedItem["chest"] = "None";
                addItem(itemClass, "chest");
                $("#chest_box").remove();
                break;
            case "weapon_box":
                weaponInventory[itemClass] += 1;
                equippedItem["weapon"] = "None";
                addItem(itemClass, "weapon");
                $("#weapon_box").remove();
                break;
            case "jewel_box":
                jewelInventory[itemClass] += 1;
                equippedItem["jewel"] = "None";
                addItem(itemClass, "jewel");
                $("#jewel_box").remove();
                break;
            case "feet_box":
                feetInventory[itemClass] += 1;
                equippedItem["feet"] = "None";
                addItem(itemClass, "feet");
                $("#feet_box").remove();
                break;
        }

        
    }

    function addItem(itemClass, itemType) {
        var name = itemDict[itemClass].name;
        var description = itemDict[itemClass].description;

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
                    <li class=\x22`+ itemClass + ` chest\x22> title = \x22 ` + description + `\x22><p>` + name + `
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
                break;
            case "jewel":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` jewel\x22> title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
            case "feet":
                $("#armor_list").append(`
                    <li class=\x22`+ itemClass + ` feet\x22> title = \x22 ` + description + `\x22><p>` + name + `
                        </p><button class="item_equip_button">E</button>
                    </li>
                `);
                break;
        }

        weaponInventory[itemClass] += 1;
    }

    function addGold(amount) {
        playerGold += amount;
        $("#gold_count").html("Gold: " + playerGold);
    }

    function addEquipBox(itemClass, equipSlot) {
        var description = itemDict[itemClass].description;
        $("#equip_container").append("<div class=\x22equip_box draggable " + itemClass + "\x22 id=\x22" + equipSlot + "_box\x22 title = \x22"+description+"\x22>" + "<img src=\x22images/items/" + itemClass +".png\x22/></div>");
    }

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
        combatDrawPile = moveDeck;
        updateDrawPile();
        emptyDiscardPile();
        drawCard(5);
        combat_turn = 0;

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
                "<div class=\x22move_card " + card + " " + moves[card].type + " " + moves[card].value + " " + moves[card].cost + " draggable\x22>" + card +"</div>"
            );
            
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
                "<li title= \x22" + moves[moveDeck[i]].description + "\x22>" + moves[moveDeck[i]].name + "</li>"
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

                if (enemies_stat[enemyId].armor > 0) {
                    damage -= enemies_stat[enemyId].armor;
                    if (damage < 0) {
                        damage = 0;
                    }
                    enemies_stat[enemyId].armor -= classArr[3];
                    if (enemies_stat[enemyId].armor < 0) {
                        enemies_stat[enemyId].armor = 0;
                    }
                    $("#" + enemyId).find(".enemy_armor").html(enemies_stat[enemyId].armor);
                }

                enemies_stat[enemyId].health = enemies_stat[enemyId].health - damage;
                if (enemies_stat[enemyId].health < 0) {
                    enemies_stat[enemyId].health = 0;
                }
                $("#" + enemyId).find(".enemy_health").html(enemies_stat[enemyId].health);
                console.log(enemies_stat)
                    
                //Check if enemy is killed
                if (enemies_stat[enemyId].health <= 0) {
                    $("#" + enemyId).animate({ opacity: 0 }, 1000);
                    enemies_stat[enemyId].alive = false;

                    //If all enemy is dead... End combat
                    if (enemies_stat["enemy_1"].alive == false && enemies_stat["enemy_2"].alive == false && enemies_stat["enemy_3"].alive == false) {
                        console.log(currentCombat);
                        endCombat("win");
                    }
                }

                break;
            case "defend":
                console.log("defending!");
                hpStat.currArmor += parseInt(classArr[3]);
                console.log(hpStat.currArmor);
                $("#char_arm").html(hpStat.currArmor);
                console.log(hpStat);
                break;
        }

        //Put card in discard pile
        combatDiscardPile.push(classArr[1]);
        $("#discard_pile").append(
            "<li class=\x22" + classArr[1] + "\x22>" + classArr[1] + "</li>"
        );
        
        
    };

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

        conductEnemyTurn();
        combat_turn += 1;

        newTurn();

        
    });

    function newTurn() {
        curr_action_points = max_action_points;
        hpStat.currArmor = hpStat.defaultArmor;
        updateActionPointUI();

        drawCard(5);

        

        //Display intenet for each enemy
        $(".enemy").each(function (i) {
            var classArr = $(this).attr('class').split(' ');
            var turn_index = combat_turn % (enemies[classArr[1]].turns.length);
            displayIntent(this.id, classArr[1], turn_index);
        });

        
    }


    function updateActionPointUI() {
        $("#action_points").html(curr_action_points + "/" + max_action_points);
    }

    function displayIntent(enemy_id, enemy_name, combat_turn) {

        var enemy_turn = enemies[enemy_name].turns

        var enemy_action = enemy_turn[combat_turn][0];
        var enemy_action_value = enemy_turn[combat_turn][1];
        $("#" + enemy_id).find(".intent").html(enemy_action + " " + enemy_action_value);

    }

    function initializeEnemyStats(enemy_id, enemy_name) {
        enemies_stat[enemy_id].health = enemies[enemy_name].health;
        enemies_stat[enemy_id].max_health = enemies[enemy_name].health;
        enemies_stat[enemy_id].armor = enemies[enemy_name].armor;
        enemies_stat[enemy_id].alive = true;
        $("#" + enemy_id).find(".enemy_health").html(enemies_stat[enemy_id].max_health);
        $("#" + enemy_id).find(".enemy_armor").html(enemies_stat[enemy_id].armor);
    }

    function conductEnemyTurn() {
        //alert("Starting enemy turn!");
        $(".enemy").each(function (i) {
            var classArr = $(this).attr('class').split(' ');
            console.log(this.id);
            if (enemies_stat[this.id].alive) {
                conductEnemyAction(this.id, classArr[1], combat_turn);
            }
            //Conduct enemy action
        });
    }

    function conductEnemyAction(enemy_id, enemy_name, combat_turn) {
        //console.log("Enemy name: " + enemy_name);
        //console.log("Combat turn: " + combat_turn);
        //console.log("Turn actions: " + enemies[enemy_name].turns[combat_turn][0]);
        //console.log("Turn action value: " + enemies[enemy_name].turns[combat_turn][1]);

        //Reset enemy armor
        enemies_stat[enemy_id].armor = 0;
        $("#" + enemy_id).find(".enemy_armor").html(enemies_stat[enemy_id].armor);

        var enemy_turn = enemies[enemy_name].turns
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

            for (var i = 0; i < combat[currentCombat].reward.length; i++) {
                if (combat[currentCombat].reward[i] == "gold") {
                    addGold(40);
                    $("#reward_list").append("<li>gold</li>")
                } else {
                    addItem(combat[currentCombat].reward[i])
                }
            }
        } else if (outcome == "lose") {
            $("#outcome").html("Defeat...");
            console.log("You lost!");
        }

        //Display outcome screen w/rewards
        $(".outcome_screen").fadeIn(1000);

    }

    //Set up game shops
    $(document).on("click", ".shop_purchase_button", function () {
        alert("purchase button clicked");
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
    $(document).on({
        mouseenter: function () {
            $(this).find("img").attr("src", "images/char_portrait/Ita/Ita_laughing.gif");
        },
        mouseleave: function () {
            $(this).find("img").attr("src", "images/char_portrait/Ita/Ita_idle.png");
        }
    }, ".csp_ita");

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
                    console.log(expStat.currExp);
                    console.log(arr[i + 1]);
                    var id = setInterval(function () { animateExpBar(id, $("#exp_bar"), targetValue); }, 50);
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
            }
        }
        
    }

    function changeGameSlide(contentStr) {
        //Going back a slide (leaving)

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
                        <div class="character_select_portrait csp_ita">
                            <img id="char_choice_1" class="choice change_slide char_select_info_1_sli" 
                            src="images/char_portrait/Ita/Ita_idle.png" alt="ita_idle" />
                            <p>Ita Chul</p>
                        </div>
                        <div class="character_select_portrait csp_vera">
                            <img id="char_choice_2" class="choice change_slide char_select_info_2_sli"
                            src="images/char_portrait/Vera/Vera_idle.png" alt="vera_idle" />
                            <p>Vera Daran</p>
                        </div>
                    </div>
                `);
                        break;
                    case "char_select_info_1_sli":
                        $('#main_display_container').append(`
                    <div id="content" class="character_select_info_screen">
                        <div class="select_info_name_container">
                            <p>Ita Chul</p>
                        </div>

                        <div class="select_info_image_container">
                            <img src="images/char_portrait/Ita/Ita_idle.png" alt="ita" />
                        </div>

                        <div class="select_info_backstory_container">
                            <p>Race: Halfling</p>
                            <p>Class: Blacksmith</p>
                            <p>
                                This is Ita's backstory I am a bit unmotivated at this moment to make this backstory.
                                So I will put in some words just so I can get the formate working. Yup, yup, that seems
                                like a good idea doesn't it?
                            </p>
                        
                        </div>

                        <div class="select_info_stats_container">
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Strength determines, well, how strong you are">STR</p>
                                <p>6</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Jab Jab Throw the jab!">DEX</p>
                                <p>4</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="Books are good, reading is gooder">INT</p>
                                <p>4</p>
                            </div>
                            <div class="center_align margin_1vh margin_t_0">
                                <p class="tooltip_attached" title="His words are like butter. God he needs to stop eating butter.">CHR</p>
                                <p>4</p>
                            </div>
                        </div>

                        <div class="select_info_traits_container">
                            <p class="center_align">
                                <span class="tooltip_attached" title="Deal more damage">Strong-willed</span>, 
                                <span class="tooltip_attached" title="Learn skills faster">Talented</span>, 
                                <span class="tooltip_attached" title="Take extra damage">Clumsy</span>
                            </p>
                        </div>

                        <div class="select_info_deck_container">
                            <h3>Move Deck:</h3>
                            <p><span class="tooltip_attached" title="Deal 5 damage">Hammer Strike * 4</span></p>
                            <p><span class="tooltip_attached" title="Bloack 3 damage">Iron Hide * 4</span></p>
                            <p><span class="tooltip_attached" title="Deal 10 damage">Meteor Strike * 1</span></p>
                        </div>

                        <div class="select_info_button_container">
                            <button id='ita' class='initialize_button'>Start!</button>
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
                            <img src="images/char_portrait/Vera/Vera_idle.png" alt="vera" />
                        </div>

                        <div class="select_info_backstory_container">
                            <p>Race: Elf</p>
                            <p>Class: Fear Mage</p>
                            <p>
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
                                <p>7</p>
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
                            <h3>Move Deck:</h3>
                            <p><span class="tooltip_attached" title="Deal 5 damage">Staff Strike * 4</span></p>
                            <p><span class="tooltip_attached" title="Bloack 3 damage">Protect * 4</span></p>
                            <p><span class="tooltip_attached" title="Deal 10 damage">Ball-o-fear * 1</span></p>
                        </div>

                        <div class="select_info_button_container">
                            <button id='Vera' class='initialize_button'>Start!</button>
                            <button class='choice change_slide 0'>Go back</button>
                        </div>

                        </div>
                `);
                        break;
                    case "rat_cook_sli":
                        break;
                    case "map":
                        $('#main_display_container').append(`
                            <div id="content" class="map_screen">
                                <div class="map_container">
                                    <img class='fill_screen' src='images/map/map.png' alt='map' />
                                    <div id='dungeon' class='map_marker'>
                                        <img class='choice combat_encounter intro' src='images/map/markers/dungeon_marker.png' />
                                    </div>
                                
                                </div>
                            
                            </div>
                        
                        `);
                        break;
                    case "intro_slide_1":
                        $('#main_display_container').append(`
                    <div id="content" class="event_screen">
                        <div class="event_title flex_container">
                            <p>A strange guest</p>
                        </div>

                        <div class="flex_container">
                            <div class="event_image_container">
                                <img src="images/event/intro_encounter.png" alt="event_img" />
                            </div>
                
                            <div class="event_choice_container">
                                After a day of dungeon crawling, you decide to rest a the tavern. A strange man approaches you,
                                taking out some food from his coat. <span class='yellow'>"You look quite hungry, how about a treat? On the house, of course."</span> Although you
                                are not supposed to take foods from stranger, you are strangely compelled to have a bite...
                                <button class="choice change_slide intro_slide_2">Eat the cupcake</button>
                                <button class="choice change_slide intro_slide_2">Eat the apple</button>
                                <button class="choice change_slide intro_slide_2">Eat the pizza</button>
                            </div>
                        </div>   
                    </div>
                `);
                        break;
                    case "intro_slide_2":
                        $('#main_display_container').append(`
                    <div id="content" class="event_screen">
                        <div class="event_title flex_container">
                            <p>A strange guest</p>
                        </div>

                        <div class="flex_container">
                            <div class="event_image_container">
                                <img src="images/event/intro_encounter.png" alt="event_img" />
                            </div>
                
                            <div class="event_choice_container">
                                You take a bite... And it tastes great! Almost too great? Oh, yea, it's too great.
                                Yup, it's hitting you now. You start to lose conciousness...
                                <button class="choice change_slide map dialogue intro_dialogue_vera">Faint</button>
                            </div>
                        </div>   
                    </div>
                `);
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
                }
            }
            $(".transition_effect").fadeOut();
        });

        
    }

    function combatEncounter(combatCode) {
        $(".transition_effect").fadeIn(function () {
            previous_slide = $('#content').detach();
            $('#main_display_container').append("<div id='content' class='combat_screen'></div>");
            $('#content').append("<div id='area_name'> <p>" + combat[combatCode].area + "</p> </div>");
            $('#content').append("<div id='enemy_container'></div>");

            //Append each enemy
            for (var i = 1; i < combat[combatCode].enemies.length + 1; i++) {
                $('#enemy_container').append("<div id=\x22enemy_" + i + "\x22 class=\x22enemy " + combat[combatCode].enemies[i-1] + "\x22></div>");

                //intent
                $('#enemy_'+i).append("<div id=\x22intent_" + i + "\x22 class=\x22intent\x22></div>");

                //Enemy image
                $('#enemy_' + i).append("<img src='images/enemy/test_enemy.png' alt='enemy1'/>");

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
                    <button id="outcome_proceed_button" class="choice change_slide map">Proceed</button>
                </div>
            `);

            $(".transition_effect").fadeOut();
            startCombat();
        });
    }

    function animateHpBar(targetBar, targetValue) {
        if (hpStat.currHp == targetValue || hpStat.currHp <= 0) {
            return;
        } else {
            hpStat.currHp = targetValue
            if (hpStat.currHp < 0) {
                hpStat.currHp = 0;
            }
            targetBar.animate({width: hpStat.currHp/hpStat.maxHp * 100 + "%"}, 1000, function () {

            });
            $("#hp").html(hpStat.currHp + "/" + hpStat.maxHp);
        }
    }

    function animateExpBar(id, targetBar, targetValue) {
        console.log(expStat.currExp);
        if (expStat.currExp == targetValue) {
            clearInterval(id);
        } else {
            if (targetValue > expStat.currExp) {
                expStat.currExp++;
            } else if (targetValue < expStat.currExp) {
                expStat.currExp--;
            }
            targetBar.css("width", expStat.currExp / expStat.maxExp * 100 + "%");
            $("#exp").html(expStat.currExp + "/" + expStat.maxExp);
        }
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
            case "ita":
                classTemplate = itaStartTemplate;
                break;
            case "Hall":
                break;
            case "Vera":
                classTemplate = veraStartTemplate;
        }

        $("#char_portrait_img").attr("src", classTemplate.portrait);
        $("#char_name").html(classTemplate.name);
        $("#lv").html("Lv. 1");

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

        var id = setInterval(function () { animateExpBar(id, expBar, 27); }, 50);
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

        addItem("dagger", "weapon");
        
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
        startCombat();
    });

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
