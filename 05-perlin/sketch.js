// Perlin Noise Demo
// moving a circle

let time = 0;
let deltaTime = 0.01;
let x;
let y;
let X_OFFSET;
let Y_OFFSET;

function setup() {
  X_OFFSET = random(999);
  Y_OFFSET = random(999);

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(220);

  fill("black");
  x = noise(X_OFFSET + time) * width;
  y = noise(Y_OFFSET + time) * height;

  circle(x, y, 50);
  time += deltaTime;
}
