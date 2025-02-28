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
// - docstrings

let balls = [];
let mouse_ball_radius = 20;
let grabbed_ball;

let windowWidth = 400;
let windowHeight = 400;

let radius;
const gravity = 5.3;


/**
 * Converts degrees into a an array of X and Y.
 * @param {number} degrees the angle in degrees
 * @returns { [number, number] } the x and y.
 * Recommended you let [x, y] = this_func
 */
function DegreesToVectors(degrees) {

  let vector_x = Math.cos(degrees);
  let vector_y = Math.sin(degrees);
  
  return [vector_x, vector_y];
  
}


/**
 * Has an x and y vector.
 * @class
 */
class Vector2 {
  constructor(x, y) { //, direction, power, weight, radius, name) {
    //direction is from 0 to 359.999, it is in degrees
    this.x = x;
    this.y = y;
    
  }

  /**
 * Returns the direction angle of itself, Vector2.
 * @returns {number} The angle, in degrees.
 */
  get angle() {
    let angle_radians = Math.atan2(y, x);
    let angle_degrees = angle_radians * 180 / Math.PI;

    return return_degrees ? angle_degrees : angle_radians;
  }

  /**
 * Does the math you specify on X AND Y of the Vector2.
 * @param {"*"|"x"|"+"|"-"|"/"|"^"|"%"} operator The operation you want to perform.
 * @param {number} math_number The number you want to do it with.
 */
  MathSelf(operator, math_number) { //there has to be a better way to do this :sob:
    if (operator === "*" || operator === "x") { 
      this.x *= math_number; this.y * math_number;
    }
    else if (operator === "+") {
      this.x += math_number; this.y += math_number;
    }
    else if (operator === "-") {
      this.x -= math_number; this.y -= math_number;
    }
    else if (operator === "/") {
      this.x -= math_number; this.y -= math_number;
    }
    else if (operator === "^") { //exponent
      this.x ^= math_number; this.y ^= math_number;
    }
    else if (operator === "%") { //remainder
      this.x ^= math_number; this.y ^= math_number;
    }
  }


  /**
 * Change the direction of the vector, while keeping the power the same.
 * @param {number} direction The operation you want to perform.
 * If you want to go in the opposire direction, dir should be this.angle + 180
 */
  ChangeDirection(direction) {

    //get direction that the new vector will be in
    let [new_x, new_y] = DegreesToVectors(direction);


    let strong_old_x = this.x;
    let old_angle = this.angle;
    let [angle_x, _] = DegreesToVectors(multiplied_angle);
    let old_strength = multiplied_x/angle_x;

    //multiply the new vector by the strength of the old vector
    this.x = new_x; this.y = new_y; 
    this.MathSelf("*", old_strength);
  }
  
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
function UpdateMouseBall() {
  
  
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      mouse_ball_radius += 0.35;
    } 
    else if (keyCode === DOWN_ARROW) {
      mouse_ball_radius -= 0.35;
    }
  }
}

function checkColliding(ball) {
}

function updateBallPosition(ball) {
  
  
  //update velocity in the x
  
  
}

/**
 * Draws all the balls onto the screen
 * Returns nothing
 */
function DrawBalls() {
  
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
  circle(mouseX, mouseY, mouse_ball_radius*2);
  DrawBalls();
  UpdateMouseBall();
  UpdateBallVelocity();


  //draw each ball at their respective positions
  
  // if (keyIsDown(87)) {
  //   let ball_name = "ball_" + balls.length.toString();
  //   spawnBall(mouseX, mouseY, 0, 0, 200, mouse_ball_radius, ball_name);
  // }
  
  
  
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