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
}

var platforms = Array();

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

}

//All rendering
function draw() {
  $.fillStyle = "#000";
  $.fillRect(0, 0, canv.width, canv.height);
  for (var i=0; i<platforms.length; i++) {
    platforms[i].render();
    console.log(platforms[i].posY);
  }
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.333333);
