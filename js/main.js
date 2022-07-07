/*----- constants -----*/
const COLORS = {
  '1':  'Cyan',
  '-1': 'Fuchsia',
  '0': "rgba(0, 0, 0, 0)"
};

// /*----- app's state (variables) -----*/
let board; 
let turn; 
let gameStatus; 
let winner = null;

 
// /*----- cached element references -----*/
const markerEls = [...document.querySelectorAll("#markers > div")];
const replayBtn = document.querySelector("button");
const messageEl = document.querySelector("h2");


// /*----- event listeners -----*/
document.getElementById("markers").addEventListener("click",  handleChoice);
replayBtn.addEventListener("click", init);

/*----- functions -----*/


init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]    
    turn = 1; 
    gameStatus = null;
    render();  
    winner = null; 
}; 

function render() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);   
            cellEl.style.backgroundColor = COLORS[cellVal];           
        });
    });
    renderMessage();
    renderMarkers();
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden'; 
};

function handleChoice(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1 || winner === true) return;
    const colArr = board[colIdx]; 
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn; 
    winner = checkWin(colIdx,rowIdx);
    renderMessage();
    turn *= -1;
    gameStatus = getGameStatus();
    render();
    
};
function renderMessage(){
    if (gameStatus === null && turn === 1) {
        messageEl.innerHTML = `Player 1's Turn!`;
    } else if (gameStatus === null && turn === -1) {
        messageEl.innerHTML = `Player 2's Turn!`;
    } else if (gameStatus === 't') {
        messageEl.innerHTML = `Tie Game! Play again!`;
    } else if (gameStatus === 'w' && turn === -1) {
        messageEl.innerHTML = ` Player 1 Wins! Rematch?`; 
    } else if (gameStatus === 'w' && turn === 1) { 
        messageEl.innerHTML = ` Player 2 WINS! Rematch?`;
    }
}


function checkWin(colIdx, rowIdx) {
        const player = board[colIdx][rowIdx];
        return checkVertWin(colIdx, rowIdx, player) || 
        checkHorzWin(colIdx, rowIdx) ||
        checkDiagWinLeft(colIdx, rowIdx) ||
        checkDiagWinRight(colIdx, rowIdx);
};


function checkVertWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;

    rowIdx--;
    while (colArr[rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }    
    return count === 4 ? winner = true : null; 
};
    
function checkHorzWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1; 
    let idx = colIdx + 1; 
    
    while (idx < board.length && board[idx][rowIdx] === player) { 
        count++; 
        idx++; 
    }
    
    idx = colIdx - 1; 
    while (idx >= 0 && board[idx][rowIdx] === player) {
        count++; 
        idx--; 
    } 
    return count >= 4 ? winner = true : null;
};


function checkDiagWinLeft(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1;
    let idx1 = colIdx - 1; 
    let idx2 = rowIdx + 1;  
    
    while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === player) {
        count++; 
        idx1--;
        idx2++;
    }
    
    idx1 = colIdx + 1;
    idx2 = rowIdx - 1;
    while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
        count++;
        idx1++;
        idx2--; 
    }
    return count >= 4 ? winner = true : null;  
};
function checkDiagWinRight(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    let count = 1;
    let idx1 = colIdx + 1; 
    let idx2 = rowIdx + 1;  
    
    while (idx1 < board.length && idx2 < board[0].length && board[idx1][idx2] === player) {
        count++; 
        idx1++;
        idx2++;
    }

    idx1 = colIdx - 1;
    idx2 = rowIdx - 1;
    while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === player) {
        count++;
        idx1--;
        idx2--; 
    }
    return count >= 4 ? winner = true : null; 
};
       
function getGameStatus() {
    let flatBoard = board.flat(2); 
    if (!flatBoard.includes(0)) return 't'; 
    if (winner === true) return 'w'; 
    return null;
};

function renderMarkers () {
    markerEls.forEach(function(markerEl, colIdx) {
       markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden'; 
       markerEl.style.visibility = gameStatus === 'w' ? 'hidden' : 'visible';
    });
 
};

