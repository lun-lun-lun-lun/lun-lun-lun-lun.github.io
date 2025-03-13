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

    name:           "",

    currentHealth:  100,
    x_position:     0,
    y_position:     0,

    moveSpeed:      100,
    maxHealth:      100,
    strength:       100,
    
}
let me, guests;

//gets a unique name from a list
function getUniqueName(folder) {

  let name = Math.round(random(1,MAX_PLAYERS));

  if (folder[name]) {
    return getUniqueName(folder)
  }

  return name
}


function preload() {
    partyConnect(
		"wss://demoserver.p5party.org", 
		"hello_party"
	);
  if (partyIsHost()) {
    // partySetShared(shared, {
    //     players: [],
    // });
  }
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared(
    { 
      name:           "",
      currentHealth:  100,
      x_position:     0,
      y_position:     0,

      moveSpeed:      100,
      maxHealth:      100,
      strength:       100,
    }
  );
    //make the game host reset allll the values
  
	// }
  // shared = partyLoadMyShared(
  //   "shared", 
  //   { 
  //     x: 1,
  //     y: 2,
  //     players: [],
  //   },
  // );
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  console.log(partyLoadGuestShareds())
  //addNewUser()
  


  
  // let newPlayer = structuredClone(playerTemplate);
  // newPlayer.id = totalPlayers+1
  
  // shared.players[totalPlayers+1] = newPlayer
}

//need to rework to fit new loadguestsshared thing
function SetUserData() {
  me.name = 
}

function mousePressed() {
  console.log(partyIsHost())
  console.log(partyLoadMyShared())
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

  //ellipse(shared.x, shared.y, 100, 100);
}