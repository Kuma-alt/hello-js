var bRow = 8;
var bCol = 7;

var board = [
[0, 0, 0, 2, 0, 0, 0],
[0, 0, 0, 2, 0, 0, 0],
[0, 0, 2, 4, 0, 0, 0],
[0, 2, 4, 3, 0, 0, 0],
[0, 4, 2, 5, 0, 0, 0],
[0, 2, 1, 2, 0, 0, 0],
[2, 3, 2, 2, 0, 0, 0],
[1, 1, 3, 5, 5, 0, 0]
];
var elBoard = document.querySelectorAll('table#move-the-box td');
var animationCounter = 0;
function boomH() {
    let Boom = false;
    for (let r=bRow-1; r>=0; r--){
        for (let c=0; c<bCol-1; c++){
            if (board[r][c]>0 ){
                let l=1;
                for (let cc=c+1; cc<bCol; cc++){
                    if (board[r][cc] != board[r][c] ){
                        break;
                    } 
                    l++; 
                }
                if ( l>2){
                    for ( let cc=c; cc<c+l; cc++){
                        board[r][cc] = 999;
                        Boom = true;
                    }
                }
            }
        }
    }
    return Boom;
}
function BoomV(){
    var Boom = false;
    for (let c=0; c<bCol; c++){
        for ( let r=bRow-1; r>0; r--){
            if (board[r][c]>0){
                let l=1;
                for (let rr=r-1; rr>=0; rr-- ){
                   if ( board[rr][c] != board[r][c]){
                       break;
                   }
                   l++;
                }
                if ( l>2 ){
                    for (let rr=r; rr>r-l; rr--){
                        board[rr][c] = 999;
                        Boom = true;
                    }
                }
            }
        }
    }
    return Boom;
}
function boom(){
    let bH = boomH();
    let bV = boomV();
    return (bH | bV);
}
function clearBoom(){
    for (let r=0; r<bRow; r++){
        for (let c=0; c<bCol; c++){
            if( board [r][c]==999){
                board[r][c] = 0;
            }
        }
    }
}
function gravitation(){
    for (let c = 0; c<bCol; c++) {
        for( let r=bRow-1; r>0; r--) {
            if (board[r][c] == 0 ){
                let rB = -1;
                for ( let r1=r-1; r1>=0; r1--) {
                    if ( board[r1][c] > 0 ){
                        rB = r1; break;
                    }
                }
                if ( rB > -1 ) {
                    board[r][c] = board[rB][c];
                    board[rB][c] = 0;
                    //moveBox([rB, c ], [r, c]);
                }
            }
        }
    }
}
function drawBoard() {
   // clearBoom();
   // gravitation();
   // while (animationCounter>0){};
   // let Boom = boom();
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
   // if (Boom){
      //  setTimeout( function(){ clearBoom();}, 500 );
   // }
}

var selBox=[];
function mouseOver(e) {
    //logs($(e.target).offset());
    //console.log(e.target.cellIndex  );
    //console.log( e.target.parentNode.rowIndex );
    let r = e.target.parentNode.rowIndex;
    let c = e.target.cellIndex;
    if (board[r][c]> 0){
            selBox = [ r, c ];
    }
}

function moveUp() {
    if ( selBox.length>0 && selBox[0]>0){
        let r = selBox[0];
        let c = selBox[1];
        if ( board[r-1][c] == 0 ) {
            board[r-1][c] = board[r][c];
            board[r][c] = 0;
        } else {
            let t = board[r][c];
            board[r][c] = board[c][c-1];
            board[r-1][c] = t;
        }
        selBox = [];
        drawBoard();
    }
}

function moveDown(){
    if ( selBox.length>0 && selBox[0]<bRow-1){
        let r = selBox[0];
        let c = selBox[1];
        if ( board[r+1][c] == 0 ) {
            board[r+1][c] = board[r][c];
            board[r][c] = 0;
        } else {
            let t = board[r][c];
            board[r][c] = board[c][c+1];
            board[r+1][c] = t;
        }
        selBox = [];
        drawBoard();
    }
}

function moveRight(){
    if ( selBox.length>0 && selBox[1]<bCol-1){
        let r = selBox[0];
        let c = selBox[1];
        if ( board[r][c+1] == 0 ) {
            board[r][c+1] = board[r][c];
            board[r][c] = 0;
        } else {
            let t = board[r][c];
            board[r][c] = board[c][c+1];
            board[r][c+1] = t;
        }
        selBox = [];
        drawBoard();
    }
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
function moveBox(s,d){
    let $S = $(
    $('#move-the-box')[0]
    .rows[ s[0] ]
    .cells[ s[1]]
    );              
//let $S = $(s);
let $D = $(
    $('#move-the-box')[0]
    .rows[ d[0] ]
    .cells[ d[1]]
);
let offS = $S.offset();   
let offD = $D.offset();
let $B = $S[0].className;
let $BOX = $('<div>')
  .addClass('box')
  .addClass( $B )
   .css( offS )
 .appendTo('body');
 $S[0].className='';
$BOX.animate( offD,1000,function() {
  $BOX.remove();
  $D[0].className = $B;
  animationCounter--;
});
}

drawBoard();
