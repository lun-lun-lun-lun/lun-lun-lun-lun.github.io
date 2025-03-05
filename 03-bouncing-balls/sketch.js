// Bouncing Ball Object Demo


let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  for (let ball of ballArray) {

    ball.x += ball.dx;
    ball.y += ball.dy;

    //tp around the screen
    teleport(ball);

    fill("red");
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function teleport(ball) {

  if (ball.x - ball.radius > windowWidth) {
    ball.x -= windowWidth;
    
  }
  if (ball.x + ball.radius < 0) {
    ball.x += windowWidth;
  }
  if (ball.y - ball.radius > windowHeight) {
    ball.y -= windowHeight;
  }
  if (ball.y + ball.radius < 0) {
    ball.y += windowHeight;
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
    dx: random(-5,5),
    dy: random(-5,5),
  };

  ballArray.push(someBall);
}

