const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
// All possible combinations for winning
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameGrid;

// Start The Game
function initGame() {
  currentPlayer = "x";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //UI pr box ko reset krne ke liye
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box-${index + 1}`;
  });
  newGamebtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}
initGame();

// Switch player turn on click
function swapTurn() {
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}

// Event listener
function handleClick(index) {
  // Make sure only, Empty cells are filled
  if (gameGrid[index] === "") {
    boxes[index].style.pointerEvents = "none";
    boxes[index].innerHTML = currentPlayer.toUpperCase();
    gameGrid[index] = currentPlayer;
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGamebtn.addEventListener("click", initGame);

// Check if game is over
function checkGameOver() {
  let result = "";
  winningPostions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[0]] === gameGrid[position[2]]
    ) {
      //disable pointer event
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      if (gameGrid[position[0]] === "x") result = "X";
      else result = "0";
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //  We Have A Winner
  if (result !== "") {
    gameInfo.innerText = `Winner Player - ${result}`;
    newGamebtn.classList.add("active");
    return;
  }

  //Tied Game
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });
  // Board is filled, but game is tie
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
    return;
  }
}