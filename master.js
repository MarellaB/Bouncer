//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl = document.getElementById('score'),
    multiplierEl = document.getElementById('multipler');

//Inner variables of game
var score = 0,
    multipler = 1,
    ballRadius = 10,
    ballPosX = (canv.width / 2),
    ballPosY = (canv.height - ballRadius);

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

//All rendering
function draw() {
  // Clear canvas
  $.clearRect(0, 0, canv.width, canv.height);
  drawBall();
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
