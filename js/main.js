/*----- constants -----*/
const colors = {
    '0': '#220070',
    '1': '#E200F7',
    '-1': '#FF901B'
  };
  
  
  /*----- app's state (variables) -----*/
  let board;  
  let turn;
  
  
  /*----- cached element references -----*/
  const markerEls = [...document.querySelectorAll('#markers > div')];
  
  
  /*----- event listeners -----*/
  document.getElementById('markers').addEventListener('click', handleDrop);
  
  
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
            cellEl.style.backgroundColor = colors[cellVal];     
      });
           });
    renderMarkers();
  }
  
  function renderMarkers(){
    markerEls.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
      
    });
  }
  
  function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if(colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    render();
  }



