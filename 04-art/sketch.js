// Generative Art Demo
// Using Object Notation and Arrays

let some_line;
let row = [];
const LINE_SIZE = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < width; i+= LINE_SIZE) {
    for (let v = 0; v < height; v += LINE_SIZE) {
      row.push(spawnLine(i + LINE_SIZE/2, v, LINE_SIZE));
    }
    
  }
  
  
}

function draw() {
  background(220);
  for (let some_line of row) {
    line(some_line.x1, some_line.y1, some_line.x2, some_line.y2);
  }
  
}

function spawnLine(x, y, the_size) {
  let the_line;

  let choice = random(100);
  if (choice < 50) {
    //neg slope
    the_line = {
      x1: x-the_size/2,
      y1: y-the_size/2,
      x2: x+the_size/2,
      y2: y+the_size/2,
    };
  }
  else {
    //pos slope
    the_line = {
      x1: x+the_size/2,
      y1: y-the_size/2,
      x2: x-the_size/2,
      y2: y+the_size/2,
    };
  }
  return the_line;
}
