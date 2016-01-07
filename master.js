//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl      = document.getElementById('score'),
    multiplierEl = document.getElementById('multiplier');

//Inner variables of game
var score       = 0,
    multiplier  = 2,
    camera      = 0;

var platform = function(arg1) {
  this.style = arg1;
  this.posY = 0;

  this.render = function() {
    $.fillStyle = "#f0f";
    var c = this.style.split('');
    for (var i=0; i<3; i++) {
      if (c[i] === '#') {
        $.fillRect((canv.width/16)+((canv.width/4)*i), this.posY+camera, (canv.width/4), 20);
      } else {

      }
    }
  };

  this.generate = function () {
    var t = '';
    var check = false;
    for (var i=0; i<2; i++) {
      var a = Math.random();
      if (a > 0.4) {
        a = '#';
      } else {
        a = '0';
        if (!check) {
          i -= 1;
          check = true;
        }
      }
      t = t.concat(a);
    }
    this.style = t;
    if (this.style === '000') {
      this.style = '#0#';
    }
    console.log(t);
  };
  this.tick = function() {
    if (this.posY + camera - 20 > canv.height) {
      this.generate();
      this.posY = 0-camera-40;
    }
  };
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

//Creates temporary testing platforms
var temp = new platform();
temp.generate();
platforms.push(temp);
temp = new platform();
temp.posY = 210;
temp.generate();
platforms.push(temp);
temp = new platform();
temp.posY = 360;
temp.generate();
platforms.push(temp);

//All logic
function tick() {
  camera += 1;
  score += 0.04 * multiplier;
  for (var i=0; i<platforms.length; i++) {
    platforms[i].tick();
  }

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

  // Draw background
  $.fillStyle = "#000";
  $.fillRect(0, 0, canv.width, canv.height);

  //Updates the elements to display the proper multipler and score
  scoreEl.innerHTML = '' + Math.floor(score);
  multiplierEl.innerHTML = 'x' + multiplier;

  drawBricks();
  drawBalls();
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
