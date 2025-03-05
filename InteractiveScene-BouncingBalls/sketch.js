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
// - arrays (i knew it before i promise :broken_heart:)

let window_width = 400;
let window_height = 400;

let cooldown = 1
let time_waited = 0
let last_change = 0

let balls = [];
let mouse_ball_radius = 20;
const size_increment = 1.3;
const MINIMUM_SIZE = 5;
const MAXIMUM_SIZE = window_height <= window_width ? window_height/2.2 : window_width/2.2;

const GRAVITY = 5.3;
const FRAMERATE = 60;

let grabbed_ball;
let click_held = false;

let commands = {
  ["e"]: MakeNewBall,
  ["r"]: ResetScene,
  ["ArrowUp"]: IncreaseBallSize,
  ["ArrowDown"]: DecreaseBallSize,
  ["ClickHeld"]: Grab,
  ["ClickReleased"]: LetGo,
};

/**
 * Grabs a ball if it overlaps with the cursor.
 */
function Grab() {
}
/**
 * Releases any grabbed balls.
 */
function LetGo() {
}



/**
 * Removes all balls and returns setting to default.
 */
function MakeNewBall() {

  time_waited = millis()/1000

  if (time_waited >= last_change + cooldown ) {
    console.log("success!")
    last_change = time_waited


    let x = mouseX
    let y = mouseY
    let position = new Vector2( x , y )
    let velocity = new Vector2( random(-20,20) , random(-20,20) )
    //generate a unique name for eacdh ball
    let name = "ball_" + balls.length.toString();
  
    //if i was making something that isnt a school project i wouldnt do it like this
    //adds a new ball to the list of balls
    balls.push( new Ball( position, velocity, mouse_ball_radius, name ) );
    console.log("made")
  }
 
}



/**
 * Removes all balls and returns setting to default.
 */
function ResetScene() {
}


//the way i did this feels wrong,

/**
 * Changes the size of the ball that will be spawned by increment.
 * @param {number} increment the change in size.
 */
function ChangeBallSize(increment) {

  
  let new_size = mouse_ball_radius + increment;
  let reasonable_size = new_size > MINIMUM_SIZE && new_size < MAXIMUM_SIZE;

  //check that the size of the ball isnt way big or too small 
  if (reasonable_size) {
    mouse_ball_radius = new_size;
  } 
  else {
    console.log("No big balls or small balls.");
  }
}
function IncreaseBallSize() {
  ChangeBallSize(size_increment);
}
function DecreaseBallSize() {
  ChangeBallSize(-size_increment);
}



/**
 * If a key is pressed this frame, do the function associated with that key.
 */
function CheckInputs() {
  
  
  if (keyIsPressed === true) {
    if (key in commands) {
      commands[key]();
    }
    
  }
  //mouse specific (annoying)
  if (mouseIsPressed === true && click_held === false) {
    click_held = true;
    commands["ClickHeld"]();
    console.log("held")
  }
  else if (mouseIsPressed === false && click_held === true) {
    click_held = false;
    commands["ClickReleased"]();
    console.log("released")
  }
}





/**
 * Converts degrees into a an array of X and Y.
 * @param {number} degrees the angle in degrees
 * @returns { [number, number] } the x and y.
 * Recommended you let [x, y] = this_func
 */
function DegreesToVectors(angle_degrees) {


  let angle_radians = degrees * Math.PI/180;
  let vector_x = Math.cos(angle_radians);
  let vector_y = Math.sin(angle_radians);
  
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
    this.angle = Math.acos(this.x);
  }

  /**
 * Returns the direction angle of itself, Vector2.
 * @returns {number} The angle, in degrees.
 */

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
 * @param {{["x"]: number, ["y"]: number}} old_direction The 
 * If you want to go in the opposire direction, dir should be this.angle + 180
 */
  ChangeDirection(new_direction) {

    //get direction that the new vector will be in
    let strength = this.x/this.angle;
    let [new_x, new_y] = DegreesToVectors(new_direction);
    this.x = new_x * strength;
    this.y = new_y * strength;
  }
  
}








class Ball {
  constructor(position, velocity, radius, name) {


    this.position = position;
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
  createCanvas(window_width, window_height);
  frameRate(60);
}



function CheckColliding(ball) {
}

function UpdateBallVelocity(ball) {
  
  
  //update velocity in the x
  for (let ball of balls) {

    ball.velocity.y -= GRAVITY
  }
  
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
    circle(ball.position.x, ball.position.y, ball.diameter);
  }
}

function draw() {
  background(220);
  fill(25,30,40,50);
  noStroke();
  
  UpdateBallVelocity();
  UpdateBallPosition();
  DrawBalls();


  CheckInputs();
  //circle(mouseX, mouseY, mouse_ball_radius*2);
}

