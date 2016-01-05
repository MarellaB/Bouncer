//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl = document.getElementById('score'),
    multiplierEl = document.getElementById('multipler');

//Inner variables of game
var score = 0,
    multipler = 1;

var platform = {
  posX: 'left',
  posY: 0,
  render() {
    $.fillStyle = "#f0f";
    if (this.posX === 'left') {
      $.fillRect(0,this.posY,50, 15);
    } else if (this.posX === 'middle') {
      $.fillRect(75,this.posY,50, 15);
    } else if (this.posX === 'right') {
      $.fillRect(150,this.posY,50, 15);
    }
  },
  tick() {

  }
};

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = 1;
  this.dy = -1;
  this.draw = function() {
    $.beginPath();
    $.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    $.fillStyle = this.color;
    $.fill();
    $.closePath();
  };
}

var platforms = [];
var balls = [
  new Ball((canv.width / 2), (canv.height - 10), 10, "#FF0000"),
  new Ball(200, 200, 20, "#00FF00"),
  new Ball(400, 560, 40, "#0000FF")
];

platforms.push(platform)

//All logic
function tick() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    if ((balls[i].x + balls[i].radius) > canv.width || (balls[i].x - balls[i].radius) < 0) {
      balls[i].dx = -(balls[i].dx);
    }

    if ((balls[i].y + balls[i].radius) > canv.height || (balls[i].y - balls[i].radius) < 0) {
      balls[i].dy = -(balls[i].dy);
    }
  }
}

/*
 * Draw the balls.
 */
 function drawBalls() {
   for (var i = 0; i < balls.length; i++) {
     balls[i].draw();
   }
 }

/**
 * Draw the bricks.
 */
function drawBricks() {
  for (var i=0; i<platforms.length; i++) {
    platforms[i].render();
  }
}

//All rendering
function draw() {
  // Clear canvas
  $.clearRect(0, 0, canv.width, canv.height);

  drawBricks();
    drawBalls();
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
