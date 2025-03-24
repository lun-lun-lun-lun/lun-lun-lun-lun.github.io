// 2D Grid Neighbors Demo
const SQUARE_DIMENSIONS = 10;
let MY_GRID;


let cellSize;



function setup() {
  
  let minimum = Math.min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);

  cellSize = minimum / SQUARE_DIMENSIONS;

  MY_GRID = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  
  if (key === "r") {
    grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
  if (key === "e") {
    grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
}
function mouseClicked() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  ToggleCell(x, y);
  ToggleCell(x, y+1);
  ToggleCell(x, y-1);
  ToggleCell(x+1, y);
  ToggleCell(x-1, y);
}

function ToggleCell(x, y) {
  if (MY_GRID[y] !== undefined && MY_GRID[y][x] !== undefined)  {
    MY_GRID[y][x] = MY_GRID[y][x] === 0 ? 1 : 0;
  }
  
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<rows; y++) {
    newGrid.push([]);
    for (let x = 0; x<cols; x++) {
      let rand = random(0,100) < 50 ? 1 : 0;
      newGrid[y].push(rand);
    }
  }
  return newGrid;
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<rows; y++) {
    newGrid.push([]);
    for (let x = 0; x<cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}
 
function displayGrid() {
  for (let y = 0;y<SQUARE_DIMENSIONS ;y++) {
    for (let x = 0;x<SQUARE_DIMENSIONS ;x++) {
      let color = MY_GRID[y][x] === 0 ? "White" : "Black";
      fill(color);
      rect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}