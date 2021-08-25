const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(175);
    let game = document.getElementById('game');
    let newImg = document.createElement('img');
    newImg.style.position = 'absolute';
    newImg.src = './images/PacMan1.png';
    newImg.width = newImg.height = (Math.random() * 50) + 75;
    newImg.style.left = (position.x + 25) + 'px';
    newImg.style.top = (position.y + 25) + 'px';
    // add new Child image to game
    game.appendChild( newImg );
    return { position, velocity, newImg }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newImg.style.left = item.position.x + 'px';
        item.newImg.style.top = item.position.y + 'px';
    })
    setTimeout(update, 20);
}

    // detect collision with all walls and make pacman bounce
function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newImg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
  if (item.position.y + item.velocity.y + item.newImg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;    
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}
