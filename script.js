const buttonsEl = document.querySelectorAll(".btn");
const resultEl = document.querySelector("#result");
const playerScoreEl = document.querySelector("#user-score");
const computerScoreEl = document.querySelector("#computer-score");
const resetButton = document.querySelector("#reset-button");
let playerScore = 0;
let computerScore = 0;

buttonsEl.forEach((button) => {
    button.addEventListener("click", () => {
        resultEl.style.display="block";
        const result = playRound(button.id, computerPlay());
        resultEl.textContent = result;
        updateScores(); // Update scores after each round
    });
});

resetButton.addEventListener("click", () => {
    resultEl.style.display="none";
    playerScore = 0;
    computerScore = 0;
    updateScores();
});

function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    const randomchoice = Math.floor(Math.random() * choices.length);
    return choices[randomchoice];
}

function playRound(playerSelection, computerSelection) {
    let roundResult;

    if (playerSelection === computerSelection) {
        resultEl.style.color = "blue";
        roundResult = "It's a tie!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        resultEl.style.color = "green";
        playerScore++;
        roundResult = "You win! " + playerSelection + " beats " + computerSelection;
    } else {
        resultEl.style.color = "red";
        computerScore++;
        roundResult = "You lose! " + computerSelection + " beats " + playerSelection;
    }

    return roundResult;
}

function updateScores() {
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('playerScore', playerScore);
    playerScoreEl.innerText = playerScore;
    computerScoreEl.innerText = computerScore;
}

document.addEventListener('DOMContentLoaded', () => {
    computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    updateScores();
});
