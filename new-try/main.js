let shared;
//p5.party doesnt work in this way, but this close to the way that im used to
//note to self: make squid game next time?
let playerTemplate = {
    id: 0,
    x_position: 0,
    y_position: 0,
    moveSpeed:      100,
    currentHealth:  100,
    maxHealth:      100,
    swordLength:    100,
    
    upgrades: {
      //maximu
      health:         0,
      range:          0,
      speed:          0,
      damage:         0,
      defense:        0,
    }
    
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
    "shared", 
    { 
        x: 100, 
        y: 100,
        players: {
          "ol": 1,
        },
    }
);
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  console.log(partyIsHost())
  let totalPlayers = Object.keys(shared.players).length;
  let newPlayer = structuredClone(playerTemplate);
  newPlayer.id = totalPlayers+1
  
  shared.players[totalPlayers+1] = newPlayer
}

function mousePressed() {
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