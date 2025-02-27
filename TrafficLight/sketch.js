// Traffic Light Demo
// Laeron Lewis
// February 27
// 

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

current_state = "red";



function setup() {
  createCanvas(600, 600);
}



function draw() {
  background(255);
  drawOutlineOfLights();
  ChangeLight(current_state);
}

time_waited = 0;
last_change = 0;
green_time = 5;
yellow_time = 2;
red_time = 5;

function ChangeLight(state) {
  time_waited = millis();
  if (state === "green") {
    if (last_change + green_time*1000 < time_waited) {
      last_change = millis();
      current_state = "yellow";
    }
  }
  else if (state === "yellow"){
    if (last_change + yellow_time*1000 < time_waited) {
      last_change = millis();
      current_state = "red";
    }
  } 
  else if (state === "red"){
    if (last_change + red_time*1000 < time_waited) {
      last_change = millis();
      current_state = "green";
    }
  } 
  
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(current_state === "red" ? current_state : 255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(current_state === "yellow" ? current_state : 255);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(current_state === "green" ? current_state : 255);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom

}