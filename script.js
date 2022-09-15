const boardCell = document.getElementsByClassName('board-cell')
const form = document.getElementById('form')

form.addEventListener('click', e =>{
    e.preventDefault();
    playGame(player1Name.value, player2Name.value);
})

Array.from(boardCell).forEach(element => {
    element.dataset.index = Array.from(boardCell).indexOf(element);
    element.addEventListener('click', e =>{
        receiveDataFromPlay(element.dataset.index)
    })

    
});

let gameOn = false;

function createGame(namePlayer1,namePlayer2){
    let player1 = createPlayer(namePlayer1)
    let player2 = createPlayer(namePlayer2)
    gameOn = true;
}

function receiveDataFromPlay(boardCellClicked){
    console.log(boardCellClicked);
    if(gameOn == true) playRound(boardCellClicked)
}
function showIconsOnTheBoard(player){

}

const playersTurn = () => {
    
    let playerSelector = 'X'
    return {
        changePlayer: () =>{
            if(playerSelector == 'O') playerSelector = 'X'
            else playerSelector = 'O'
            return playerSelector
        }
    }
}
function playRound(){

}

function createPlayer(name){
    let counter = 0;
    return {
        name,
        incrementCounter: ()=> counter++,
        resetCounter: () => counter = 0,
    }
}


const newppp = playersTurn();
console.log(newppp.changePlayer())
console.log(newppp.changePlayer())
console.log(newppp.changePlayer())

