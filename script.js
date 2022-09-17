const boardCell = document.getElementsByClassName('board-cell')
const form = document.getElementById('form')
const gameboard = document.getElementById('gameboard')
const playerInput = document.getElementById('playerInput')

form.addEventListener('click', e => {
    e.preventDefault();
    createGame(player1Name.value, player2Name.value);
    removeForm()
    moveBoard()
})

Array.from(boardCell).forEach(element => {
    element.dataset.index = Array.from(boardCell).indexOf(element);
    element.addEventListener('click', e => {
        receiveDataFromPlay(element.dataset.index)
    })
    

});

let gameOn = false;
let playerSelector = 'X'
let gameboardStats = [
    [,,,],
    [,,,],
    [,,,]
]
console.log(gameboardStats)

function createGame(namePlayer1, namePlayer2) {
    let player1 = createPlayer(namePlayer1)
    let player2 = createPlayer(namePlayer2)
    gameOn = true;
}

function moveBoard(){
    gameboard.className = 'animationGameboard'
}

function removeForm(){
    form.className = 'animationForm'
    setTimeout(() => {
        playerInput.remove()
    }, 1000);
}

function receiveDataFromPlay(boardCellClicked) {
    if (gameOn == true) playRound(boardCellClicked)
    console.log(gameOn)
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

function evaluatePlay(index){
   if(gameboardStats[index[0]][index[1]] != null) return false
   else true
}

function getGameboardIndex(boardCellClicked){
    if(boardCellClicked == 0) return [0, 0]
    else if(boardCellClicked == 1)return [0,1]
    else if(boardCellClicked == 2)return [0,2]
    else if(boardCellClicked == 3)return [1,0]
    else if(boardCellClicked == 4)return [1,1]
    else if(boardCellClicked == 5)return [1,2]
    else if(boardCellClicked == 6)return [2,0]
    else if(boardCellClicked == 7)return [2,1]
    else return [2,2]
}

function checkEndGame(player){
    if(gameboardStats[0][0] == player && gameboardStats[0][1] == player && gameboardStats[0][2] == player) gameOn = false;
    else if(gameboardStats[1][0] == player && gameboardStats[1][1] == player && gameboardStats[1][2] == player) gameOn = false;
    else if(gameboardStats[2][0] == player && gameboardStats[2][1] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][0] == player && gameboardStats[1][0] == player && gameboardStats[2][0] == player) gameOn = false;
    else if(gameboardStats[0][1] == player && gameboardStats[1][1] == player && gameboardStats[2][1] == player) gameOn = false;
    else if(gameboardStats[0][2] == player && gameboardStats[1][2] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][0] == player && gameboardStats[1][1] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][2] == player && gameboardStats[1][1] == player && gameboardStats[2][0] == player) gameOn = false;
}

function playRound(boardCellClicked) {
    let index = getGameboardIndex(boardCellClicked)
    let evaluatedPlay = evaluatePlay(index)
    if(evaluatedPlay == false){
        return -1
    }
    let playerTurn = playersTurn(boardCellClicked)
    showIconsOnTheBoard(playerTurn, boardCellClicked)
    gameboardStats[index[0]][index[1]] = playerTurn
    console.log(gameboardStats)
    checkEndGame(playerTurn)
}

function createPlayer(name) {
    let counter = 0;
    return {
        name,
        incrementCounter: () => counter++,
        resetCounter: () => counter = 0,
    }
}