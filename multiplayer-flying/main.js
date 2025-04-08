// Flying
// Laeron Lewis
// March 31st, 2025

// Extra For Experts:
// 3D
// Multiplayer

// To Do:
// Add input system (simply it - didn't need allat from before)
// Characters, moving a model
// Towers, Walls
// Smooth movement & physics (try to port from before)
// Human-Object Collisions
// Object-Object physics and collisions?? (try to port from DeltaPhysics)


let shared;

let idk = [];
let me, guests;
let myCam;
let dragX = 0;
let dragY = 0;
let flySpeed = 2.5;
let camSensitivity = 0.0037;
const GRAVITY = 9.8;
const DEFAULT_SPEED = 9.8;
const EMPTY_VECTOR3 = {
  x: 0,
  y: 0,
  z: 0,
}

let MODELS;

//detect players leaving the game
window.addEventListener("beforeunload", function (e) {
  //cleanup
  // var confirmationMessage = "\o/";

  // (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  // return confirmationMessage;                            //Webkit, Safari, Chrome
});

function betterDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy)
  
  return distance;
}

//copy the empty vector, return with desired values.
//able to pass to other clients since its not a class object like p5.Vector
function newVector3(x,y,z) {
  let v3 = structuredClone(EMPTY_VECTOR3)
  v3.x = x || 0;
  v3.y = y || 0;
  v3.z = z || 0;
  return v3
}


function createCharacter() {
  return {
    flySpeed: DEFAULT_SPEED,

    //for vectors, im probably gonna have to use the placeholders then make a p5.Vector out of them when I want to use prebuilt funcs
    trueAccel:      newVector3(),
    trueVelo:       newVector3(),
    relativeVelo:   newVector3(),
    relativeAccel:  newVector3(),
    position:       newVector3(),
    rotation:       newVector3(),
    model:          "box", //set to a newly loaded model later? or a string that defines what model to show for other's screens
  }
}


function placeholder() {}

let keyBinds = {
  87: { //W
    held: false,
    pressed: {func: fly, args: ["z", -1]},
    released: {func: placeholder, args: []},
  },
  65: { //A
    held: false,
    pressed: {func: fly, args: ["x", -1]},
    released: {func: placeholder, args: []},
  },
  83: { //S
    held: false,
    pressed: {func: fly, args: ["z", 1]},
    released: {func: placeholder, args: []},
  },
  68: { //D
    held: false,
    pressed: {func: fly, args: ["x", 1]},
    released: {func: placeholder, args: []},
  },
  32: { //Spacebar
    held: false,
    pressed: {func: fly, args: ["y", -1]},
    released: {func: placeholder, args: []},
  },
  17: { //Ctrl
    held: false,
    pressed: {func: fly, args: ["y", 1]},
    released: {func: placeholder, args: []},
  },  
}

function fly(axis, power) {
  //if i cant figure out relative stuff, tween the model to in front of the camera when they move
  if (relativeAccel[axis] === undefined) {return}
  if (relativeAccel[power] === undefined) {return}
  me.relativeAccel[axis] = 1*power
}

function boost() {

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
  
  //myCam.setPosition(0, -400, 800);

  // Point the camera at the origin.
 
  MODELS = {
    "box": box,
    "sphere": sphere,
  }
  //camera(mouseX, mouseY, (height/2) / tan(PI/6), width/2, height/2, 0, 0, 1, 0);
}





function mousePressed() {
  //console.log(me)
  
  //console.log(partyLoadGuestShareds())
  requestPointerLock()

  
}
let camAngle = 0;
//this could leave some things undetected if players join 
function draw() {
  background(40);
  
  // https://github.com/processing/p5.js/wiki/Getting-started-with-Webgl-in-p5
  // https://processing.org/tutorials/p3d
  //background(0);
 
  mouseCaptured = false
    
    //console.log( directionY)
    //let tilt = Math.abs(directionY) <= 0.97 || Math.sign(movedY) !== Math.sign(directionY) ? movedY : 0;
    //console.log(-movedX * camSensitivity)

    let directionY = (myCam.centerY - myCam.eyeY + movedY*camSensitivity) / 530
    
    
    let rotationX = -movedX * camSensitivity
    // let rotationY = Math.abs(directionY) <= 0.97 || Math.sign(movedY) !== Math.sign(directionY) ? movedY * camSensitivity : 0;
    let rotationYAlt = -movedY * camSensitivity

    let deltaX = movedX;
    camAngle += deltaX * 0.01;
    me.rotation.x += rotationX
    //me.rotation.y += rotationY
    me.rotation.y -= rotationYAlt
    //console.log(camAngle, me.rotation.x)

    console.log(Math.cos(me.rotation.y) * 720)
    myCam.setPosition(
      me.position.x + Math.cos(me.rotation.x) * -400 * Math.cos(me.rotation.y), 
      me.position.y - 100 + Math.sin(me.rotation.y) * -400, 
      me.position.z + Math.sin(me.rotation.x) * 400 * Math.cos(me.rotation.y),
    )
    //myCam.tilt(rotationY)
    //https://diwi.github.io/p5.EasyCam/
    myCam.lookAt(
      me.position.x, 
      me.position.y - 100, 
      me.position.z
    )
    
    //the camera pan and tilt is innacturately described and pans the more its been tilted WHO WROTE THIS
    //s
    let pos = me.position
    //myCam.camera(pos.x,pos.y-300,pos.z+400, -me.rotation.x, me.rotation.y, me.rotation.z, 0, 1 ,0)
    //myCam.pan(rotationX)
    
    if (keyIsDown(68)) {
      me.position.x += flySpeed
    }
    if (keyIsDown(65)) {
      me.position.x -= flySpeed
    }
    if (keyIsDown(83)) {
      me.position.z += flySpeed
    }
    if (keyIsDown(87)) {
      me.position.z -= flySpeed
    }
    // myCam.move(
    //   // D - right, A - left 
    //   (keyIsDown(68) ? flySpeed : 0) + (keyIsDown(65) ? -flySpeed : 0),
    //   // Q - down, E - up
    //   (keyIsDown(81) ? flySpeed : 0) + (keyIsDown(69) ? -flySpeed : 0),
    //   // S - backward, W - forward
    //   (keyIsDown(83) ? flySpeed : 0) + (keyIsDown(87) ? -flySpeed : 0)
    // );
    push();
    //WHENERVJHE I TRY TO TYPE OUT "TRANSLATE()" IT AUTOCORRECTS TO A DIFFERENT THING BUT DOESNT AUTOFILL
    //WHO WROTE THIS
    translate (0,0, -200, )
    box(200);
    pop();
    box(200);
    for (let player of partyLoadGuestShareds()) {
      let pos = player.position
      push();
      translate (pos.x,pos.y, pos.z)
      rotateY(player.rotation.x)
      //someone at the team decided that rotateY (Y btw) should rotate blocks on right and left
      //i will hate that person forever
      rotateZ(player.rotation.y)
      fill("red")
      console.log(player.model)
      MODELS[player.model](200)
      pop();
      
    }
  // camera(mouseX, height/2, (height/2) / tan(PI/6), mouseX, height/2, 0, 0, 1, 0);
  // translate(width/2, height/2, -100);
  // stroke(255);
  // noFill();
  

  //drawText()

}

function mouseDragged() {
  

  
  //camera(dragX, mouseY, (height/2) / tan(PI/6), width/2, height/2, 0, 0, 1, 0);
}




function safeMath(num){
  return Math.abs(num) < 1 ? 0 :num
}

