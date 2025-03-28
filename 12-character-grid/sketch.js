// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let cellSize = 30;
let grid = [];
let MAX_WIDTH;
let MAX_HEIGHT;

const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let thePlayer = {
  x: 0,
  y: 0,
};


let grassImage;
let pathImage;
function preload() {
  grassImage = loadImage("grass.png");
  pathImage = loadImage("paving.png");
}

function setup() {
  createCanvas(windowWidth*0.8, windowHeight*0.8);
  MAX_WIDTH = Math.floor(windowWidth/cellSize) ;
  MAX_HEIGHT = Math.floor(windowHeight/cellSize) ;
  makeGrid(cellSize);


  //add the player to the grid
  
}

function draw() {
  background(220);
  
  drawGrid();
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function move(x_move,y_move) {
  let next_x = thePlayer.x+x_move;
  let next_y = thePlayer.y+y_move;
  print(CheckCell(next_x,next_y));
  if (CheckCell(next_x,next_y)) {
    if (grid[next_y][next_x] !== IMPASSIBLE) {
      grid[thePlayer.y][thePlayer.x] = OPEN_TILE;
      thePlayer.x = next_x;
      thePlayer.y = next_y;
    }
  }
  
}

function keyPressed() {
  console.log(key);
  if (key === "r") {
    //cellSize = random(10,200);
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid(false);
  }
  if (key === "e") {
    //cellSize = random(10,200);
    MAX_WIDTH = Math.ceil(windowWidth/cellSize) ;
    MAX_HEIGHT = Math.ceil(windowHeight/cellSize) ;
    makeGrid(true);
  }

  if (key === "w") {
    //cellSize = random(10,200);
    move(0,-1);
  }
  if (key === "s") {
    //cellSize = random(10,200);
    move(0,1);
  }
  if (key === "a") {
    //cellSize = randdom(10,200);
    move(-1,0);
  }
  if (key === "d") {
    //cellSize = random(10,200);
    move(1,0);
  }
  
}

function makeGrid(empty) {
  grid = [];
  for (let y = 0; y < MAX_HEIGHT; y++) {
    grid.push([]);
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      let r = random(100) > 10 || empty? OPEN_TILE : IMPASSIBLE;
      grid[y].push(r);
      
    }
  }
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function CheckCell(x,y) {
  return grid[y] !== undefined && grid[y][x] !== undefined;
}

function ToggleCell(x, y) {
  if (CheckCell(x,y))  {
    grid[y][x] = grid[y][x] === OPEN_TILE ? IMPASSIBLE : OPEN_TILE;
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



function drawGrid() {
  for (let y = 0; y < MAX_HEIGHT; y++) {
    
    for (let x = 0; x< MAX_WIDTH; x++ ) {
      if (grid[y][x] === OPEN_TILE) {
        image(pathImage, x*cellSize, y*cellSize, cellSize, cellSize);
      } 
      else if (grid[y][x] === IMPASSIBLE) {
        image(grassImage, x*cellSize, y*cellSize, cellSize, cellSize);
      } 
      else if (grid[y][x] === PLAYER){
        fill("red");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
        //image(grassImage, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // colour = grid[y][x] === OPEN_TILE ? 255 : IMPASSIBLE;
      // colour = grid[y][x] === PLAYER ? "red" : colour;
      
      
    }
  }
}
