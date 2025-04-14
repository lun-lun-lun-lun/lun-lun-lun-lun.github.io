// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theFireworks = [];

class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 2;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.opacity = 255;
  }

  display() {
    noStroke()
    fill(this.r, this.g, this.b, this.opacity)
    circle(this.x,this.y,this.radius*2)
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= random(50,300) * deltaTime/1000;
    
  }

  isDead() {
    return this.opacity <= 0;
  }
}



function mousePressed() {
  for (let i = 0; i<=random(100,1000); i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let effect of theFireworks) {
    if (effect.isDead()) {
      let index = effect.indexOf
      theFireworks.splice(index, 1)
    } else {
      effect.update()
      effect.display()
    }
  }
}
