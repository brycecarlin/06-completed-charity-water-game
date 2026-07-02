// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

// Score tracking
let score = 0;
const scoreDisplay = document.getElementById("score");

// Timer
let timeLeft = 30;
let timer;
const timerDisplay = document.getElementById("time");


// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

//reset listener
document.getElementById("reset-btn").addEventListener("click", resetGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  // Reset timer and score
  timeLeft = 30;
  score = 0;

  timerDisplay.textContent = timeLeft;
  scoreDisplay.textContent = score;

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);

  //starts the countdown
  timer = setInterval(updateTimer, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  const isBadDrop = Math.random() < 0.25;

  if (isBadDrop) {
    drop.className = "water-drop bad-drop";
  } else {
    drop.className = "water-drop";
  }

  // Add points when player clicks a drop
  drop.addEventListener("click", () => {
    if (isBadDrop) {
      score--;
    } else {
      score++;
    }

    if (score < 0) {
      score = 0;
    }

    scoreDisplay.textContent = score;
    drop.remove();
  });

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

//custom timer function
function updateTimer() {
  timeLeft--;

  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    clearInterval(dropMaker);

    gameRunning = false;

    endGame();
  }
}

//end the game
function endGame() {

  //remove any drops still on screen
  const drops = document.querySelectorAll(".water-drop");
  drops.forEach((drop) => {
    drop.remove();
  });

  if (score >= 20) {
    alert("🎉 Congratulations! You collected enough clean water and won!");
  } else {
    alert("💧 Time's up! You scored less than 20 points. Try again!");
  }
}


//reset function
function resetGame() {
  clearInterval(dropMaker);
  clearInterval(timer);

  gameRunning = false;
  score = 0;
  timeLeft = 30;

  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  const drops = document.querySelectorAll(".water-drop");
  drops.forEach((drop) => {
    drop.remove();
  });
}