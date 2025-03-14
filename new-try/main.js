// -todo
//get players moving on the screen
//when im done I need to annotate all the funcs with what they do
//dont do typecheck early like last time
//loadash





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
// //influences what you can roll
// const MIN_LUCK = 0;
// const MAX_LUCK = 3;

//ctrl i for modmenu
//p5.party doesnt work in this way, but this close to the way that im used to
//note to self: make diep.io next time?
const PLAYER_TEMPLATE = {
    name:           "",
    currentHealth:  100,
    x_position:     0,
    y_position:     0,
    moveSpeed:      100,
    maxHealth:      100,
    strength:       100,
}

const KEYBINDS = {
  W: 0, //move
  A: 0, //move
  S: 0, //move
  D: 0, //move

  MouseButtonOne: 0, //push
}


let me, guests;
let oldGuestList = [];

//creates a new player with randomized stats.
function MakeNewPlayer() {

  //clone the template so it can be edited
  let myPlayer = structuredClone(PLAYER_TEMPLATE);

  //assign random values to most things
  myPlayer.name = Math.round(random(1,MAX_PLAYERS)).toString();
  myPlayer.x_position = width/2;
  myPlayer.y_position = height/2;

  myPlayer.maxHealth = Math.round(random(MIN_HEALTH, MAX_HEALTH));
  myPlayer.currentHealth = myPlayer.maxHealth;

  myPlayer.moveSpeed = Math.round(random(MIN_MOVE_SPEED, MAX_MOVE_SPEED) * 100) /100;
  myPlayer.strength = Math.round(random(MIN_STRENGTH, MAX_STRENGTH) * 100) / 100;

  return myPlayer
}



function preload() {
  partyConnect("wss://demoserver.p5party.org", "hello_party");
  if (partyIsHost()) {
    // partySetShared(shared, {
    //     players: [],
    // });
  }
  guests = partyLoadGuestShareds();
  
  me = partyLoadMyShared(MakeNewPlayer());
}

function setup() {
  createCanvas(800, 800);
  noStroke();

  oldGuestList = JSON.parse(JSON.stringify(guests))

  console.log(oldGuestList)
  
  console.log(_.isEqual(oldGuestList[0], guests[0]))
}



function mousePressed() {
  console.log(me)
  console.log(partyLoadGuestShareds())
}

//this could leave some things undetected if players join 



function draw() {
  background("#ffcccc");
  fill("#000066");

  

  drawSpectators()
  drawPlayers()
  trackGuests()

  //ellipse(shared.x, shared.y, 100, 100);
}

function trackGuests() {
  //track when people leave
  for (let i = 0; i<oldGuestList.length; i++) {
    if ( !(_.isEqual(oldGuestList[i], guests[i])) ) {
      console.log("A player left the game.")
    }
  }

  //seen online for copying proxy arrays
  oldGuestList = JSON.parse(JSON.stringify(guests))

  
}


function drawPlayers() {

}

function drawSpectators() {

}