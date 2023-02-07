//display player names:
let displayName1 = document.getElementsByTagName('p')[0];

let displayName2 = document.getElementsByTagName('p')[1];

let nameButton = document.getElementById('nameButton');

let table = document.getElementsByTagName('table')[0];

let gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null], 
        [null, null, null]
    ]
};

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

}

nameButton.addEventListener('click', displayNames);


// table.addEventListener('click', function(evt){
//     console.log(evt.target);
//     // evt.target.innerText = 
// })

//randomly assign player an x or an o:
function assignPlayer(){
  let randInd =  Math.floor(Math.random() * 2);
  return randInd;
}