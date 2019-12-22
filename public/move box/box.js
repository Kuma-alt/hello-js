var bRow = 8;
var bCol = 7;

var board = [
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 0, 1, 0, 0]
];
var elBoard = document.querySelectorAll('table#move-the-box td');

function drawBoard() {
    for (let r=0; r < bRow; r++) {
        for ( let c=0; c < bCol; c++) {
            let i = bCol * r + c;
            if (board[r][c]==0){
                elBoard[i].className = '';
            }else{
                elBoard[i].className = 'box-' + board[r][c];
            }
        }
    }
}

var selBox=[];
function boardClick(e) {
    //console.log(e.target.cellIndex  );
    //console.log( e.target.parentNode.rowIndex );
    let r = e.target.parentNode.rowIndex;
    let c = e.target.cellIndex;
    if (board[r][c]> 0){
            selBox = [ r, c ];
    }
}

function moveUp() {
}
function moveDown(){
}
function moveRight(){
}
function moveLeft(){
    if ( selBox.length>0 && selBox[1]>0){
        let r = selBox[0];
        let c = selBox[1];
        if ( board[r][c-1] == 0 ) {
            board[r][c-1] = board[r][c];
            board[r][c] = 0;
        } else {
            let t = board[r][c];
            board[r][c] = board[c][c-1];
            board[r][c-1] = t;
        }
        selBox = [];
        drawBoard();
    }
}

drawBoard();