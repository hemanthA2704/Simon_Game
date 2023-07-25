var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;

var colouredKeys = ["r","b","g","y"]

// for keyboard press

$(document).keyup(function(event) {
    if (started === false) {

        nextSequence(level);

        started = true;
    } else if (colouredKeys.includes(event.key)) {
        if (event.key === "r") {
            press("red")
        }
        if (event.key === "b") {
            press("blue")
        }
        if (event.key === "g") {
            press("green")
        }
        if (event.key === "y") {
            press("yellow")
        }

    }   
});

// for listening button clicks

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id")

    press(userChosenColour);

});

function press(userChosenColour) {
    playSound(userChosenColour);

    $("." + userChosenColour).fadeOut(100).fadeIn(100);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}

// for creating next sequence


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("h1").text("Level "+ level)
    
    var random = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[random];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

};

// for playing sounds

function playSound(randomChosenColour) {
    var pathToSound = "sounds/" + randomChosenColour + ".mp3";

    var audio = new Audio(pathToSound);

    audio.play();
}

// check answer
function checkAnswer(i) {

    if (gamePattern[i] === userClickedPattern[i]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence(level), 10000);
        }
    } else {
        $("body").addClass("game-over");
        
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        
        startOver();

    }
}
function startOver() {

    gamePattern = []

    level = 0

    started = false;
}

