//VARIABLES:
//------------------------------------------------------------------------------------

//vars for displaying messages:
//display player names:
let displayName1 = document.getElementsByTagName("p")[0];

let displayName2 = document.getElementsByTagName("p")[1];

//display player turn (X or O):
let displayTurn = document.getElementsByTagName("p")[2];

//display error message:
let errorMsg = document.getElementById('errorMsg');

//display who won (or if it was a tie):
let victoryMessage = document.getElementById("victoryMessage");

//buttons:
//button to start the game:
let startGame = document.getElementById("startGame");

//button to play the computer:
let computerButton = document.getElementById('playComputer');

//button to clear the board:
let clearButton = document.getElementById("clearButton");

//booleans:
//can a player touch the board:
let noTouchy = false;

//can a player press the start game button:
let noDoubleSubmit = true;

//vars for the playing board:
//the table:
let table = document.getElementsByTagName("table")[0];

//the data cells in the table:
let td = document.getElementsByTagName('td');

//count var to keep track of no. of times a tick is put on the board:
let count = 0;

//gameState object with properties of player and currentPlayer:
let gameState = {
  players: ["X", "O"],
  currentPlayer: "",
};

//FUNCTIONS:
//------------------------------------------------------------------------------------

//display the player names and letters
//call assignPlayer to randomly assign player letter & display the user's first turn:
function displayNames() {

//if any of the data cells are full, players shouldn't be able to generate new letters and turns:
    for(let i = 0; i <= 8; i++){

        if(td[i].innerText !== ''){
            noDoubleSubmit = false;

            return;
        }
    }

    //get names from text input:
  let name1 = document.getElementById("playerName1").value;

  let name2 = document.getElementById("playerName2").value;

  //if any of the names are blank, display error message, make it so players may not touch the board, and leave function
  //otherwise, call assignPlayer and assign ind2 position.
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
  
    //display player letters based on returned index from assignPlayer:
    displayName1.innerText = `${name1}, you are playing with the letter ${gameState.players[ind1]}`;

    displayName2.innerText = `${name2}, you are playing with the letter ${gameState.players[ind2]}`;

    //animate names
    displayName1.style.animation = 'bounce 3s';

    setTimeout(function(){
        displayName2.style.animation = 'bounce 2s';
    }, 2000)

    //let players touch the board
    noTouchy = true;

    //take animation off of names
    setTimeout(function(){
        displayName1.style.animation = '';

        displayName2.style.animation = '';
    }, 6000)
  }
}

//display the player turn message:
function displayTurnMsg(){

    displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;

  }

//generate a 0 or 1 randomly
//set the currentPlayer to X or O based on the random index ('X' would be 0, 'O' would be 1)
//display the current player's turn and return the random index:
function assignPlayer() {

    let randInd = Math.floor(Math.random() * 2);

    gameState.currentPlayer = gameState.players[randInd];

    displayTurnMsg();

    return randInd;
  }

//automatically fill the second name slot with 'Computer', called whenever user clicks on the 'Play Computer' button:
function autoPlay(){
    let name2 = document.getElementById("playerName2");

    name2.value = 'Computer';
}

//toggle between players, called in the addTick and doIfStuff functions:
function togglePlayer() {
  if (gameState.currentPlayer === gameState.players[0]) {

    gameState.currentPlayer = gameState.players[1];

  } else {

    gameState.currentPlayer = gameState.players[0];

  }
}


//assign letter class to make X specific color and O specific color
//called in doIfStuff, doTickActions:
function colorful(cell){

    if(gameState.currentPlayer === 'X'){

        cell.className = 'classX'
    }else{

        cell.className = 'classO'
    }
}

//do actions in order to add tick to board, called in addTick
//calls colorful to add a color to the letters as they're added to the board
//calls checkWin() to check whether the move was a winning move:
function doTickActions(evt){

    colorful(evt.target);

    evt.target.innerText = gameState.currentPlayer;

    count++;

    checkWin();
  }


//add tick to game board
//call togglePlayer to change the letter turn; call checkWin() to see if move was a winning move; 
//display the player turn; called every time someone clicks on the game board during the game:
function addTick(evt) {

    //get the value of the second player name:
  let name2 = document.getElementById("playerName2").value;

  //if the second player name is computer, let the person player make a move, then call playComputer and let the computer make a move
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

    //do playComputer actions after brief pause
    setTimeout(playComputer, 500);

    displayTurnMsg();

    console.log('the turn message was changed in the addTick function in the Computer part.', displayTurn.innerText);

    return;
  }

  //otherwise, it's a two player game and proceed as normal:
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


  //if a player has won, stop displaying turns and leave addTick function
  if(victoryMessage.innerText !== ''){ 

    displayTurn.innerText = '';

    return;
  }

  //change player
  togglePlayer();

displayTurnMsg();
}

//does action to be executed in an if statement in the playComputer function; called in playComputer:
function doIfStuff(data, idx){

colorful(data[idx]);

  data[idx].innerText = gameState.currentPlayer;

  count++;

  checkWin();

  if(victoryMessage.innerText !== ''){

    displayTurn.innerText = '';

    return;
  }

  togglePlayer();

  displayTurnMsg();
}


//if a cell is empty, put the computer's letter there, called in addTick:
function playComputer(){

  const randIdx = Math.floor(Math.random() * 9);

  if(td[randIdx].innerText === ''){

    if(victoryMessage.innerText !== ''){

      displayTurn.innerText = '';

      return;
    }

    doIfStuff(td, randIdx);

    return;

  }else if (td[randIdx].innerText !== ''){

    if(victoryMessage.innerText !== ''){

      displayTurn.innerText = '';

      return;
    }

    for(let i = 0; i <= 8; i++){

      if(td[i].innerText === ''){

        doIfStuff(td, i);

        break;
      }else{
        continue;
      }
    }
  }
}

//fully clear the board- all the cells, any player messages, currentPlayer property
function clearBoard() {
  for (let i = 0; i < 9; i++) {
    if (td[i].innerText !== "") {
      td[i].innerText = "";
    }
  }

  //clear all values
  displayName1.innerText = "";

  displayName2.innerText = "";
 
  displayTurn.innerText = "";

  victoryMessage.innerText = "";

  gameState.currentPlayer = "";

  errorMsg.innerText = "";

  noTouchy = false;

  noDoubleSubmit = true;

  count = 0;

  togglePlayer();
}

//if the player won, display their letter and the position they won in:
function winMsg(player, position) {
  
  return player + " " + "won in the " + position + "!!";

}

//animate the data cells that have winning moves in them, as well as the victory message:
function funWin(idx1, idx2, idx3){

        victoryMessage.style.animation = 'wobble 4s';

        td[idx1].style.animation = 'wobble 4s';

        td[idx2].style.animation = 'wobble 4s';

        td[idx3].style.animation = 'wobble 4s';

        setTimeout(function(){

        td[idx1].style.animation = '';

        td[idx2].style.animation = '';

        td[idx3].style.animation = '';

        victoryMessage.style.animation = '';
        }, 5000);
}

//check whether or not someone has won:
function checkWin() {

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

//EVENT LISTENERS:
//----------------------------------------------------------

//when start game button is clicked, call displayNames:
startGame.addEventListener("click", displayNames);

//when playComputer button is clicked, call autoPlay:
computerButton.addEventListener("click", autoPlay);

//when the table is clicked on, call addTick:
table.addEventListener("click", addTick);

//when clear board button is clicked on, call clearBoard:
clearButton.addEventListener("click", clearBoard);