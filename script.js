const boardCell = document.getElementsByClassName('board-cell')
const button = document.getElementById('button')
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
const getPlayer1Name = document.getElementById("viewPlayer1Name")
const getPlayer2Name = document.getElementById("viewPlayer2Name")
const buttonNewGame = document.getElementById("buttonNewGame")
const scoreBoard = document.getElementById('score')
const playerStatsDiv1 = document.getElementById('p1')
const playerStatsDiv2 = document.getElementById('p2')
const audio = document.getElementById('audio')
audio.volume = 0.1


const playerImage1 = new Image();
playerImage1.src = 'character11.png'

const playerImage2 = new Image();
playerImage2.src = 'character22.png'

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
        name: 'stand',
        frames: 4
    },
    {
        name: 'attack',
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
    if(player1Action == 'damage')slowFrames = 23
    ctx.clearRect(0,0, canvas_width, canvas_height)
    
    let position = Math.floor(gameFrame/slowFrames) % spriteAnimations[player1Action].loc.length;
    
    let frameX = sprite_width*position;
    let frameY = spriteAnimations[player1Action].loc[position].y
    ctx.drawImage(playerImage1, frameX, frameY, sprite_width, sprite_height, 0, 0, 3*sprite_width, 3*sprite_height)
    if(player1Action == 'attack' && position == 3)player1Action = 'stand';
    if(player1Action == 'damage' && position == 2){player1Action = 'stand';slowFrames = 15}
    gameFrame++
    if(player1Action == 'death' && position == 4){
    }else{
        requestAnimationFrame(animate)
    }
    
}

function animate2(){
    if(player2Action == 'damage')slowFrames = 23
    ctx2.clearRect(0,0, canvas_width2, canvas_height2)
    let position = Math.floor(gameFrame2/slowFrames) % spriteAnimations[player2Action].loc.length;
    let frameX = sprite_width*position;
    let frameY = spriteAnimations[player2Action].loc[position].y
    ctx2.drawImage(playerImage2, frameX, frameY, sprite_width, sprite_height, -15, 10, 3*sprite_width, 3*sprite_height)
    if(player2Action == 'attack' && position == 3) player2Action = 'stand'
    if(player2Action == 'damage' && position == 2){ player2Action = 'stand'; slowFrames = 15}
    gameFrame2++
    if(player2Action == 'death' && position == 4){
        
    }else{
        requestAnimationFrame(animate2)
    }
    console.log(player2Action)
}
animate()
animate2()

button.addEventListener('click', e => {
    e.preventDefault();
    createGame(player1Name.value, player2Name.value);
    removeForm()
    moveBoard()
    addMusic()
})


Array.from(boardCell).forEach(element => {

    element.dataset.index = Array.from(boardCell).indexOf(element);
    element.addEventListener('click', e => {
        receiveDataFromPlay(element.dataset.index)
    })
});

buttonNewGame.addEventListener('click', e =>{
    e.preventDefault();
    buttonNewGame.style.visibility = 'hidden'
    Array.from(boardCell).forEach(element => {
        element.innerHTML = '';
    });
    if(player1.showCounter() == 3 || player2.showCounter() == 3) resetGame();
    gameOn = true;
    gameboardStats = [
        [,,,],
        [,,,],
        [,,,]
    ]
    
})

let gameOn = false;
let playerSelector = 'X'
let playCounter = 0;
let gameboardStats = [
    [,,,],
    [,,,],
    [,,,]
];

let player1;
let player2;

function addMusic(){
    audio.setAttribute('src', 'backgroundMusic.mp3')
}

function createGame(namePlayer1, namePlayer2) {
    player1 = createPlayer(namePlayer1)
    getPlayer1Name.innerText = namePlayer1;
    player2 = createPlayer(namePlayer2)
    getPlayer2Name.innerText = namePlayer2;
    gameOn = true;
}

function resetGame(){
    player1Action = 'stand'
    player2Action = 'stand'
    if(player1.showCounter() == 3) animate2()
    if(player2.showCounter() == 3) animate()
    player1.resetCounter();
    player2.resetCounter();
    scoreBoard.innerText = `${player1.showCounter()} x ${player2.showCounter()}`
}

function moveBoard(){
    gameboard.className = 'animationGameboard'
    playerStatsDiv1.classList.add('animationGameboard')
    playerStatsDiv2.classList.add('animationGameboard')
    scoreBoard.classList.add('animationGameboard')
}

function removeForm(){
    form.className = 'animationForm'
    setTimeout(() => {
        playerInput.remove()
    }, 1000);
}

function receiveDataFromPlay(boardCellClicked) {
    if (gameOn == true) playRound(boardCellClicked)
}

function showIconsOnTheBoard(player, boardCellClicked) {
   
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

function checkEndRound(player){
    playCounter++;
    if(gameboardStats[0][0] == player && gameboardStats[0][1] == player && gameboardStats[0][2] == player) gameOn = false;
    else if(gameboardStats[1][0] == player && gameboardStats[1][1] == player && gameboardStats[1][2] == player) gameOn = false;
    else if(gameboardStats[2][0] == player && gameboardStats[2][1] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][0] == player && gameboardStats[1][0] == player && gameboardStats[2][0] == player) gameOn = false;
    else if(gameboardStats[0][1] == player && gameboardStats[1][1] == player && gameboardStats[2][1] == player) gameOn = false;
    else if(gameboardStats[0][2] == player && gameboardStats[1][2] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][0] == player && gameboardStats[1][1] == player && gameboardStats[2][2] == player) gameOn = false;
    else if(gameboardStats[0][2] == player && gameboardStats[1][1] == player && gameboardStats[2][0] == player) gameOn = false;
    console.log(playCounter)
    if(playCounter == 9 && gameOn == true){
        gameOn = false
        return true //draw
    }else{
        return false
    }
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
    
    let draw = checkEndRound(playerTurn)
    console.log(draw)
    if(gameOn == false && draw == true){
        winner = 'draw'
        endRound(winner);
    }
    else if(gameOn == false){
        winner = playerTurn;
        endRound(winner);
    }
    checkEndGame();
}

function checkEndGame(){
    if(player1.showCounter() == 3){
        gameFrame2 = 0
        gameFrame = 0
        player2Action = 'death'
    }else if(player2.showCounter() == 3){
        gameFrame2 = 0
        gameFrame = 0
        player1Action = 'death'
    }
}

function playSoundEffect(){
    let audio = document.createElement('audio')
    audio.src = 'hitSound.mp3'
    audio.volume = 0.2
    audio.play()
}

function endRound(winner){
    
    if(winner == 'O'){
        gameFrame = 0
        gameFrame2 = 0
        player1Action = 'attack'
        player2Action = 'damage'
    }else if(winner == 'X'){
        gameFrame2 = 0
        gameFrame = 0
        player1Action = 'damage'
        player2Action = 'attack'
    }
    playSoundEffect();
    playCounter = 0;
    buttonNewGame.style.visibility = 'visible'
    incrementScore(winner)
}

function incrementScore(winner){
    if(winner == 'O'){
        player1.incrementCounter()
    }else if(winner == 'X'){
        player2.incrementCounter()
    }
    scoreBoard.innerText = `${player1.showCounter()} x ${player2.showCounter()}`
}

function createPlayer(name) {
    let counter = 0;
    return {
        name,
        incrementCounter: () => counter++,
        resetCounter: () => counter = 0,
        showCounter: () => counter,
    }
}

