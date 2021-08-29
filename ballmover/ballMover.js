const ball = document.getElementById('ball');
const changeSize = 2;
const interval = 75;
const x = {
  min: 5,
  max: 500,
  position: 5,
  reversed: false,
  velocity: 10
}

const y = {
  min: 5,
  max: 500,
  position: 5,
  reversed: false,
  velocity: 7
}

let ballSize = 50;

function moveBall() {
  if ((x.position + ballSize) > x.max || x.position < x.min) {
    console.log("x pos: " + x.position + " ballsize: " + ballSize)
    x.velocity = -x.velocity;
    x.reversed = !x.reversed;
  }
  
  if ((y.position + ballSize) > y.max || y.position < y.min) {
    y.velocity = -y.velocity;
    y.reversed = !y.reversed;
  }

  x.position += x.velocity;
  y.position += y.velocity;
  ball.style.left = x.position;
  ball.style.top = y.position;
}

function changeBall() {
  let color;
  if (x.reversed) {
    color = 'red';
    ballSize -= changeSize;
    if (y.reversed) color = 'purple';
  } else {
    color = 'green';
    ballSize += changeSize;
  }

  if (y.reversed) {
    color = 'blue';
    if (x.reversed) color = 'purple';
  }

  ball.style.background = color;
  ball.style.width = ballSize + 'px';
  ball.style.height = ballSize + 'px';
}

function updateBall() {
  changeBall();
  moveBall();
}

setInterval(updateBall, interval);