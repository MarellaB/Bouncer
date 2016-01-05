//All rendering variables
var canv = document.getElementById('primeCanvas'),
    $    = canv.getContext('2d');

//Elements of page to be modified
var scoreEl      = document.getElementById('score'),
    multiplierEl = document.getElementById('multiplier');

//Inner variables of game
var score     = 0,                          //Players score
    multiplier= 2,                          //Score multiplier
    cameraX   = 0,                          //Position of the camera on X axis
    cameraY   = 0,                          //Position of the camera on Y axis
    cameraS   = 1,                          //Speed and direction of the camera
    ballRadius= 10,                         //Size of the ball
    ballPosX  = (canv.width / 2),           //Position of the ball on X axis
    ballPosY  = (canv.height - ballRadius), //Position of the ball on Y axis
    oldBricks = '',                         //Used to store and read old bricks
    fall      = false;                      //If the game is in fall mode or not

/**
  * The full section of bricks
 */
var platform = function() {
  this.style = '';  //Where the bricks are located
  this.posY = 0;    //Position on the Y axis of the bricks
  //All rendering of the bricks in here
  this.render = function() {
    $.fillStyle = "#f0f";
    var c = this.style.split('');
    for (var i=0; i<3; i++) {
      if (c[i] === '#') {
        $.fillRect((canv.width/16)+((canv.width/16)*4.6666*i), this.posY+cameraY, (canv.width/16)*4.6666, 20);
      } else {

      }
    }
  };
  //Generates new positions of the bricks
  //NOTE: Should only be used when going up, pull from oldBricks when going down,
  //      and make sure to pull it, and not just read it
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
    if (t === '000') {
      t = '#0#';
    }
    if (t === '##') {
      t = '##0';
    }
    this.style = t;
    console.log(t);
  };
  this.tick = function() {
    if (this.posY + cameraY - 20 > canv.height && !fall) {
      oldBricks = oldBricks.concat(this.style);
      this.generate();
      this.posY = 0-cameraY-40;
    }
    if (this.posY + cameraY < -20 && fall) {
      this.style = oldBricks.slice(-3, oldBricks.length);
      this.posY = canv.height-cameraY;
      console.log(this.style);
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
temp.posY = canv.height/3+canv.height/3;
temp.generate();
platforms.push(temp);
temp = new platform();
temp.posY = canv.height/3;
temp.generate();
platforms.push(temp);

//All logic
function tick() {
  if (fall && cameraS > -1) {
    cameraS -= 0.002;
  }
  ballPosX += 0;
  ballPosY += 0;
  cameraY += cameraS;
  score += 0.04 * multiplier;
  for (var i=0; i<platforms.length; i++) {
    platforms[i].tick();
  }
}

//Tell the game to begin the fall sequence
function beginFall() {
  fall = true;
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

function drawBackground() {
  //Draw black background
  $.fillStyle = "#000";
  $.fillRect(0, 0, canv.width, canv.height);
  $.fillStyle = "#555";
  $.fillRect(0, 0, canv.width/16, canv.height);
  $.fillRect((canv.width/16)*15, 0, canv.width/16, canv.height);
}

//All rendering
function draw() {
  // Draw background
drawBackground();
  drawBall();
  drawBricks();
  //Updates the elements to display the proper multipler and score
  scoreEl.innerHTML = '' + Math.floor(score);
  multiplierEl.innerHTML = 'x' + multiplier;
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
