const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800; //declares variables which let the script know what the html has drawn the canvas at
canvas.height = 500;

var continueAnimating = true;
const keys = [];
var monitorImage = undefined; //index of image from xrayImages array to display on the monitor

const background = new Image ();
background.src = "background.png";


const xrayImages = [];
const chestGood = new Image ();
chestGood.src = "chestok.png";
xrayImages.push(chestGood);

/*const gameSounds = [];
const roar = new Audio ();
roar.src = "roar.mp3";
gameSounds.push();*/

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function rollImage(){
  let num = floor(Math.random() * (xrayImages.length - 0) + 0);
  ctx.drawImage(xrayImages[num], 100, 75);
}

/*const player = {
  x: 200,
  y: 200,
  width: 40,
  height: 72,
  frameX: 0,
  frameY: 3,
  speed: 9, 
  moving: false,
  shooting: false,
};*/

/*class Bolt { //for player bolts, push to bolts array
  constructor(){
    this.x = player.x+(player.width/2); //start these at null, coords for testing only
    this.y = player.y+(player.height/2);
    this.dx = 0;
    this.dy = 0;
    this.radius = 5; 
    this.speed = 20; //taken from blast bolt speed
    this.hit = false; //change to true on collision for effects, (shape change for bolts)
  }
  draw(){
      ctx.beginPath();
      ctx.arc (this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc (this.x, this.y, this.radius*0.75, 0, 2 * Math.PI);
      ctx.fillStyle = "lightgreen";
      ctx.fill();
      ctx.beginPath();
      ctx.arc (this.x, this.y, this.radius*0.5, 0, 2 * Math.PI);
      ctx.fillStyle = "gold";
      ctx.fill();
  }     
  update(){
    //bolt movement
    this.x += this.dx;
    this.y += this.dy;   
    
    if (this.dy === 0) {
      if (player.frameY === 3) this.dy = -this.speed;//up
      if (player.frameY === 0) this.dy = this.speed;//down
    }
    if (this.dx === 0) {
      if (player.frameY === 1) this.dx = -this.speed;//left
      if (player.frameY === 2) this.dx = this.speed;//right
    }
  }


  remove(){
    let i = bolts.indexOf(this);
    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
      bolts.splice(i, 1);
      player.shooting = false;
    }    
  }
}
*/

/*drawScore = function() {
  ctx.font = "normal bolder 16px verdana";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillText ("Total score: "+finalScore, canvas.width-210, 80);
}*/

window.addEventListener("keydown", function (e){
  keys[e.keyCode] = true;//when a key is pressed that key is added to the keys array
});

window.addEventListener("keyup", function (e){
  delete keys[e.keyCode]; //when a key is released that key is deleted from the keys array.  This method prevents event listeners from interfering with one another and makes control more responsive.
});

let fps, fpsInterval, startTime, now, then, elapsed; //declare empty variables

function startAnimating(fps){ //function needed to kick off the animation by getting system time and tying fps to system time.
  fpsInterval = 1000/fps; //how much time passes before the next frame is served
  then = Date.now(); //Date.now is no. of ms elapsed since 1.1.1970
  startTime = then;
  animate();
}

function animate(){
  if (continueAnimating === true) {
    requestAnimationFrame(animate); //pass the parent function to RAF to cause it to call itself recursively
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) { //check to see if it's time to draw the next frame
      then = now - (elapsed % fpsInterval); //resets the clock to keep frame rate consistent
      ctx.clearRect (0, 0, canvas.width, canvas.height);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
    //by giving requestAnimationFrame the name of it's parent function as a parameter it will run
    //repeatedly until infinity.  The function needs to be called once outside of itself to initialise.

    /*drawScore();
    if () {
      continueAnimating = false;
      alert (`Your final score is ${finalScore}\n\nPress F5 to restart!`)

    }*/
    //console.log(player.moving);
    }
  }
}

if (continueAnimating) startAnimating(15);
