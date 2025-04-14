// Walker OOP Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let walkers = []
class Walker {
  constructor(x,y,r,g,b) {
    this.x = x;
    this.y = y;
    this.colour = [r,g,b];
    this.speed = 10;
    this.radius = 5;
  }
  move() {
    let choice = Math.random()*100;
    
    if (choice < 25) {
      //up
      this.y -= this.speed
    } else if (choice < 50) {
      //down
      this.y += this.speed
    } else if (choice < 75) {
      //left
      this.x -= this.speed
    } else if (choice < 100) {
      //right
      this.x += this.speed
    }
    
  }
  display() {
    push();
    noStroke()
    fill(...this.colour)
    circle(this.x,this.y,this.radius*2)
    pop();
  }
}

function mousePressed() {
  for (let i = 0; i<999; i++) {
    walkers.push(
      new Walker(mouseX, mouseY, random(255), random(255), random(255))
    )
  }
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // luke = new Walker(windowWidth/2,windowHeight/2,"blue")
  // laeron = new Walker(windowWidth/2,windowHeight/2,"red")
}

function draw() {
  for (let walker of walkers) {
    console.log(walker)
    walker.move();
    walker.display();
  }
  //background(220);
}
