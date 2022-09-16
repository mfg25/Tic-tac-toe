const boardCell = document.getElementsByClassName('board-cell')
const form = document.getElementById('form')

form.addEventListener('click', e => {
    e.preventDefault();
    createGame(player1Name.value, player2Name.value);
})

Array.from(boardCell).forEach(element => {
    element.dataset.index = Array.from(boardCell).indexOf(element);
    element.addEventListener('click', e => {
        receiveDataFromPlay(element.dataset.index)
    })


});

let gameOn = false;
let playerSelector = 'X'

function createGame(namePlayer1, namePlayer2) {
    let player1 = createPlayer(namePlayer1)
    let player2 = createPlayer(namePlayer2)
    
    gameOn = true;
    
    
}

function receiveDataFromPlay(boardCellClicked) {
    
    if (gameOn == true) playRound(boardCellClicked)
}

function showIconsOnTheBoard(player, boardCellClicked) {
    console.log(player)
    Array.from(boardCell).forEach(element => {
        if(element.dataset.index == boardCellClicked){
            if(player == 'O'){
                let image = document.createElement('img');
                image.src = 'o.png'
                element.appendChild(image)
            }
            if(player == 'X'){
                let image = document.createElement('img');
                image.src = 'x.png'
                element.appendChild(image)
            }
        }
    });
}


const playersTurn = () => {
    
    if (playerSelector == 'O') playerSelector = 'X'
    else playerSelector = 'O'
    
    return playerSelector

}
function playRound(boardCellClicked) {
    showIconsOnTheBoard(playersTurn(), boardCellClicked)
}

function createPlayer(name) {
    let counter = 0;
    return {
        name,
        incrementCounter: () => counter++,
        resetCounter: () => counter = 0,
    }
}




