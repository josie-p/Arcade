//display player names:
let displayName1 = document.getElementsByTagName('p')[0];

let displayName2 = document.getElementsByTagName('p')[1];

let displayTurn = document.getElementsByTagName('p')[2];

let nameButton = document.getElementById('nameButton');

let table = document.getElementsByTagName('table')[0];

let td = document.getElementsByTagName('td');

let gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null], 
        [null, null, null]
    ], 
    currentPlayer : ''
};

//randomly assign player an x or an o:
function assignPlayer(){
    let randInd =  Math.floor(Math.random() * 2);
    gameState.currentPlayer = gameState.players[randInd];
    displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
    return randInd;
  }

function displayNames(){
    let name1 = document.getElementById('playerName1').value;
    let name2 = document.getElementById('playerName2').value;

    let ind2;

    let ind1 = assignPlayer();
    if(ind1 === 0){
         ind2 = 1;
    }else{
       ind2 = 0;
    }

    displayName1.innerText = `${name1}, you are playing with the letter ${gameState.players[ind1]}`;
    displayName2.innerText = `${name2}, you are playing with the letter ${gameState.players[ind2]}`;

    // console.log(gameState.currentPlayer);

    // togglePlayer();

    // console.log(gameState.currentPlayer);

}

// function setPlayer(num){
//     gameState.currentPlayer = gameState.players[num];
//     displayTurn.innerText = `${gameState.currentPlayer}, it's your turn!`;
// }

nameButton.addEventListener('click', displayNames);

//toggle between players
function togglePlayer(){
  if( gameState.currentPlayer === gameState.players[0]){
    gameState.currentPlayer = gameState.players[1];
  }else{
    gameState.currentPlayer = gameState.players[0];
  }
}

table.addEventListener('click', function(evt){

    if(gameState.currentPlayer === 'x'){
        console.log(gameState.currentPlayer);
        evt.target.innerText = 'X';
    }else{
        console.log(gameState.currentPlayer);
        evt.target.innerText = 'O';
    }

    togglePlayer();
    console.log(gameState.currentPlayer);

    // console.log(td);
})