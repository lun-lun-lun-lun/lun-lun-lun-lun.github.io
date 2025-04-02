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


function createCharacter() {
  return {
    position: createVector(0,0,0),
    velocity: createVector(0,0,0),
    acceleration: createVector(0,GRAVITY,0),
    model: undefined, //set to a newly loaded model later? or a string that defines what model to show for other's screens
  }
}

let keyBinds = {
  87: {pressed: placeholder, args: []}, //W
  65: {pressed: placeholder, args: []}, //A
  83: {pressed: placeholder, args: []}, //S
  68: {pressed: placeholder, args: []}, //D
}

function fly() {}

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
  createCanvas(windowWidth*0.8, windowHeight*0.8, WEBGL);

  myCam = createCamera();

  //camera(mouseX, mouseY, (height/2) / tan(PI/6), width/2, height/2, 0, 0, 1, 0);
}





function mousePressed() {
  console.log(me)
  console.log(partyLoadGuestShareds())
  requestPointerLock()
}

//this could leave some things undetected if players join 

function draw() {
  background(40);
  
  // https://github.com/processing/p5.js/wiki/Getting-started-with-Webgl-in-p5
  // https://processing.org/tutorials/p3d
  //background(0);
  
  mouseCaptured = false
    let yDirection = (myCam.centerY - myCam.eyeY + movedY*camSensitivity) / 530
    //console.log( yDirection)
    let tilt = Math.abs(yDirection) <= 0.99 || Math.sign(movedY) !== Math.sign(yDirection) ? movedY : 0;
    //console.log(-movedX * camSensitivity)
    myCam.pan(-movedX * camSensitivity)
    myCam.tilt(tilt * camSensitivity)
    myCam.move(
      // D - right, A - left 
      (keyIsDown(68) ? flySpeed : 0) + (keyIsDown(65) ? -flySpeed : 0),
      // Q - down, E - up
      (keyIsDown(81) ? flySpeed : 0) + (keyIsDown(69) ? -flySpeed : 0),
      // S - backward, W - forward
      (keyIsDown(83) ? flySpeed : 0) + (keyIsDown(87) ? -flySpeed : 0)
    );
    box(200);
    box(200);
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

