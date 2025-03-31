let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let score = 0; // Added score variable
let h2 = document.querySelector("h2");

// Start the game on key press
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        score = 0; // Reset score at the start
        levelUp();
    }
});

// Function to flash the game-sequence button
function btnFlash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Function to flash when user clicks a button
function userFlash(btn) {
    if (!btn) return;
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Function to move to the next level
function levelUp() {
    userSeq = [];
    level++;
    score++; // Increase score when leveling up
    h2.innerHTML = `Level ${level} | Score: ${score}`;

    // Random button selection
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    if (!randBtn) {
        console.error(`Button with class "${randColor}" not found.`);
        return;
    }

    gameSeq.push(randColor);
    btnFlash(randBtn);
}

// Function to check user input against game sequence
function checkAns() {
    let idx = userSeq.length - 1;

    // Check if the latest input matches the game sequence
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Score: ${score} | Press any key to restart.`;
        reset();
    }
}

// Function to handle button clicks
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

// Select all buttons and add event listeners
let allBtns = document.querySelectorAll(".btn");

if (allBtns.length === 0) {
    console.error("No buttons found with class 'btn'. Check your HTML.");
}

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0; // Reset score when the game restarts
}
 