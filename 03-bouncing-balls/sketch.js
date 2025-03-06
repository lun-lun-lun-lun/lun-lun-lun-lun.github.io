// Bouncing Ball Object Demo


let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  fill("red");
  noStroke();
  for (let ball of ballArray) {
    
    
    moveBall(ball);
    teleport(ball);
    displayBall(ball);
    
  }
}

function displayBall(ball) {
  circle(ball.x, ball.y, ball.radius*2);
}

function moveBall(ball) {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function teleport(ball) {

  if (ball.x + ball.radius > windowWidth) {
    ball.x -= windowWidth+ ball.radius*2;
    
  }
  if (ball.x + ball.radius < 0) {
    ball.x += windowWidth + ball.radius*2;
  }
  if (ball.y - ball.radius > windowHeight) {
    ball.y -= windowHeight + ball.radius*2;
  }
  if (ball.y + ball.radius < 0) {
    ball.y += windowHeight + ball.radius*2;
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    radius: random(15,40),
    dx: random(-2,2),
    dy: random(-2,2),
  };

  ballArray.push(someBall);
}

