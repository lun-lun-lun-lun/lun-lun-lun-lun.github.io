// Red Light Green Light
// Laeron Lewis
// March 20th, 2025

// Extra For Experts:
// held and release keys
// does const count? i forgot if we covered it
// Screen scrolling
// Multiplayer
// sadly no docstrings because i am Lazy

// To Do:
// add onRelease, reoganize keybinds, add pushing, make the actual minigame
// should make red pop up on the screen, but get less and less visible each time it pops up
// short scene for players that lose


let shared;

let idk = [];
let me, guests;
let playerCamera;


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
  return {}
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
  createCanvas(windowWidth*0.8, windowHeight*0.8, WEBGL);
  //noStroke();

  playerCamera = createCamera();
}



function mousePressed() {
  console.log(me)
  console.log(partyLoadGuestShareds())
}

//this could leave some things undetected if players join 

function draw() {
  background(40);
  
  // https://github.com/processing/p5.js/wiki/Getting-started-with-Webgl-in-p5
  // https://processing.org/tutorials/p3d
  translate(-width/2,-height/2,-100);
  box();


  //drawText()

}






function safeMath(num){
  return Math.abs(num) < 1 ? 0 :num
}

