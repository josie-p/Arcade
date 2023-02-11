//display player names:
let displayName1 = document.getElementsByTagName("p")[0];

let displayName2 = document.getElementsByTagName("p")[1];

let displayTurn = document.getElementsByTagName("p")[2];

let errorMsg = document.getElementById('errorMsg');

let victoryMessage = document.getElementById("victoryMessage");

let nameButton = document.getElementById("nameButton");

let table = document.getElementsByTagName("table")[0];

let td = document.getElementsByTagName('td');

let clearButton = document.getElementById("clearButton");

let computerButton = document.getElementById('playComputer');

let noTouchy = false;

let noDoubleSubmit = true;

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
    // noDoubleSubmit = true;
    for(let i = 0; i <= 8; i++){
        if(td[i].innerText !== ''){
            // console.log('testing whether the game should start again', noDoubleSubmit);
            noDoubleSubmit = false;
            // console.log('after', noDoubleSubmit);
            return;
        }
    }

  noTouchy = true;
  let name1 = document.getElementById("playerName1").value;
  let name2 = document.getElementById("playerName2").value;

  if(name1 === '' || name2 === ''){
    errorMsg.innerText = 'You must enter names in both of the slots';
    setTimeout(function(){
      errorMsg.innerText = '';
    }, 2000)
    noTouchy = false;
    return;
  }else{
    let ind2;

    let ind1 = assignPlayer();
    if (ind1 === 0) {
      ind2 = 1;
    } else {
      ind2 = 0;
    }
  
    displayName1.innerText = `${name1}, you are playing with the letter ${gameState.players[ind1]}`;
    displayName2.innerText = `${name2}, you are playing with the letter ${gameState.players[ind2]}`;
    displayName1.style.animation = 'rubberBand 2s';
    displayName2.style.animation = 'rubberBand 2s';
  }
}

//when button to submit names is clicked, call displayNames function
nameButton.addEventListener("click", displayNames);

//when this button is clicked, play against the computer, not an opponent:
computerButton.addEventListener("click", autoPlay);

//automatically fill the second name slot with 'Computer'
function autoPlay(){
  let name2 = document.getElementById("playerName2");
  // console.log(name2);
  name2.value = 'Computer';
}

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

  let name2 = document.getElementById("playerName2").value;

  if(name2 === 'Computer'){
    if (noTouchy === false) {
      return;
    }
    if (gameState.currentPlayer === "X") {
      if(victoryMessage.innerText !== ''){
        displayTurn.innerText = '';
        return;
      }
      doTickActions(evt);
      togglePlayer();
    } else {
      if(victoryMessage.innerText !== ''){
        displayTurn.innerText = '';
        return;
      }
    doTickActions(evt);
      togglePlayer();
    }

    setTimeout(testFunc, 500);

    displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
    console.log('the turn message was changed in the addTick function in the Computer part.', displayTurn.innerText);
    return;
  }

  if (noTouchy === false) {
    return;
  } else if (evt.target.innerText !== "") {
    return;
  } else if (evt.target.tagName !== "TD") {
    return;
  } else {
    if (gameState.currentPlayer === "X") {
    doTickActions(evt);
    } else {
    doTickActions(evt);
    }
  }


  if(victoryMessage.innerText !== ''){
    displayTurn.innerText = '';
    return;
  }
  togglePlayer();
  displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
}

//do actions in order to add tick to board:
function doTickActions(evt){
    colorful(evt.target);
    evt.target.innerText = gameState.currentPlayer;
    count++;
    checkWin();
  }


function testFunc(){
//   let td = document.getElementsByTagName('td');

  const randIdx = Math.floor(Math.random() * 9);

  if(td[randIdx].innerText === ''){
    if(victoryMessage.innerText !== ''){
      displayTurn.innerText = '';
      return;
    }
    doIfStuff(td, randIdx);
    console.log(randIdx);
    console.log(randIdx, 'inside if');
    return;
  }else if (td[randIdx].innerText !== ''){
    if(victoryMessage.innerText !== ''){
      displayTurn.innerText = '';
      return;
    }
    for(let i = 0; i <= 8; i++){
      if(td[i].innerText === ''){
        console.log(i, 'else is happening!!!');
        doIfStuff(td, i);
        break;
      }else{
        continue;
      }
    }
  }

}


// console.log(testFunc());
// console.log(testFunc());
// console.log(testFunc());

function colorful(cell){
    if(gameState.currentPlayer === 'X'){
        cell.className = 'classX'
    }else{
        cell.className = 'classO'
    }
}



function doIfStuff(data, idx){
  console.log('do if stuff was executed');
    colorful(data[idx]);
  data[idx].innerText = gameState.currentPlayer;
  count++;
  checkWin();
  togglePlayer();
  displayTurnMsg();
  console.log('turn was displayed from doIfStuff');
}

function displayTurnMsg(){
  displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
}

//if a player clicks on a cell, fire addTick function to add a tick in this position
table.addEventListener("click", addTick);

//fully clear the board- all the cells, any player messages, currentPlayer property
function clearBoard() {
  for (let i = 0; i < 9; i++) {
    if (td[i].innerText !== "") {
      td[i].innerText = "";
    }
  }

  console.log(count, 'before 0')
  //clear all values
  displayName1.innerText = "";
  displayName2.innerText = "";
  // document.getElementById("playerName1").value = "";
  // document.getElementById("playerName2").value = "";
  displayTurn.innerText = "";
  victoryMessage.innerText = "";
  gameState.currentPlayer = "";
  errorMsg.innerText = "";
  noTouchy = false;
  noDoubleSubmit = true;
  count = 0;
  togglePlayer();

  console.log(count, 'after 0');
}

//if the clear board button is clicked, call clearBoard function
clearButton.addEventListener("click", clearBoard);

function winMsg(player, position) {
  // cat = true;
  return player + " " + "won in the " + position + "!!";
}

function funWin(idx1, idx2, idx3){

        victoryMessage.style.animation = 'wobble 4s';

        td[idx1].style.animation = 'wobble 4s';
        td[idx2].style.animation = 'wobble 4s';
        td[idx3].style.animation = 'wobble 4s';

        // clearWin(idx1, idx2, idx3);

        setTimeout(function(){
        td[idx1].style.animation = '';
        td[idx2].style.animation = '';
        td[idx3].style.animation = '';
        victoryMessage.style.animation = '';
        }, 5000);
}

function checkWin() {
//   let td = document.getElementsByTagName("td");

  if (
    td[0].innerText === gameState.currentPlayer &&
    td[3].innerText === gameState.currentPlayer &&
    td[6].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "first column");
    funWin(0, 3, 6);
  } else if (
    td[1].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[7].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "second column");
    funWin(1, 4, 7);
  } else if (
    td[2].innerText === gameState.currentPlayer &&
    td[5].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "third column");
    funWin(2, 5, 8);
  } else if (
    td[0].innerText === gameState.currentPlayer &&
    td[1].innerText === gameState.currentPlayer &&
    td[2].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "first row");
    funWin(0, 1, 2);
  } else if (
    td[3].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[5].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "second row");
    funWin(3, 4, 5);
  } else if (
    td[6].innerText === gameState.currentPlayer &&
    td[7].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(gameState.currentPlayer, "third row");
    funWin(6, 7, 8);
  } else if (
    td[0].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[8].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(
      gameState.currentPlayer,
      "diagonal to the right position"
    );
    funWin(0, 4, 8);
  } else if (
    td[2].innerText === gameState.currentPlayer &&
    td[4].innerText === gameState.currentPlayer &&
    td[6].innerText === gameState.currentPlayer
  ) {
    victoryMessage.innerText = winMsg(
      gameState.currentPlayer,
      "diagonal to the left position"
    );
    funWin(2, 4, 6);
  } else{
    if(count >= 9){
      victoryMessage.innerText = 'The cat got the game!';
      table.style.animation = 'wobble 4s';
      setTimeout(function(){
        table.style.animation = '';
        }, 5000);
    }
  }

  if (victoryMessage.innerText !== "") {
    console.log(displayTurn.innerText);
    displayTurn.innerText = "";
    console.log(displayTurn.innerText);

    noTouchy = false;
    console.log("changed the value of noTouchy");
  }
}