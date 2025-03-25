// Conway's Game of Life

let cellSize = 30;
let grid = [];
let MAX_WIDTH;
let MAX_HEIGHT;

function setup() {
  createCanvas(windowWidth, windowHeight);
  MAX_WIDTH = Math.floor(windowWidth/cellSize) ;
  MAX_HEIGHT = Math.floor(windowHeight/cellSize) ;
  makeGrid(true);
}

function draw() {
  background(220);
  grid = updateGrid();
  drawGrid();
}

function CheckCell(x, y) {
  return grid[y][x] !== undefined ? grid[y][x] : undefined;
}

function CheckCellZero(x, y) {
  return grid[y][x] !== undefined ? grid[y][x] : 0;
}

function ToggleCell(x, y) {
  if (CheckCell(x,y) !== undefined) {
    grid[y][x] = grid[y][x] === 0 ? 1 : 0;
  }
  return grid[y][x] !== undefined ? grid[y][x] : undefined;
}

function updateGrid() {
  let nextTurn = makeGrid(true);

  for (let y = 0; y< MAX_HEIGHT; y++) {
    for (let x = 0; x<MAX_WIDTH; x++) {
      //dont count self as neighbor
      let neighbors = 0 - grid[y][x];
      for (let i = -1; i<= 1; i++) {
        for (let j = -1; j<= 1; j++) {
          neighbors += CheckCellZero(x, y);
        }
      }
      if (grid[y][x] === 1) {
        if (2 <= neighbors <= 3) {
          nextTurn[y][x] = 1;
        } 
        else  {
          nextTurn[y][x] = 0;
        };
      } 
      else {
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        } 
        else {
          nextTurn[y][x] = 0;
        }
      }

      return nextTurn;
     
      

      //CheckRules2(x, y);
    }
  }
}

function CheckRules2(x, y) {
  let neighbors = 0;
  for (let ry = y-1; y<y+1; y++) {
    for (let rx = x-1; x<x+1; x++) {

    }
  }
}

function UpdateGrid2() {
  for (let y = 0; y < MAX_HEIGHT; y++) {
    grid.push([]);
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      //grid[y][x];
      
    }
  }
}

function keyPressed() {
  console.log(key);
  if (key === "r") {
    //cellSize = 30;
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid(false);
  }
  if (key === "n") {
    //cellSize = 30;
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid(false);
  }
  if (key === "c") {
    //cellSize = 30;
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid(true);
  }
  
}

function makeGrid(clear) {
  grid = [];
  for (let y = 0; y < MAX_HEIGHT; y++) {
    grid.push([]);
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      let r = random(100) > 95 && clear === false ? 1 : 0;
      grid[y].push(r);
      
    }
  }
}

function mouseClicked() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  ToggleCell(x, y);
  // ToggleCell(x, y+1);
  // ToggleCell(x, y-1);
  // ToggleCell(x+1, y);
  // ToggleCell(x-1, y);
}

function drawGrid() {
  for (let y = 0; y < MAX_HEIGHT; y++) {
    
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      colour = grid[y][x] === 0 ? 255 : 1;
      fill(colour);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
