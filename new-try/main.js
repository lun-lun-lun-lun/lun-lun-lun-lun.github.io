// Red Light Green Light
// todo: add onRelease, reoganize keybinds, add pushing, make the actual minigame
// should make red pop up on the screen, but get less and less visible each time it pops up
// short scene for players that lose

// 




let shared;
//i do not expect 456 people. its just canon to the show.
const MAX_PLAYERS = 456;

//the highest health you can have
const MIN_HEALTH = 50;
const MAX_HEALTH = 150;
//walkspeed multiplier
const MIN_MOVE_SPEED = 0.5;
const MAX_MOVE_SPEED = 1.5;
//pushing force multiplier, punching damage multiplier
const MIN_STRENGTH = 0.5;
const MAX_STRENGTH = 1.5;

//like friction. your velocity is multiplied by this each frame, if not constantly set
const GROUND_GRIP = 0.9;
// //influences what you can roll
// const MIN_LUCK = 0;
// const MAX_LUCK = 3;

//ctrl i for modmenu
//p5.party doesnt work in this way, but this close to the way that im used to
//note to self: make diep.io next time?

//seconds
const TIME = 90;
const START_WAIT_TIME = 30;

//seconds
let timeLeft = 60; 

const KEYBINDS = [
  //W, move up
  {code: 87, onHold: PlayerMove, args: [0, -1], cooldown: 0, lastUsed: 0, held: false}, 
  //A, move left
  {code: 65, onHold: PlayerMove, args: [-1, 0], cooldown: 0, lastUsed: 0},
  //S, move down
  {code: 83, onHold: PlayerMove, args: [0, 1], cooldown: 0, lastUsed: 0},
  //D, move right
  {code: 68, onHold: PlayerMove, args: [1, 0], cooldown: 0, lastUsed: 0},
  //Space, push/dash
  {code: 32, onHold: PlayerMove, args: [1, 0], cooldown: 5, lastUsed: 0},
]

let idk = [];
let me, guests;
let oldGuestList = [];


//detect players leaving the game
window.addEventListener("beforeunload", function (e) {

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




function PlayerMove(player, x_dir, y_dir) {
  player.x_position += player.moveSpeed * x_dir
  player.y_position += player.moveSpeed * y_dir
}

function PlayerShove(player, x_dir, y_dir) {
  player.x_position += player.moveSpeed * x_dir
  player.y_position += player.moveSpeed * y_dir
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
  createCanvas(800, 800);
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
  drawSpectators()
  drawPlayers()
  trackGuests()
  checkCollisions()
  
  
  //ellipse(shared.x, shared.y, 100, 100);
}

function checkCollisions() {

}

function checkKeyPresses() {
  for (let keybind of KEYBINDS) {
    if (keyIsDown(keybind.code)) {
      keybind.onHold(me, ...keybind.args)
      keybind.held = true
    //key was released
    } else if (keybind.held == true) {
      console.log("key released")
      keybind.held = false
    }
  }


}

//scrapped
function trackGuests() {
  //track when people leave
  // for (let i = 0; i<oldGuestList.length; i++) {
  //   if ( !(_.isEqual(oldGuestList[i], guests[i])) ) {
  //     console.log(i)
  //     console.log("A player left or joined the game.")
  //   }
  // }
  

  // //seen online for copying proxy arrays
  // oldGuestList = JSON.parse(JSON.stringify(guests))

  
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