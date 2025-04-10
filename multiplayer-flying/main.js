// Flying
// Laeron Lewis
// March 31st, 2025

// Extra For Experts:
// 3D
// Multiplayer
// push(), pop()
// vector math :(

const flySpeed = 8.5;
const EMPTY_VECTOR3 = {
  x: 0,
  y: 0,
  z: 0,
}

//directional vector3s
let forwardVec3 = newVector3(0,0,-1);
let rightVec3 =   newVector3(1,0,0);
let upVec3 =      newVector3(0,1,0);
let shared;
let me, guests;
let camSensitivity = 0.0037;
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

function buildEnvironment(length, width, maxHeight) {
  let map = []
  for (let y = 0; y<length; y++) {
    map.push([])
    for (let x = 0; x<width; x++) {
      map[y].push(Math.floor(random() * maxHeight))
    }
  }
  return map
}

function createCharacter() {
  return {
    flySpeed: flySpeed,

    //for vectors, im probably gonna have to use the placeholders then make a p5.Vector out of them when I want to use prebuilt funcs
    //I ENDED UP NOT USING THESE IM SO TIRED
    position:       newVector3(),
    rotation:       newVector3(),
    model:          "sphere", //set to a newly loaded model later? or a string that defines what model to show for other's screens
  }
}

//keybinds was scrapped, i got lazy

function fly(axis, power) {
  //finish later
  
}

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
  //enable 3D rendering mode on the canvas
  noStroke()
  createCanvas(windowWidth*0.8, windowHeight*0.8, WEBGL);

  myCam = createCamera();
  
  
  MODELS = {
    "box": box,
    "sphere": sphere,
  }

  //make a 2d flat height grid
  environment = buildEnvironment(30, 30, 15)
  console.log(environment)
}


// helper function to normalize a vector
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




function mousePressed() {
  requestPointerLock()
}
//this could leave some things undetected if players join 
function draw() {
  background(40);
  
  // https://github.com/processing/p5.js/wiki/Getting-started-with-Webgl-in-p5
  // https://processing.org/tutorials/p3d
  //background(0);
 
  mouseCaptured = false
    
    
    let rotationX = -movedX * camSensitivity
    let directionY = (myCam.centerY - myCam.eyeY + movedY*camSensitivity) / 530
    let rotationY = Math.abs(directionY) <= 1.3 || Math.sign(movedY) !== Math.sign(directionY) ? -movedY * camSensitivity : 0;

    me.rotation.x += rotationX
    me.rotation.y -= rotationY

    //decide how far forward, left, and up the cam should be based on rotation
    //'turning around a point'
    myCam.setPosition(
      me.position.x  + Math.cos(me.rotation.x) * -800 * Math.cos(me.rotation.y), 
      me.position.y - 50 + Math.sin(me.rotation.y) * -800, 
      me.position.z + Math.sin(me.rotation.x) * 800 * Math.cos(me.rotation.y),
    )
    
    //point at the players model
    myCam.lookAt(
      me.position.x, 
      me.position.y - 50, 
      me.position.z
    )
    updateRotationVector3s()
    
   
    
    // W
    if (keyIsDown(87)) { 
      me.position.x += forwardVec3.x * flySpeed;
      me.position.y += forwardVec3.y * flySpeed;
      me.position.z -= forwardVec3.z * flySpeed;
    }
    // S
    if (keyIsDown(83)) { 
      me.position.x -= forwardVec3.x * flySpeed;
      me.position.y -= forwardVec3.y * flySpeed;
      me.position.z += forwardVec3.z * flySpeed;
    }
    // D
    if (keyIsDown(68)) { 
      me.position.x -= rightVec3.x * flySpeed;
      me.position.z += rightVec3.z * flySpeed;
    }
    // A
    if (keyIsDown(65)) {
      me.position.x += rightVec3.x * flySpeed;
      me.position.z -= rightVec3.z * flySpeed;
    }
    // Space
    if (keyIsDown(32)) {
      me.position.y -= upVec3.y * flySpeed;
    }
    //Ctrl
    if (keyIsDown(17)) {
      me.position.y += upVec3.y * flySpeed;
    }


    for (let player of partyLoadGuestShareds()) {
      let pos = player.position

      push();
        translate (pos.x,pos.y, pos.z)

        //someone at the team decided that rotateY (Y btw) should rotate models on right and left
        //i will hate that person forever
        rotateY(player.rotation.x)
        rotateZ(player.rotation.y)
        fill("red")
        MODELS[player.model](50)
      pop();
    }


    push();
    //(environment.length/2)*200
    translate ((environment.length/2)*200, 3000, -(environment[1].length/2)*200)


    for (let x = 0; x<environment.length; x++) {
      translate (-200,0, 0)
      let height = 0;
      for (let z = 0; z<environment[x].length; z++) {
        translate (0, 0, 200)
        height = environment[x][z]

        //build up higher
        for (let y = 0; y<height; y++) {
          translate (0, -200, 0)
          box(200)
        }
        //reset some translations
        translate (0,200*height, 0)
      }
      translate (0, 0, -200*environment[x].length)
    }
    pop();

}
