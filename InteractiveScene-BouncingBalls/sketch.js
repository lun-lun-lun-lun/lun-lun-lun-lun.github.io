// Bouncing Balls
// Laeron Lewis
// February 26th, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// - classes/objects
// - framerate set
// - deltaTime shenaniganery such that it doesnt calculate wrong when you lag
// - scroll wheel input

let balls = [];
let current_ball_radius = 20;
let grabbed_ball;

let windowWidth = 400;
let windowHeight = 400;

let radius;




class Vector2 {
  constructor(x, y) { //, direction, power, weight, radius, name) {
    //direction is from 0 to 359.999, it is in degrees
    this.x = x;
    this.y = y;
    
  }
  get direction() {

  }
  CalcDirectionAngle(in_degrees) {
    // x/y = x_ratio
    let angle_radians = Math.atan2(y, x);
    let angle_degrees = angle_radians * 180 / Math.PI;
    x_ratio = this.x / this.y;

  }
  DoMath(operator, math_number) {
    if (operator === "*" || operator === "x") { 
      return new Vector2(this.x * math_number, this.y * math_number);
    }
    else if (operator === "+") {
      return new Vector2(this.x + math_number, this.y + math_number);
    }
    else if (operator === "-") {
      return new Vector2(this.x * math_number, this.y * math_number);
    }
    else if (operator === "/") {
      return new Vector2(this.x / math_number, this.y / math_number);
    }
    else if (operator === "^") {
      return new Vector2(this.x ^ math_number, this.y ^ math_number);
    }
    else if (operator === "%") { //remainder
      return new Vector2(this.x % math_number, this.y % math_number);
    }
  }
  
}


function DegreesToDirection(degrees) {

  let vector_x = Math.cos(degrees);
  let vector_y = Math.sin(degrees);
  

  vector = new Vector2( vector_x, vector_y );
  
}



class Ball {
  constructor(x, y, velocity, weight, radius, name) {
    this.x_pos = typeof x === "undefined" ? windowWidth/2 : x;
    this.y_pos = typeof y === "undefined" ? windowHeight/2 : y;

    this.velocity = velocity;

    this.radius = typeof radius === "undefined" ? 25 : radius;
    this.diameter = radius * 2;
    this.weight = typeof weight === "undefined" ? this.diameter * 10 : weight;
    this.name = typeof name === "undefined" ? "gilbert" : name;
    this.time_existed = 0;
    this.noBounce = false;
    
    //                [x,y]
    this.total_velo = new Vector2(0,0);
  }

  dragBall() {
    console.log("drag me");
  }

  applyForce() {
    console.log("add the function later");
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  frameRate(60);
}

//resize balls if you use up or down keys
function updateBallSize() {
  
  
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      current_ball_radius += 0.35;
    } 
    else if (keyCode === DOWN_ARROW) {
      current_ball_radius -= 0.35;
    }
  }
}

function checkColliding(ball) {
}

function updateBallPosition(ball) {
  
  
  //update velocity in the x
  
  
}

//draw the balls on the screen
function drawBalls() {
  
  for (let ball of balls) {
    
    //colors and outlines
    fill(255,30,48, 255);
    stroke("black");
    
    ball.time_existed += deltaTime/1000;
    circle(ball.x_pos, ball.y_pos, ball.diameter);

    
    updateBallPosition(ball);
    checkColliding(ball);
  }
}

function draw() {
  background(220);
  
  fill(25,30,40,50);
  noStroke();
  circle(mouseX, mouseY, current_ball_radius*2);
  
  
  //draw each ball at their respective positions
  
  // if (keyIsDown(87)) {
  //   let ball_name = "ball_" + balls.length.toString();
  //   spawnBall(mouseX, mouseY, 0, 0, 200, current_ball_radius, ball_name);
  // }
  drawBalls();
  
  updateBallSize(); 
}

function spawnBall(x_pos, y_pos, x_velo, y_velo, weight, radius, name) {

  //make a new ball
  balls.push(new Ball(x_pos, y_pos, x_velo, y_velo, weight, radius, name));
}

function keyPressed() {

  if (key === "e") {
    let ball_name = "ball_" + balls.length.toString();
    spawnBall(mouseX, mouseY, 0, 10, 200, current_ball_radius, ball_name);
    //make a ball
  }
  if (key === "r") {
    //reset the scene
  }
  
}

function mouseClicked() {
  //grab the balls if the mouse  is over one of them
  //if mouse over ball pos and radius then grabbed_ball will be the ball
}