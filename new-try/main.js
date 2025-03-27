// Red Light Green Light
// Laeron Lewis
// March 20th, 2025

// Extra For Experts:
// held and release keys
// does const count? i forgot if we covered it
// Screen scrolling
// Multiplayer
// sadly no docstrings because i am Lazy

// To Do:
// add onRelease, reoganize keybinds, add pushing, make the actual minigame
// should make red pop up on the screen, but get less and less visible each time it pops up
// short scene for players that lose


let shared;

const WINDOW_WIDTH = 1000
const WINDOW_HEIGHT = 1000
//i do not expect 456 people. its just canon to the show.
const MAX_PLAYERS = 456;

//the highest health you can have
const MIN_HEALTH = 50;
const MAX_HEALTH = 150;
//walkspeed multiplier
const MIN_MOVE_SPEED = 0.25;
const MAX_MOVE_SPEED = 0.43;
const MAX_VELOCITY = 100;
//pushing force multiplier, punching damage multiplier
const MIN_STRENGTH = 0.7;
const MAX_STRENGTH = 1.3;

//your velocity is multiplied  by this each frame, if not constantly set
const FRICTION = 0.95;
let x_displacement = 0;
let y_displacement = 0;
//ctrl i for modmenu

//seconds
const TIME = 90;
const START_WAIT_TIME = 30;

//seconds

const KEYBINDS = [
  //W = 87, move up
  {code: 87,  onHold: {func: PlayerMove, args: [0, -1], cooldown: 0, lastUsed: 0}, 
              onRelease: undefined,
              held: false}, 
  //A = 65, move left
  {code: 65,  onHold: {func: PlayerMove, args: [-1, 0], cooldown: 0, lastUsed: 0}, 
              onRelease: undefined,
              held: false},
  // {code: 65, onHold: PlayerMove, args: [-1, 0], cooldown: 0, lastUsed: 0},
  //S = 83, move down
  {code: 83,  onHold: {func: PlayerMove, args: [0, 1], cooldown: 0, lastUsed: 0}, 
              onRelease: undefined,
              held: false},
  // {code: 83, onHold: PlayerMove, args: [0, 1], cooldown: 0, lastUsed: 0},
  //D = 68, move right
  {code: 68,  onHold: {func: PlayerMove, args: [1, 0], cooldown: 0, lastUsed: 0}, 
              onRelease: undefined,
              held: false},
  // {code: 68, onHold: PlayerMove, args: [1, 0], cooldown: 0, lastUsed: 0},
  //Space = 32, push
  {code: 32,  onHold: {func: PlayerChargeShove, args: [], cooldown: 5, lastUsed: 0}, 
              onRelease: {func: PlayerUseShove, args: [], cooldown: 0, lastUsed: 0},
              held: false},
  // {code: 32, onHold: PlayerShove, args: [1, 0], cooldown: 5, lastUsed: 0},
]

//they dont move, so they dont need to be a let variable
//could make the bodies immoveables?
let COLLIDERS = [

  //left wall |-
  {x: 0, y: 0, width: 200, height: 9999},

  //top wall |----\
  {x: 0, y: 0, width: 9999, height: 10},


  //bottom wall \____|
  {x: 0, y: 900, width: 99999, height: 200},

  
  // {x: 0, y: WINDOW_HEIGHT, width: WINDOW_WIDTH, height: 10},
  
]

let idk = [];
let me, guests;
let oldGuestList = [];
let currentText = "Press space to push. Game begins soon.";
let timeLeft = 180;
let light = "Green"

//detect players leaving the game
window.addEventListener("beforeunload", function (e) {
  //cleanup
  // var confirmationMessage = "\o/";

  // (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  // return confirmationMessage;                            //Webkit, Safari, Chrome
});

//creates a new player with randomized stats.
function MakeNewPlayer() {

  //clone the template so it can be edited
  let myPlayer = {};

  //"idle" or "moving" or "pushing" or "stunned"
  myPlayer.state = "idle"; 


  //assign random values to most things
  myPlayer.name = Math.round(random(1,MAX_PLAYERS)).toString();
  
  myPlayer.x_position = WINDOW_WIDTH/2;
  myPlayer.y_position = WINDOW_HEIGHT/2;


  myPlayer.x_velocity = 0;
  myPlayer.y_velocity = 0;


  myPlayer.maxHealth = Math.round(random(MIN_HEALTH, MAX_HEALTH));
  myPlayer.currentHealth = myPlayer.maxHealth;
  myPlayer.shoveCharge = 0
  myPlayer.alive = true
  myPlayer.moveSpeed = Math.round(random(MIN_MOVE_SPEED, MAX_MOVE_SPEED) * 100) /100;
  myPlayer.strength = Math.round(random(MIN_STRENGTH, MAX_STRENGTH) * 100) / 100;
  myPlayer.size = myPlayer.strength * 80

  return myPlayer
}
function betterDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy)
  return distance;
}



function PlayerMove(moving_player, x_dir, y_dir, customForce) {
  let delta = deltaTime/10
  let force = customForce === undefined ? moving_player.moveSpeed : Math.abs(5)
  console.log(x_dir)
  //if 
  moving_player.x_velocity = (x_dir != 0) ? moving_player.x_velocity + force * x_dir * delta : moving_player.x_velocity;
  moving_player.y_velocity = (y_dir != 0) ? moving_player.y_velocity + force * y_dir * delta : moving_player.y_velocity;
}

function PlayerStop(moving_player, x_dir, y_dir) {
  moving_player.x_velocity = moving_player.moveSpeed * x_dir
  moving_player.y_velocity = moving_player.moveSpeed * y_dir
}



function PlayerChargeShove(player) {
  
  let delta = deltaTime/10

  me.shoveCharge += 0.5 * delta
  console.log("pushc")
  
  // player.x_velocity = player.moveSpeed * x_dir
  // player.y_velocity = player.moveSpeed * y_dir
}


let can_push = true
function regainPush() {
  can_push = true
}
function PlayerUseShove() {
  console.log("push!")
  can_push = false
  setTimeout(regainPush, 8000)
  for (let player of guests) {
    if (player.name === me.name) {continue}
    let distanceBetween = betterDist(player.x_position, player.y_position, me.x_position, me.y_position)
    if (distanceBetween < me.size/2 + player.size/2) {
      console.log("found!")
      let force = me.shoveCharge

      let differenceX = Math.abs(Math.abs(me.x_position) - Math.abs(player.x_position))
      
      let differenceY = Math.abs(Math.abs(me.y_position) - Math.abs(player.y_position))
      differenceX = player.x_position >= me.x_position ? 1 * differenceX : -1 * differenceX
      differenceY = player.y_position >= me.y_position ? 1 * differenceY : -1 * differenceY
      let total = Math.abs(differenceX) + Math.abs(differenceY)
      let dirX = differenceX / total
      let dirY = differenceY / total
      PlayerMove(player, dirX, dirY, me.strength)
    }
  }
  me.shoveCharge = 0

}



function preload() {
  partyConnect("wss://demoserver.p5party.org", "hello_party");
  if (partyIsHost()) {
    partySetShared(shared, {
        new_join: [],
    });
  }
  guests = partyLoadGuestShareds();
  
  me = partyLoadMyShared(MakeNewPlayer());
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  noStroke();

  oldGuestList = JSON.parse(JSON.stringify(guests))
  //setTimeout(initiateGame(), 20)
}



function mousePressed() {
  console.log(me)
  console.log(partyLoadGuestShareds())
}

//this could leave some things undetected if players join 

function draw() {
  background(light);


  checkKeyPresses()
  LimitVelocity()
  drawMe()
  calculatePhysics(deltaTime)
  drawPlayers()
  drawColliders()
  drawSpectators()
  //drawText()

}



//just cant fix jitter..
function displaceCamera(x, y) {
  x_displacement += x
  y_displacement += y
  
}


function safeMath(num){
  return Math.abs(num) < 1 ? 0 :num
}

//smoooth movement AND CUSTOM COLLIDERS??
//does not include collision with players i ran out of time (while it may seem the same, the circle shape causes issues. What if I'm barely clipping the circle?
//i'd need a function that determines how straight the angle between them is, so I could scoot one circle off to another direction, but im tired now


function calculatePhysics(deltaTime) {
  if (me.alive === false) {
    return
  }
  me.x_velocity *= FRICTION
  me.y_velocity *= FRICTION

  let newX = me.x_velocity + me.x_position
  let newY = me.y_velocity + me.y_position


  //if this update will cause a collision, dont do it; reflect the velocity instead
  //if the reflection is too small, it causes a visual jitter; dont do it
  //a little annoying to read.

  //move if this wont cause a collisio
  
  let dispX = 0;
  let dispY = 0;
  hasMoved = false
  if (willCollide(newX, me.y_position) === false) {
    me.x_position += me.x_velocity;
    
    //does an action varB milliseconds later without yielding the rest of my stuff
    dispX = -me.x_velocity
    //setTimeout(displaceCamera, 200, -me.x_velocity, 0);

  //so it does collide. if the force we hit the wall with is high enough, reflect
  } else {
    if (Math.abs(me.x_velocity*-1) > 6) {
      
      me.x_velocity *= -0.7

    //force is too little; make us stop.
    } else {

      
      me.x_velocity *= 0
    }
  }
  
  //move if this wont cause a collision
  if (willCollide(me.x_position, newY) === false) {
    me.y_position += me.y_velocity
    
    
    //does an action varB milliseconds later without yielding the rest of my stuff
    dispY = -me.y_velocity
    //setTimeout(displaceCamera, 200, 0, -me.y_velocity);

  //so it does collide. 
  } else {
    //if the force we hit the wall with is high enough, reflect
    if (Math.abs(me.y_velocity*-1) > 6) {
      me.y_velocity *= -0.7

    //force is too little; make us stop.
    } else {
      me.y_velocity *= 0
    }
  }

  if (me.x_velocity > 3 || me.y_velocity > 3) {
    hasMoved = true
  }
  if ((hasMoved && light === "Red" && me.x_position < 3000) || millis()/1000 > 90) {
    me.alive = false
    console.log("dead")
    me.name = "dead :("
  }
  if (me.x_position > 3000) {

    me.name = "winner"
  }


  // x_displacement = lerp(x_displacement, x_displacement-me.x_velocity, 0.1);
  // y_displacement = lerp(y_displacement, y_displacement-me.y_velocity, 0.1);
  setTimeout(displaceCamera, 100, dispX, dispY);
}

//originally I 
function LimitVelocity() {
  let con1 = Math.abs(me.x_velocity) > 1 && Math.abs(me.y_velocity) > 1
  if (con1) {
    me.x_velocity *= 0.983
    me.y_velocity *= 0.983
  }
}

function checkKeyPresses() {
  for (let keybind of KEYBINDS) {
    if (keyIsDown(keybind.code)) {
      let onHold = keybind.onHold
      
      if (typeof onHold === 'undefined' === false) {
        
        onHold.func(me, ...onHold.args)
      }
      keybind.held = true
    //key was released
    } else if (keybind.held == true) {

      let onRelease = keybind.onRelease
      if (typeof onRelease === 'undefined' === false) {
        onRelease.func(me, ...onRelease.args)
      }
      keybind.held = false
    }
  }


}

function drawColliders() {
  for (let collider of COLLIDERS) {
    fill("blue")
    rect(collider.x + x_displacement, collider.y + y_displacement, collider.width, collider.height)
  }
}

//this unfortunately causes weird collisions with corners
function willCollide(newX, newY) {
  let collisionFound = false
  for (let collider of COLLIDERS) {

    //18 instead of 20 to make colliding on corners look less bad
    let radius = me.size/2.1
    let above_or_below = collider.x <= newX + radius && newX - radius<= collider.x + collider.width
    let on_right_or_left = collider.y <= newY + radius && newY - radius <= collider.y + collider.height

    if (on_right_or_left && above_or_below) {
      return true
    }
  }
  return false

}

function swapLight() {
  if (light === "Green") {
    light = "Red"
    currentText = "Red Light!"
  } else {
    light = "Green"
    currentText = "Green Light!"
  }
}

function initiateGame() {
  
  let totalTime = 0
  for (let i = 1; i<30; i++) {
    
    let timeBetween = random(1, 6) * 1000 + totalTime
    setTimeout(swapLight, timeBetween)
    setTimeout(swapLight, timeBetween + timeBetween/2)
    totalTime += timeBetween + timeBetween/2
  }
}

function drawText() {
  let displaced_x = me.x_position + x_displacement
  let displaced_y = me.y_position - 300 + y_displacement

  fill("White")
  textSize(me.size/3)
  textAlign(CENTER, CENTER)
  text(currentText, displaced_x, displaced_y)
}





function drawPlayers() {
  for (let player of guests) {
    if (player.name === me.name) { continue }
    let displaced_x = player.x_position + x_displacement
    let displaced_y = player.y_position + y_displacement

    fill("#616975")
    circle(displaced_x, displaced_y, player.size)
    fill("White")
    textSize(player.size/3)
    textAlign(CENTER, CENTER)
    text(player.name, displaced_x, displaced_y)

    
  }
}

function drawMe() {
  let displaced_x = me.x_position + x_displacement
  let displaced_y = me.y_position + y_displacement

  fill("#616975")
  circle(displaced_x, displaced_y, me.size)
  fill("White")
  textSize(me.size/2)
  textAlign(CENTER, CENTER)
  text(me.name, displaced_x, displaced_y)
}

function drawSpectators() {

}