function boomH() {
    let Boom = [];
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
                       // board[r][cc] = 999;
                       Boom.push([r,cc]);
                    }
                }
            }
        }
    }
    return Boom;
}
function boomV(){
    let Boom = [];
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
                       Boom.push([rr,c])
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
    
    //return (bH || bV);
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
