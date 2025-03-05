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
//grabbing balls didnt get added, or ball to ball collisions, sadly
let window_width = 400;
let window_height = 400;

let cooldown = 0.05;
let time_waited = 0;

let last_change = 0;

let balls = []; 
let mouse_ball_radius = 20;
const size_increment = 1.3;
const MINIMUM_SIZE = 5;
const MAXIMUM_SIZE = window_height <= window_width ? window_height/2.2 : window_width/2.2;

const GRAVITY = 9;
const COLLISION_DEGRADE = 0.7;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  //min gives smallest of the two numbers
  MAXIMUM_SIZE = min(w, h) / 2.2;
  frameRate(FRAMERATE);
}

function mouseWheel(event) {
  ChangeBallSize(event.delta > 0 ? -size_increment : size_increment)
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
    let velocity = new Vector2( random(-300,300) , random(-300,300) )
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
    this.angle = Math.atan2(y, x);
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
  //doesnt work, dont use
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
  createCanvas(windowWidth, windowHeight);
  frameRate(FRAMERATE);
}

function UpdateBallVelocity(ball) {
  
  for (let ball of balls) {

    ball.velocity.y -= GRAVITY
  }
  
}

function UpdateBallPosition() {
  
  for (let ball of balls) {

    ball.position.x = ball.position.x - ( ball.velocity.x * (deltaTime/1000) );
    ball.position.y = ball.position.y - ( ball.velocity.y * (deltaTime/1000) );
  }
  
}

function CheckCollisions() {
  
  for (let ball of balls) {
    CheckCollisionsWall(ball)
    
  }
  
}


function CheckCollisionsWall(ball) {



  //hit right or left wall, so we know its an x axis collision
  if (ball.position.x - ball.radius <= 0)  {
    ball.position.x = ball.radius;
    ball.velocity.x *= COLLISION_DEGRADE * -1;
  }
  if (ball.position.x + ball.radius >= windowWidth)  {
    ball.position.x = windowWidth - ball.radius;
    ball.velocity.x *= COLLISION_DEGRADE * -1;
  }
  
  //hit right or left wall, so we know its a y axis collision
  if (ball.position.y - ball.radius <= 0)  {
    ball.position.y = ball.radius;
    ball.velocity.y *= COLLISION_DEGRADE * -1;
  }
  if (ball.position.y + ball.radius >= windowHeight)  {
    ball.position.y = windowHeight - ball.radius;
    ball.velocity.y *= COLLISION_DEGRADE * -1;
  }
}

//I have quickly found that this is more complicated than im having fun with right now, and I want to sleep.
//sorry, next time i'll make something i enjoy
function CheckCollisionsOtherBalls(a_ball) {
    
  for (let b_ball of balls) {
    
    
    //saw the distance calc online but it makes sense
    let xa = Math.abs(a_ball.position.x - b_ball.position.x)
    let ya = Math.abs(a_ball.position.y - b_ball.position.y)
    let distance =  Math.sqrt( xa*xa + ya*ya )
    if ( b_ball.radius <= distance )  {
      //a is goin left
      let new_dir = Math.atan2(ya, xa)
      if (a_ball.position.y > b_ball.position.y) {
        
      }
      if (a_ball.position.x < b_ball.position.x) {
        
      }
      //a is goin down
      
    }
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
  CheckCollisions();
  //circle(mouseX, mouseY, mouse_ball_radius*2);
}

