let shared;
//p5.party doesnt work in this way, but this close to the way that im used to
let playerTemplate = {
    name: "none",
    moveSpeed: 100,
    currentHealth: 100,
    maxHealth: 100,
    bulletSize: 100,
    bulletSpeed: 100,
    bulletPen: 100,
    fireRate: 100,
    
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
            hi: "nooo"
        },
    }
);
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  console.log(partyIsHost())
  players.push()
}

function mousePressed() {
  shared.x = mouseX;
  shared.y = mouseY;
  console.log(shared.players.hi)
}

function draw() {
  background("#ffcccc");
  fill("#000066");

  ellipse(shared.x, shared.y, 100, 100);
}