/*----- constants -----*/



/*----- app's state (variables) -----*/
let board;  
let turn;


/*----- cached element references -----*/



/*----- event listeners -----*/



/*----- functions -----*/
init();

function init( ) {
board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
turn = 1;
render();
}

function render( ) {
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
       
    });
        
    });
}