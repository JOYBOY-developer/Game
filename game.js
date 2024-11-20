const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];

let check = false;
let level = 0;

//starts the game on user click in any random key
$(".start").on("click", () => {
  if (!check) {
    //make it to level 0
    $("#level-title").text("Level " + level);
    //calls the nextSequence function
    nextSequence();
    //make the check boolean value to true
    check = true;
  }
});



//program module for computer/random generation
function nextSequence() {
  userClickedPattern = [];
  level++;
  //inreases the level by 1
  $("#level-title").text("Level " + level);

  //generate random num between 0 to 3
  let randomNumber = Math.floor(Math.random() * 4);
  //select randomly choosen color
  let randomChoosenColor = buttonColors[randomNumber];
  //add "randomChoosenColor" in back
  gamePattern.push(randomChoosenColor);

  //animate flash   
  // $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  setTimeout(() => {
    $("#" + randomChoosenColor).addClass("flash")
  }, 50);

  //removes the class "pressed" in 0.2s
  setTimeout(() => {
    $("#" + randomChoosenColor).removeClass("flash")
  }, 200);
  //play sound     
  playSound(randomChoosenColor);
}


//program module for user side/interaction
let userClickedPattern = [];
//user clicks on different color button
$(".btn").click(function () {
  //gets the value like "blue"
  let userChoosenColor = $(this).attr("id");
  //adds the color in back
  userClickedPattern.push(userChoosenColor);
  //passes the color to produce sound on click
  playSound(userChoosenColor);
  //animates on click
  animatePress(userChoosenColor);
  //passing the last index
  checkAnswer(userClickedPattern.length - 1);
});

//function for playing sound
function playSound(colorName) {
  let choosenAudio = new Audio("sounds/" + colorName + ".mp3")
  choosenAudio.play();
}

//function for adding flash in btn clicked
function animatePress(currentColor) {
  //adds the class "pressed" in 0.1s
  setTimeout(() => {
    $("#" + currentColor).addClass("pressed")
  }, 100);

  //removes the class "pressed" in 0.2s
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed")
  }, 200);
}



function checkAnswer(currentLevel) {
  //checks if the last choose value is equals to gamePattern 
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //checks the length of both pattern
    if (gamePattern.length === userClickedPattern.length) {
      //if all true calls the nextSequence
      setTimeout(() => {
        nextSequence();
      }, 1000);
      //make the start button to playing....
      $(".start").text("Playing....")

    }
    //if choosen wrong by user this code gets executed
  } else {
    //makes the bg red 
    setTimeout(() => {
      $("body").addClass("game-over");
      let overAudio = new Audio("sounds/wrong.mp3");
      overAudio.play();
    }, 0);
    //changes the text
    $("#level-title").text("You fucking loser. Press the Play Again button to play.")
    $(".start").text("Play Again")


    //removes red bg
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    //calls this func to reset all value
    startOver();
  }
}

//once user play wrong move all value is reset to beggining value
function startOver() {
  gamePattern = [];
  level = 0;
  check = false;
}

