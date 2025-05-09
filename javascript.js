/* edit section */
const player1Input = document.querySelector("#player-1");
const player2Input = document.querySelector("#player-2");
const confirmEditing = document.querySelector(".confirm-edit-btn");
const player1Viewer = document.querySelector(".player-1-viewer");
const player2Viewer = document.querySelector(".player-2-viewer");
const gameStatus = document.querySelector(".game-status");

confirmEditing.addEventListener("click",()=>{
if (player1Input.value !== "" && player2Input.value !== "" && isNaN(Number(player1Input.value)) && isNaN(Number(player2Input.value))) {
    player1Viewer.textContent = player1Input.value + " (X)" ;
    player2Viewer.textContent = player2Input.value + " (O)";
}

});

/* the brutal part */
const TicTacToe = (function() {
    // private variables 
let Board = ["","","","","","","","",""];
let currentPlayer = "X";
let hasSomeoneWon = false;
let playWithComputerMode = false;
let humanTurn = true;
let computerTurn = false;
let turns = 0;
// print on board and push to array 
const cells = document.querySelectorAll(".cell");
cells.forEach((item,index) => addMark(item,index));

 function addMark(item,index) {
 
item.addEventListener("click",()=> {
if (item.textContent === "" && turns <= 9 && !hasSomeoneWon) {
  item.textContent = currentPlayer === "X" ? "X" : "O";
  item.style.color = currentPlayer === "X" ? "rgb(193, 3, 3)" : "rgb(221, 255, 0)";
  // toggle player 
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  computerTurn = true;
  // push to the array 
  Board[index] = item.textContent;
  // adding turn
  turns++;
  checkWinner();
}
// playing with computer code

if (playWithComputerMode && computerTurn && !hasSomeoneWon) {
 

let ComputerChoice;

do {
  ComputerChoice = Math.floor(Math.random() * 9);
} while (document.querySelectorAll(".cell")[ComputerChoice].textContent !== "" && turns < 9); // Ensure the selection is truly empty
if (Board[ComputerChoice] === "") {
document.querySelectorAll(".cell")[ComputerChoice].textContent = "O";
document.querySelectorAll(".cell")[ComputerChoice].style.color = "rgb(221, 255, 0)";
currentPlayer = "X";
computerTurn = false;
Board[ComputerChoice] = "O";
turns++;
checkWinner();
}
}
});

}

// activating play with computer button 
const playWithComputerBtn = document.querySelector(".button-1");
playWithComputerBtn.addEventListener("click", ()=>{
  reset();
  playWithComputerMode = true;
  player2Viewer.textContent = "Computer (O)";
  player2Input.disabled = true;
  player2Input.value = "Computer";
});

// activating the reset button 
const resetBtn = document.querySelector(".button-2");
resetBtn.addEventListener("click", reset);

function reset() {
  Board = ["","","","","","","","",""];
currentPlayer = "X";
hasSomeoneWon = false;
playWithComputerMode = false;
humanTurn = true;
computerTurn = false;
turns = 0;
player1Viewer.textContent = "player-1 (X)";
player2Viewer.textContent = "player-2 (O)";
document.querySelector(".VS").textContent = "VS";
document.querySelector(".VS").style.display = "inline";
     player1Viewer.style.display = "inline";
     player2Viewer.style.display = "inline";
     gameStatus.style.display = "none";
cells.forEach((item)=>{
  item.textContent = "";
  item.style.backgroundColor = "";
})

player2Input.value = "player-2";
player1Input.value = "player-1";
player2Input.disabled = false;

}

function checkWinner() {
 const winningPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
 ];
 
 for (let x in winningPatterns) {
  const [a,b,c] = winningPatterns[x];
  if (Board[a] === Board[b] && Board[c] === Board[b] && Board[a] === "") {

    continue;

  }
  else if (Board[a] === Board[b] && Board[c] === Board[b]) {
    hasSomeoneWon = true;
    document.querySelectorAll(".cell")[a].style.backgroundColor = "rgb(63, 233, 63)";
     document.querySelectorAll(".cell")[b].style.backgroundColor = "rgb(63, 233, 63)";
     document.querySelectorAll(".cell")[c].style.backgroundColor = "rgb(63, 233, 63)";
     gameStatus.style.display = "inline";
     gameStatus.textContent = Board[a] === "X" ? `${player1Viewer.textContent} has WON the game !` : `${player2Viewer.textContent} has WON the game !`;
     player1Viewer.textContent = "";
     player2Viewer.textContent = "";
     document.querySelector(".VS").textContent = "";
     document.querySelector(".VS").style.display = "none";
     player1Viewer.style.display = "none";
     player2Viewer.style.display = "none";
    }
    
 }
 if (hasSomeoneWon === false && turns === 9) {
  document.querySelector(".VS").style.display = "none";
     player1Viewer.style.display = "none";
     player2Viewer.style.display = "none";
  gameStatus.style.display = "inline";
  player1Viewer.textContent = "";
     player2Viewer.textContent = "";
     document.querySelector(".VS").textContent = "";
  gameStatus.textContent = "It is a draw !";
 }
}
})();

