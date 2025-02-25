// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let some_time = 2000; //millis
// let time_interval = 4;

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   // console.log(millis()/1000    )
  
  
//   if (millis()/1000 % (time_interval*2) < time_interval) {
//     background("white")
//   }
//   else {
//     background("black")
//   }
// }


let wait_time = 2000;
let last_switched_time = 0;
let is_white = true;

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  SwapStateIfNeeded();
  ShowBackground();
}

function SwapStateIfNeeded() {
  if (millis() > last_switched_time + wait_time) {
    is_white = !is_white;
    last_switched_time = millis();
  }
}

function ShowBackground() {
  if (is_white) {
    background("white");
  } else {
    background("black");
  }
}