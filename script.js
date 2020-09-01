const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800; //declares variables which let the script know what the html has drawn the canvas at
canvas.height = 500;

var continueAnimating = true;
var roll = false;
const keys = [];
const displayedImage = [];
var score = 0;

const background = new Image ();
background.src = "background.png";

//images library
const xrayImages = [];

const chestGood = new Image ();
chestGood.src = "chestok.png";
const footGood = new Image ();
footGood.src = "footgood.png";
const kneeGood = new Image ();
kneeGood.src = "kneegood.png";
const pelvisGood1 = new Image ();
pelvisGood1.src = "pelvisgood1.png";
const pelvisGood2 = new Image ();
pelvisGood2.src = "pelvisgood2.png";
const wristGood = new Image ();
wristGood.src = "wristgood.png";
xrayImages.push(chestGood, footGood, kneeGood, pelvisGood1, pelvisGood2, wristGood)

const chestBad1 = new Image ();
chestBad1.src = "chestbad1.png";
const chestBad2 = new Image ();
chestBad2.src = "chestbad2.png";
const chestBad3 = new Image ();
chestBad3.src = "chestbad3.png";
const detector = new Image ();
detector.src = "detector.png";
const footBad1 = new Image ();
footBad1.src = "footbad1.png";
const footBad2 = new Image ();
footBad2.src = "footbad2.png";
const kneeBad = new Image ();
kneeBad.src = "kneebad.png";
const pelvisBad1 = new Image ();
pelvisBad1.src = "pelvisbad1.png";
const wristBad1 = new Image ();
wristBad1.src = "wristbad1.png";
const wristBad2 = new Image ();
wristBad2.src = "wristbad2.png";
xrayImages.push(chestBad1, chestBad2, chestBad3, detector, footBad1, footBad2, kneeBad, pelvisBad1, wristBad1, wristBad2);

function scoring (){
  if (roll) score++;
}
/*const gameSounds = [];
const roar = new Audio ();

roar.src = "roar.mp3";
gameSounds.push();*/

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function rollImage(){
  let num = Math.floor(Math.random() * (xrayImages.length - 0) + 0);
  displayedImage.push(xrayImages[num]);
  //ctx.drawImage(xrayImages[num], 100, 75);
  roll = false;
}

function displayImage(){
  ctx.drawImage(displayedImage[displayedImage.length-1], 100, 75);
}

window.addEventListener("keydown", function (e){
  keys[e.keyCode] = true;//when a key is pressed that key is added to the keys array
});

window.addEventListener("keyup", function (e){
  delete keys[e.keyCode]; //when a key is released that key is deleted from the keys array.  This method prevents event listeners from interfering with one another and makes control more responsive.
});

function keyPressHandler(){
  if (keys[32]/*space*/) roll = true;
}

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

      keyPressHandler();      
      if (roll) rollImage();
      displayImage();
      
    //by giving requestAnimationFrame the name of it's parent function as a parameter it will run
    //repeatedly until infinity.  The function needs to be called once outside of itself to initialise.

    /*drawScore();
    if () {
      continueAnimating = false;
      alert (`Your final score is ${finalScore}\n\nPress F5 to restart!`)

    }*/
    console.log(displayedImage.length);
    }
  }
}

if (continueAnimating) startAnimating(8);
