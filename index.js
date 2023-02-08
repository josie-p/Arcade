//display player names:
let displayName1 = document.getElementsByTagName("p")[0];

let displayName2 = document.getElementsByTagName("p")[1];

let displayTurn = document.getElementsByTagName("p")[2];

let victoryMessage = document.getElementById('victoryMessage');

let nameButton = document.getElementById("nameButton");

let table = document.getElementsByTagName("table")[0];

let clearButton = document.getElementById("clearButton");

let noTouchy = false;

let gameState = {
  players: ["x", "o"],
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
    if (gameState.currentPlayer === "x") {
      console.log(gameState.currentPlayer);
      evt.target.innerText = "X";
    checkCol1();
    checkCol2();
    } else {
      console.log(gameState.currentPlayer);
      evt.target.innerText = "O";
      checkCol1();
      checkCol2();
    }
  }

  togglePlayer();
  console.log(gameState.currentPlayer);
  displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
}

//if a player clicks on a cell, fire addTick function to add a tick in this position
table.addEventListener("click", addTick);

//fully clear the board- all the cells, any player messages, currentPlayer property
function clearBoard() {
  for (let i = 0; i < 9; i++) {
    console.log("hello from for loop of clear");
    if (document.getElementsByTagName("td")[i].innerText !== "") {
      document.getElementsByTagName("td")[i].innerText = "";
    }
  }

  //clear all values
  displayName1.innerText = "";
  displayName2.innerText = "";
  document.getElementById("playerName1").value = "";
  document.getElementById("playerName2").value = "";
  displayTurn.innerText = "";
  victoryMessage.innerText = "";
  gameState.currentPlayer = "";
  noTouchy = false;
}

//if the clear board button is clicked, call clearBoard function
clearButton.addEventListener("click", clearBoard);


function  checkCol1(){
    let counterX = 0;
    let counterO = 0;

    let td = document.getElementsByTagName('td');

    // let displayTurn = document.getElementsByTagName('p')[2];

    if(td[0] || td[3] || td[6]){
        for(i = 0; i <= 6; i++){
            if(td[i].innerText === 'X'){
                console.log('the letter is x!');
                counterX++;
            }else if(td[i].innerText === 'O'){
                console.log('the letter is o!');
                counterO++;
            }
        }
    }

    if(counterX === 3){
        console.log('the value of counterX is ' + counterX);
        displayTurn.innerText = "";
        victoryMessage.innerText = 'X won the game!';
    }else if(counterO === 3){
        console.log('the value of counterO is ' + counterO);
        displayTurn.innerText = "";
        victoryMessage.innerText = 'O won the game!';
    }
}

function checkCol2(){
    let counterX = 0;
    let counterO = 0;

    let td = document.getElementsByTagName('td');

    // let displayTurn = document.getElementsByTagName('p')[2];

    if(td[1] || td[4] || td[7]){
        for(i = 0; i <= 7; i++){
            if(td[i].innerText === 'X'){
                console.log('the letter is x!');
                counterX++;
            }else if(td[i].innerText === 'O'){
                console.log('the letter is o!');
                counterO++;
            }
        }
    }

    if(counterX === 3){
        console.log('the value of counterX is ' + counterX);
        displayTurn.innerText = "";
        victoryMessage.innerText = 'X won the game!';
    }else if(counterO === 3){
        console.log('the value of counterO is ' + counterO);
        displayTurn.innerText = "";
        victoryMessage.innerText = 'O won the game!';
    }
}
