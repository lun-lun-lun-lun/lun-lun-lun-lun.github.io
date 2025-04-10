// Multiplayer Flying - 2D Arrays
// Laeron Lewis
// April 10th, 2025

// Extra For Experts:
// 3D
// Multiplayer
// push(), pop()
// vector math for movement

const BACKGROUND_COLOUR = "blue"
const MAP_WIDTH = 10;
const MAP_LENGTH = 12;
const MAX_BLOCK_HEIGHT = 5;
const BLOCK_SIZE = 500;
const PLAYER_SIZE = 55
const PLAYER_COLOUR = "red"
const CAM_DIST_Z = 800;
const CAM_DIST_Y = PLAYER_SIZE;
const FLY_SPEED = 15;
const CAM_SENSITIVITY = 0.0037;
const KEY_CODES = {
  87: {activate: fly, args: [1,1,-1,  "forward"]},  //W
  65: {activate: fly, args: [1,0,-1,  "right"]},    //A
  83: {activate: fly, args: [-1,-1,1, "forward"]},  //S
  68: {activate: fly, args: [-1,0,1,  "right"]},    //D
  32: {activate: fly, args: [0,-1,0,  "up"]},       //Spacebar
  17: {activate: fly, args: [0,1,0,   "up"]},       //Ctrl
}
const EMPTY_VECTOR3 = {
  x: 0,
  y: 0,
  z: 0,
}

let blockColours = []
let forwardVec3 = newVector3(0,0,-1);
let rightVec3 =   newVector3(1,0,0);
let upVec3 =      newVector3(0,1,0);
let shared;
let me, guests;
let environment;
let myCam;
let MODELS;



//detect players leaving the game
window.addEventListener("beforeunload", function (e) {
  //cleanup
  // var confirmationMessage = "\o/";

  // (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  // return confirmationMessage;                            //Webkit, Safari, Chrome
});


//copy the empty vector, return with desired values.
//able to pass to other clients since its not a class object like p5.Vector
function newVector3(x,y,z) {
  let vec3 = structuredClone(EMPTY_VECTOR3)
  vec3.x = x || 0;
  vec3.y = y || 0;
  vec3.z = z || 0;
  return vec3
}

//make a 2d grid filled with random uints 0 to maxHeight
function buildEnvironment(length, width, maxHeight) {
  let map = []
  for (let y = 0; y<=length; y++) {
    map.push([])
    for (let x = 0; x<=width; x++) {
      map[y].push(Math.floor(random() * maxHeight))
    }
  }
  return map
}

//make a new character with position and rotation data
function createCharacter() {
  return {
    position:       newVector3(),
    rotation:       newVector3(),
    model:          "sphere",
  }
}

//init multiplayer stuff
function preload() {
  partyConnect("wss://demoserver.p5party.org", "hello_party");
  if (partyIsHost()) {
    partySetShared(shared, {
        new_join: [],
    });
  }
  guests = partyLoadGuestShareds(); 
  me = partyLoadMyShared(createCharacter());
}

function setup() {
  noStroke()

  //enable 3D rendering mode on the canvas
  createCanvas(windowWidth*0.8, windowHeight*0.8, WEBGL);
  myCam = createCamera();
  
  MODELS = {
    "box": box,
    "sphere": sphere,
  }
  //see more of the world
  perspective(1.3)
  //make a 2d flat height grid
  environment = buildEnvironment(MAP_WIDTH, MAP_LENGTH, MAX_BLOCK_HEIGHT)
}




// helper function to normalize a vector (make all values 1)
// thank you stack overflow :)
function normalizeVector3(vec3) {

  //use euclidean distance formula to get the length of vec3
  let length = Math.sqrt(vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z);

  //dont div by 0, but make length of vector 1
  if (length !== 0) {
    vec3.x /= length;
    vec3.y /= length;
    vec3.z /= length;
  }
}

// update AFTER camera rotation
//lets you move in respect to your camera rotation
function updateRotationVector3s() {

  // annoying math to get forward vec
  forwardVec3.x = Math.cos(me.rotation.x) * Math.cos(me.rotation.y);
  forwardVec3.y = Math.sin(me.rotation.y);
  forwardVec3.z = Math.sin(me.rotation.x) * Math.cos(me.rotation.y);
  
  // right vector is cross product of forward and world up
  rightVec3.x = -Math.sin(me.rotation.x);
  rightVec3.y = 0;
  rightVec3.z = Math.cos(me.rotation.x);

  //up vcector is just the cross product of right and forwards
  upVec3.x = -forwardVec3.x * rightVec3.y + forwardVec3.y * rightVec3.x;
  upVec3.y = -forwardVec3.z * rightVec3.x + forwardVec3.x * rightVec3.z;
  upVec3.z = -forwardVec3.y * rightVec3.z + forwardVec3.z * rightVec3.y;
  
  // normalize
  normalizeVector3(forwardVec3);
  normalizeVector3(rightVec3);
  normalizeVector3(upVec3);
}

//click to hide mouse and prevent it going offscreen
function mousePressed() {
  requestPointerLock()
}


//move in the direction you press based on your forward, right, or up vectors
function fly(xDir, yDir, zDir, direction) {
  let vec3 = forwardVec3;
  //originally i used actual deltatime, but it looked choppy
  let delta = 1//deltaTime/100
  if (direction === "right") {
    vec3 = rightVec3;
  } else if (direction === "up") {
    vec3 = upVec3;
  }
  me.position.x += (vec3.x * FLY_SPEED) * xDir * delta;
  me.position.y += (vec3.y * FLY_SPEED) * yDir * delta;
  me.position.z += (vec3.z * FLY_SPEED) * zDir * delta;
  
}


//use inputs and draw the scene
function draw() {
  background(BACKGROUND_COLOUR);

  updateRotations()
  updateCamera()
  updateRotationVector3s()

  //move
  getKeyPresses()

  drawPlayers()
  drawMap()
}


//show all players
function drawPlayers() {
  for (let player of partyLoadGuestShareds()) {
    let pos = player.position
    let rot = player.rotation

    push();
      translate (pos.x,pos.y, pos.z)

      //someone at the team decided that rotateY (Y btw) should rotate models on right and left
      //i will hate that person forever
      rotateY(rot.x)
      rotateZ(rot.y)
      fill(PLAYER_COLOUR)
      MODELS[player.model](PLAYER_SIZE)
    pop();
  }
}

//show the map
function drawMap() {
  push();
  //put the environment directly under you
  translate (MAP_WIDTH*BLOCK_SIZE/2, MAX_BLOCK_HEIGHT * BLOCK_SIZE, -MAP_LENGTH*BLOCK_SIZE/2)

  let totalBlocks = 0;
  for (let x = 0; x<environment.length; x++) {
    translate (-BLOCK_SIZE,0, 0)
    let height = 0;
    for (let z = 0; z<environment[x].length; z++) {
      translate (0, 0, BLOCK_SIZE)
      height = environment[x][z]

      //build up higher
      for (let y = 0; y<height; y++) {
        translate (0, -BLOCK_SIZE, 0)

        //use the assign colour, or make one if it doesnt yet exist
        let colour = blockColours[totalBlocks] || blockColours[blockColours.push([random()*255,random()*255,random()*255]) - 1]
        totalBlocks += 1
        fill(...colour)


        box(BLOCK_SIZE)
      }
      //reset translations for y
      translate (0,BLOCK_SIZE*height, 0)
    }
    //reset translations for z
    translate (0, 0, -BLOCK_SIZE*environment[x].length)
  }
  totalBlocks = 0
  pop();
}




//actiavate keys based on defined 'activate' function
function getKeyPresses() {
  //for some reason you have to do Object.keys before iterating through an object in js.
  for (let code of Object.keys(KEY_CODES)) {
    if (keyIsDown(code)) {
      let keybindData = KEY_CODES[code]

      //use func with set args
      keybindData.activate(...keybindData.args)
    }
  }
}

//update the camera as you rotate the mouse
function updateCamera() {
  //decide how far forward, left, and up the cam should be based on rotation
  //'turning around a point'
  myCam.setPosition(
    me.position.x + Math.cos(me.rotation.x) * -CAM_DIST_Z * Math.cos(me.rotation.y), 
    me.position.y + (Math.sin(me.rotation.y) * -CAM_DIST_Z) - CAM_DIST_Y, 
    me.position.z + Math.sin(me.rotation.x) * CAM_DIST_Z * Math.cos(me.rotation.y),
  )
  
  //point at the players model
  myCam.lookAt(
    me.position.x, 
    me.position.y - CAM_DIST_Y, 
    me.position.z
  )
}

//update self rotation before updating camera itself (camera is based on this anyways)
function updateRotations() {
  let rotationX = -movedX * CAM_SENSITIVITY
  let directionY = (myCam.centerY - myCam.eyeY + movedY*CAM_SENSITIVITY) / 530

  //prevent you from rotating infinitly in the y and inverting your stuff (hopefully...)
  let rotationY = Math.abs(directionY) <= 1.3 || Math.sign(movedY) !== Math.sign(directionY) ? -movedY * CAM_SENSITIVITY : 0;

  me.rotation.x += rotationX
  me.rotation.y -= rotationY
}