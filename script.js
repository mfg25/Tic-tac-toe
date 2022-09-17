const boardCell = document.getElementsByClassName('board-cell')
const form = document.getElementById('form')
const gameboard = document.getElementById('gameboard')
const playerInput = document.getElementById('playerInput')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
const canvas_width = canvas.width = 216
const canvas_height = canvas.height = 144
const canvas_width2 = canvas2.width = 216
const canvas_height2 = canvas2.height = 144

const playerImage1 = new Image();
playerImage1.src = 'character.png'

const playerImage2 = new Image();
playerImage2.src = 'character2.png'

const sprite_width = 72
const sprite_height = 48

let gameFrame = 0;
let gameFrame2 = 0;
let slowFrames = 15;

let player1Action = 'stand'
let player2Action = 'stand'

const spriteAnimations = [];
const animationStates = [
    {
        name: 'walk',
        frames: 6
    },
    {
        name: 'stand',
        frames: 4
    },
    {
        name: 'jump',
        frames: 3
    },
    {
        name: 'attack',
        frames: 4
    },
    {
        name: 'defense',
        frames: 4
    },
    {
        name: 'damage',
        frames: 3
    },
    {
        name: 'death',
        frames: 5
    },
    {
        name: 'wavesign',
        frames: 6
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: []
    }
    for(let i = 0; i < state.frames; i++){
        let positionX = i*sprite_width;
        let positionY = index*sprite_height;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames
});


function animate(action){
    ctx.clearRect(0,0, canvas_width, canvas_height)
    let position = Math.floor(gameFrame/slowFrames) % spriteAnimations[player1Action].loc.length;
    let frameX = sprite_width*position;
    let frameY = spriteAnimations[player1Action].loc[position].y
    ctx.drawImage(playerImage1, frameX, frameY, sprite_width, sprite_height, 0, 0, 3*sprite_width, 3*sprite_height)
    
    gameFrame++
    requestAnimationFrame(animate)
}

function animate2(){
    ctx2.clearRect(0,0, canvas_width2, canvas_height2)
    let position = Math.floor(gameFrame2/slowFrames) % spriteAnimations[player2Action].loc.length;
    let frameX = sprite_width*position;
    let frameY = spriteAnimations[player2Action].loc[position].y
    ctx2.drawImage(playerImage2, frameX, frameY, sprite_width, sprite_height, 0, 0, 3*sprite_width, 3*sprite_height)
    
    gameFrame2++
    requestAnimationFrame(animate2)
}
animate()
animate2()


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
    let winner;
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
    if(gameOn == false){
        winner = playerTurn;
    }
}

function createPlayer(name) {
    let counter = 0;
    return {
        name,
        incrementCounter: () => counter++,
        resetCounter: () => counter = 0,
    }
}
