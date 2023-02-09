//display player names:
let displayName1 = document.getElementsByTagName("p")[0];

let displayName2 = document.getElementsByTagName("p")[1];

let displayTurn = document.getElementsByTagName("p")[2];

let victoryMessage = document.getElementById("victoryMessage");

let nameButton = document.getElementById("nameButton");

let table = document.getElementsByTagName("table")[0];

let clearButton = document.getElementById("clearButton");

let noTouchy = false;

// let cat = false;

let count = 0;

let gameState = {
  players: ["X", "O"],
  currentPlayer: "",
};

//randomly assign player an x or an o:
function assignPlayer() {
  let randInd = Math.floor(Math.random() * 2);
  gameState.currentPlayer = gameState.players[randInd];
  displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
  return randInd;
}

//display the player names and letters
//call assignPlayer to randomly assign player letter display the user's first turn
function displayNames() {
  noTouchy = true;
  let name1 = document.getElementById("playerName1").value;
  let name2 = document.getElementById("playerName2").value;

  let ind2;

  let ind1 = assignPlayer();
  if (ind1 === 0) {
    ind2 = 1;
  } else {
    ind2 = 0;
  }

  displayName1.innerText = `${name1}, you are playing with the letter ${gameState.players[ind1]}`;
  displayName2.innerText = `${name2}, you are playing with the letter ${gameState.players[ind2]}`;
}

//when button to submit names is clicked, call displayNames function
nameButton.addEventListener("click", displayNames);

//toggle between players
function togglePlayer() {
  if (gameState.currentPlayer === gameState.players[0]) {
    gameState.currentPlayer = gameState.players[1];
  } else {
    gameState.currentPlayer = gameState.players[0];
  }
}

//add tick to game board
//call togglePlayer to change the letter turn
//display the player whose turn it is
function addTick(evt) {
  if (noTouchy === false) {
    return;
  } else if (evt.target.innerText !== "") {
    return;
  } else if (evt.target.tagName !== "TD") {
    return;
  } else {
    if (gameState.currentPlayer === "X") {
      evt.target.innerText = "X";
      count++;
      checkWin();
      
      // checkTie();
    } else {
      evt.target.innerText = "O";
      count++;
      checkWin();
      // checkTie();
    }
  }


  togglePlayer();
  displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
}

//if a player clicks on a cell, fire addTick function to add a tick in this position
table.addEventListener("click", addTick);

//fully clear the board- all the cells, any player messages, currentPlayer property
function clearBoard() {
  for (let i = 0; i < 9; i++) {
    if (document.getElementsByTagName("td")[i].innerText !== "") {
      document.getElementsByTagName("td")[i].innerText = "";
    }
  }

  //clear all values
  displayName1.innerText = "";
  displayName2.innerText = "";
  // document.getElementById("playerName1").value = "";
  // document.getElementById("playerName2").value = "";
  displayTurn.innerText = "";
  victoryMessage.innerText = "";
  gameState.currentPlayer = "";
  noTouchy = false;
}

//if the clear board button is clicked, call clearBoard function
clearButton.addEventListener("click", clearBoard);

function winMsg(player, position) {
  // cat = true;
  return player + " " + "won in the " + position + "!!";
}


function checkWin() {
  let td = document.getElementsByTagName("td");

  if (
    td[0].innerText === gameState.currentPlayer &&
    td[3].innerText === gameState.currentPlayer &&
    td[6].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "first column");
  } else if (
    td[1].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[7].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "second column");
  } else if (
    td[2].innerText === gameState.currentPlayer &&
    td[5].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "third column");
  } else if (
    td[0].innerText === gameState.currentPlayer &&
    td[1].innerText === gameState.currentPlayer &&
    td[2].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "first row");
  } else if (
    td[3].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[5].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "second row");
  } else if (
    td[6].innerText === gameState.currentPlayer &&
    td[7].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "third row");
  } else if (
    td[0].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(
      gameState.currentPlayer,
      "diagonally to the right"
    );
  } else if (
    td[2].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[6].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(
      gameState.currentPlayer,
      "diagonally to the left"
    );
  } else{
    if(count >= 9){
      victoryMessage.innerText = 'The cat got the game!';
    }
  }

  if (victoryMessage.innerText !== "") {
    noTouchy = false;
    console.log("changed the value of noTouchy");
  }
}