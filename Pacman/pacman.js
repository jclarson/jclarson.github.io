const pacArray = [
  ['./images/PMORight.png', './images/PMCRight.png'],
  ['./images/PMOLeft.png', './images/PMCLeft.png'],
  ['./images/PMODown.png', './images/PMCDown.png'],
  ['./images/PMOUp.png', './images/PMCUp.png']
];
let pos = 0;
let imgTop = 0;
let pageWidth = document.body.clientWidth;
let pageHeight = document.body.clientHeight;
let direction = 0;
let focus = 0;
let speed = 20;

function Run() {
  let img = document.getElementById("PacMan");
  let imgSize = img.width
  focus = (focus + 1) % 2;
  direction = checkPageBounds(direction, imgSize);
  img.src = pacArray[direction][focus];
  switch (direction) {
    case 0:
      pos += speed;
      img.style.top = imgTop + 'px';
      img.style.left = pos + 'px';
      break;
    case 1:
      pos -= speed;
      img.style.top = imgTop + 'px';
      img.style.left = pos + 'px';
      break;
    case 2:
      imgTop += speed;
      img.style.left = pos + 'px';
      img.style.top = imgTop + 'px';
      break;
    case 3:
      imgTop -= speed;
      img.style.left = pos + 'px';
      img.style.top = imgTop + 'px';
      break;
  }

  setTimeout(Run, 150);    // Use setTimeout to call Run every 200 millisecs
}

function checkPageBounds(direction, imgSize) {
  switch (direction) {
    case 0:
      if (pos + imgSize > pageWidth - 10) {
        pos = pageWidth - imgSize;
        direction = 2;
      }
      break;
    case 1:
      if (pos <= 10) {
        pos = 0;
        direction = 3;
      }
      break;
    case 2:
      if (imgTop + imgSize >= pageHeight - 10) {
        imgTop = pageHeight - imgSize;
        direction = 1;
      }
      break;
    case 3:
      if (imgTop <= 10) {
        imgTop = 0;
        direction = 0;
      }
      break;
  }
  return direction;
}
