// Terrain Generation Demo

let terrain = [];
let TOTAL_RECTS;


function setup() {
  
  createCanvas(windowWidth, windowHeight);
  TOTAL_RECTS = windowWidth;

}

function draw() {
  background(220);
  stroke("green");
  fill("green");

  generateTerrain(1);
  for (let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function generateTerrain(widthOfRect) {
  let time = 0;
  let deltaTime = 0.001;

  for (let i = 0; i<TOTAL_RECTS; i++) {
    let height = noise(time + i*deltaTime) * 500;
    terrain.push(spawnRectangle(i*widthOfRect, height, widthOfRect));
  }
}


function spawnRectangle(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x: leftSide,
    y: height-rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  
  return theRect;
}
