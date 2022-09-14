const boardCell = document.getElementsByClassName('board-cell')
console.log(boardCell);

Array.from(boardCell).forEach(element => {
    element.dataset.index = Array.from(boardCell).indexOf(element);
    console.log(element.dataset.index);
    element.addEventListener('click', e =>{
        receiveDataFromPlay(element.dataset.index)
    })
});

function receiveDataFromPlay(boardCellClicked){
    console.log(boardCellClicked);
}
function showIconsOnTheBoard(){

}