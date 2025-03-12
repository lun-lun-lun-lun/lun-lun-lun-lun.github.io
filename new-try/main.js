// -todo
//get players moving on the screen
//when im done I need to annotate all the funcs with what they do
//dont do typecheck early like last time



let shared;
//i do not expect 456 people. its just canon to the show.
const MAX_PLAYERS = 456;
//ctrl i for modmenu
//p5.party doesnt work in this way, but this close to the way that im used to
//note to self: make squid game next time?
let playerTemplate = {
    id:             0,
    name:           "",
    x_position:     0,
    y_position:     0,
    moveSpeed:      100,
    currentHealth:  100,
    maxHealth:      100,
    strength:       100,
    // swordLength:    100,
    
    // upgrades: {
    //   //maximu
    //   health:         0,
    //   range:          0,
    //   speed:          0,
    //   damage:         0,
    //   defense:        0,
    // }
    
}

//gets a unique name from a list
function getUniqueName(folder) {

  let name = toString(random(1,MAX_PLAYERS));

  for (let person of folder) {
    if (person["name"] === name) {
      return getUniqueName(folder)
    }
  }

  let length = name.length;
  if (length === 2) {
    name = "0"+name
  } else if (length === 1) {
    name = "00"+name
  }

  return name
}


function preload() {
    partyConnect(
		"wss://demoserver.p5party.org", 
		"hello_party"
	);

    //make the game host reset allll the values
    if (partyIsHost()) {
		partySetShared(shared, {
            x: 0, 
            y: 0
        });
	}
    shared = partyLoadShared(
    "global", 
    { 
        x: 5, 
        y: 5,
        players: {},
    }
);
}

function setup() {
  createCanvas(400, 400);
  noStroke();

  

  


  
  // let newPlayer = structuredClone(playerTemplate);
  // newPlayer.id = totalPlayers+1
  
  // shared.players[totalPlayers+1] = newPlayer
}

function addNewUser() {
  let players = shared.players;
  let amountPlayers = Object.keys(players).length;
  let id = amountPlayers+1
  let newUser = structuredClone(playerTemplate);

  newUser.name = getUniqueName(folder)
  players[id] = newUser
}

function mousePressed() {
  console.log(partyIsHost())
  console.log(shared.players)
  // shared.x = mouseX;
  // shared.y = mouseY;
  // // shared.players = {
  // //   "ol": 1,
  // //
  
  // console.log(shared.players);
}

function draw() {
  background("#ffcccc");
  fill("#000066");

  ellipse(shared.x, shared.y, 100, 100);
}