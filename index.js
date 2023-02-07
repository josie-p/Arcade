//display player names:
let displayName1 = document.getElementsByTagName('p')[0];

let displayName2 = document.getElementsByTagName('p')[1];

let nameButton = document.getElementById('nameButton');

let table = document.getElementsByTagName('table')[0];


function displayNames(){
    let name1 = document.getElementById('playerName1').value;
    let name2 = document.getElementById('playerName2').value;

    displayName1.innerText = name1;
    displayName2.innerText = name2;


}

nameButton.addEventListener('click', displayNames);

let gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null], 
        [null, null, null]
    ]
};

// table.addEventListener('click', function(evt){
//     console.log(evt.target);
//     // evt.target.innerText = 
// })

//randomly assign player an x or an o:
function assignPlayer(){
    
}