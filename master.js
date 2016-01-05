//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl      = document.getElementById('score'),
    multiplierEl = document.getElementById('multiplier');

//Inner variables of game
var score     = 0,
    multiplier = 2,
    ballPosX  = 0,
    ballPosY  = 0,
    camera    = 0;
    ballRadius = 10,
    ballPosX = (canv.width / 2),
    ballPosY = (canv.height - ballRadius);

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

//List of platforms in the game
var platforms = [];

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
  ballPosX += 0;
  ballPosY += 0;
  camera += 1;
  score += 0.04 * multiplier;
  for (var i=0; i<platforms.length; i++) {
    platforms[i].tick();
  }
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
  }
}

//All rendering
function draw() {
  // Draw background
  $.fillStyle = "#000";
  $.fillRect(0, 0, canv.width, canv.height);
  drawBall();
  drawBricks();
  //Updates the elements to display the proper multipler and score
  scoreEl.innerHTML = '' + Math.floor(score);
  multiplierEl.innerHTML = 'x' + multiplier;
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
