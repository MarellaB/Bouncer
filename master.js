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
    ballPosY  = 0;

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
}

var platforms = Array();

platforms.push(platform)

//All logic
function tick() {

}

//All rendering
function draw() {
  
  for (var i=0; i<platforms.length; i++) {
    platforms[i].render();
  }
}

//Two loops
setInterval(tick, 3.333333);
setInterval(draw, 3.33333);
