// Red Light Green Light
// Laeron Lewis
// March 20th, 2025

// Extra For Experts:
// held and release keys
// does const count? i forgot if we covered it
// Screen scrolling
// Multiplayer

// To Do:
// add onRelease, reoganize keybinds, add pushing, make the actual minigame
// should make red pop up on the screen, but get less and less visible each time it pops up
// short scene for players that lose


let shared;

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 400
//i do not expect 456 people. its just canon to the show.
const MAX_PLAYERS = 456;

//the highest health you can have
const MIN_HEALTH = 50;
const MAX_HEALTH = 150;
//walkspeed multiplier
const MIN_MOVE_SPEED = 5;
const MAX_MOVE_SPEED = 10;
//pushing force multiplier, punching damage multiplier
const MIN_STRENGTH = 0.5;
const MAX_STRENGTH = 1.5;

//your velocity is multiplied  by this each frame, if not constantly set
const FRICTION = 1;

//ctrl i for modmenu

//seconds
const TIME = 90;
const START_WAIT_TIME = 30;

//seconds
let timeLeft = 60; 

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
const IMMOVABLES = [

  //left wall |-
  {x: 0, y: 0, width: 1, height: WINDOW_HEIGHT},

  //right wall -\
  {x: WINDOW_WIDTH, y: 0, width: 1, height: WINDOW_HEIGHT},

  //bottom wall \____|
  {x: 0, y: 0, width: WINDOW_WIDTH, height: 1},

  //top wall |----\
  {x: 0, y: WINDOW_HEIGHT, width: WINDOW_WIDTH, height: 1},
  
]

let idk = [];
let me, guests;
let oldGuestList = [];


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
  myPlayer.x_position = width/2;
  myPlayer.y_position = height/2;


  myPlayer.x_velocity = 0;
  myPlayer.y_velocity = 0;


  myPlayer.maxHealth = Math.round(random(MIN_HEALTH, MAX_HEALTH));
  myPlayer.currentHealth = myPlayer.maxHealth;


  myPlayer.moveSpeed = Math.round(random(MIN_MOVE_SPEED, MAX_MOVE_SPEED) * 100) /100;
  myPlayer.strength = Math.round(random(MIN_STRENGTH, MAX_STRENGTH) * 100) / 100;

  return myPlayer
}




function PlayerMove(moving_player, x_dir, y_dir) {
  moving_player.x_velocity = (x_dir != 0) ? moving_player.moveSpeed * x_dir : moving_player.x_velocity;

  moving_player.y_velocity = (y_dir != 0) ? moving_player.moveSpeed * y_dir : moving_player.y_velocity;
}

function PlayerStop(moving_player, x_dir, y_dir) {
  moving_player.x_velocity = moving_player.moveSpeed * x_dir
  moving_player.y_velocity = moving_player.moveSpeed * y_dir
}

function PlayerChargeShove(player) {


  // player.x_velocity = player.moveSpeed * x_dir
  // player.y_velocity = player.moveSpeed * y_dir
}

function PlayerUseShove(player) {


  // player.x_velocity = player.moveSpeed * x_dir
  // player.y_velocity = player.moveSpeed * y_dir
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
}



function mousePressed() {
  console.log(me)
  console.log(partyLoadGuestShareds())
}

//this could leave some things undetected if players join 



function draw() {
  background("#4ceda5");

  
  checkKeyPresses()
  calculatePhysics(deltaTime)
  drawSpectators()
  drawPlayers()
  
  
  //ellipse(shared.x, shared.y, 100, 100);
}

function calculatePhysics(deltaTime) {
  for (let player of guests) {
    //find a way to always bring a number closer to 0
    player.x_velocity = Math.abs(player.x_velocity) - FRICTION > 0 ? player.x_velocity - FRICTION : 0
    player.y_velocity = Math.abs(player.y_velocity) - FRICTION > 0 ? player.y_velocity - FRICTION : 0


    player.x_position += player.x_velocity
    player.y_position += player.y_velocity

    
  }
}

function checkKeyPresses() {
  for (let keybind of KEYBINDS) {
    if (keyIsDown(keybind.code)) {
      console.log(keybind.code)
      let onHold = keybind.onHold
      
      if (typeof onHold === 'undefined' === false) {
        
        onHold.func(me, ...onHold.args)
      }
      keybind.held = true
    //key was released
    } else if (keybind.held == true) {

      let onRelease = keybind.onRelease
      if (typeof onHold === 'undefined' === false) {
        onRelease.func(me, ...onRelease.args)
      }
      keybind.held = false
    }
  }


}

//scrapped
function checkCollisions() {

}


function drawPlayers() {
  for (let player of guests) {
    fill("#616975")
    circle(player.x_position, player.y_position, player.strength * 40)
    fill("White")
    textSize(15 * player.strength)
    textAlign(CENTER, CENTER)
    let x = player.x_position
    text(player.name, x, player.y_position,)
  }
}

function drawSpectators() {

}