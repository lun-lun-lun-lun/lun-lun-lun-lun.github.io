// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize = 100;
let grid = [];
let MAX_WIDTH;
let MAX_HEIGHT;

function setup() {
  createCanvas(windowWidth, windowHeight);
  MAX_WIDTH = Math.floor(windowWidth/cellSize) ;
  MAX_HEIGHT = Math.floor(windowHeight/cellSize) ;
  makeGrid(cellSize);
}

function draw() {
  background(220);
  
  drawGrid();
}

function keyPressed() {
  console.log(key);
  if (key === "r") {
    cellSize = random(10,200);
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid();
  }
  
}

function makeGrid(cellSize) {
  grid = [];
  for (let y = 0; y < MAX_HEIGHT; y++) {
    grid.push([]);
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      let r = random(100) > 50 ? 0 : 1;
      grid[y].push(r);
      
    }
  }
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
