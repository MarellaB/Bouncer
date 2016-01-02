//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl      = document.getElementById('score'),
    multiplierEl = document.getElementById('multipler');

//Inner variables of game
var score     = 0,
    multipler = 1,
    ballPosX  = 0,
    ballPosY  = 0,
    camera    = 100;
    ballRadius = 10,
    ballPosX = (canv.width / 2),
    ballPosY = (canv.height - ballRadius);

var platform = {
  posX: 'left',
  posY: 0,
  render() {
    $.fillStyle = "#f0f";
    if (this.posX === 'left') {
      $.fillRect(0,this.posY+canv.height-camera,50, 15);
    } else if (this.posX === 'middle') {
      $.fillRect(75,this.posY+canv.height-camera,50, 15);
    } else if (this.posX === 'right') {
      $.fillRect(150,this.posY+canv.height-camera,50, 15);
    }
  },
  tick() {

  }
};

var platforms = [];

var temp = platform;
temp.posX = 'middle';
platforms.push(temp);
temp.posX = 'left';
temp.posY = 200;
platforms.push(temp);
temp.posX = 'right';
temp.posY = 400;
platforms.push(temp);

//All logic
function tick() {
  ballPosX += 0;
  ballPosY += 0;
}

/**
 * Draw the ball. Defaults to the bottom center of the screen.
 */
function drawBall() {
  $.beginPath();
  $.arc(ballPosX, ballPosY, ballRadius, 0, Math.PI * 2, false);
  $.fillStyle = "#FF0000";
  $.fill();
  $.closePath();
}

/**
 * Draw the bricks.
 */
function drawBricks() {
  for (var i=0; i<platforms.length; i++) {
    platforms[i].render();
    console.log(platforms[i].posY);
  }
}

//All rendering
function draw() {
  $.fillStyle = "#000";
  // Clear canvas
  $.fillRect(0, 0, canv.width, canv.height);
  drawBall();
  drawBricks();
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
