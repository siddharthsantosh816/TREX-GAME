var PLAY = 1;
var END = 0;
var gameState;
var database;
var newName;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;
var collideSound, jumpSound;
var obsX, cldX;
var backgroundImg1, backgroundImg2;
var score=0,highScore = 0,highScorer,newName;
var gameOver, restart;
var touches =[];
var games,objects;

function preload(){
  trex_running =   loadAnimation('images/trex1.png','images/trex3.png','images/trex4.png');
  trex_collided = loadAnimation('images/trex_collided.png');
    
  groundImage = loadImage('images/ground2.png');
  cloudImage = loadImage('images/cloud.png');
  
  obstacle1 = loadImage('images/obstacle1.png');
  obstacle2 = loadImage('images/obstacle2.png');
  obstacle3 = loadImage('images/obstacle3.png');
  obstacle4 = loadImage('images/obstacle4.png');
  obstacle5 = loadImage('images/obstacle5.png');
  backgroundImg1=loadImage('images/bg.png');
  backgroundImg2=loadImage('images/bg2.jpg');
  gameOverImg = loadImage('images/gameOver.png');
  
  restartImg = loadImage('images/restart.png');
  jumpSound = loadSound('images/jump.wav');
  collideSound = loadSound('images/collided.wav');
}

function setup() {
  createCanvas(displayWidth, 0.83*displayHeight);
  console.log((displayHeight-0.17*displayHeight)/displayHeight);
  games=new Game();
  games.start();
  score = 0;
  obsX = 0;
  cldX=0;
  // create input and buttons and assign gamesate to PLAY  and capture the name from input if button pressed
  var input = createInput("Name");
  input.position(500,300);
 
  var button = createButton('Play');
  button.position(675,300);
  button.mousePressed(()=> {
    newName=input.value();
    input.hide();
    button.hide();
    gameState=PLAY;
    trex.visible = true;
    
});
  // read the High score from  adatabase nd assign to highScore
  database=firebase.database();
  var databaseRef=database.ref('High Score');
  databaseRef.on("value",function(data){
  highScore=data.val();
  });

  databaseRef=database.ref('High Scorer');
  databaseRef.on("value",function(data){
  highScorer=data.val();
  });
}

function draw() {
  if(score<10000){
    background(backgroundImg1);
  }
  else{
    background(backgroundImg2);
  }
  textSize(20);
  fill("red");
  text("Your Score: "+score,trex.x+350,40);
  text("High Scorer: "+highScorer,trex.x+750,40);
  text("High Score: "+highScore,trex.x+750,70);

  image(groundImage,-displayWidth/2,0.76*displayHeight,displayWidth*500,40);
 
  drawSprites();
  if(gameState === PLAY) {
      games.plays();
  }
  if(gameState=== END) {
    games.ends();
    
    //compare score and High Score and update database.
    if(score > highScore){
      highScore=score;
      highScorer=newName;
      database.ref('/').update({
        "High Scorer":highScorer,
        "High Score":score
      });
    }
    if(mousePressedOver(restart)) {
         games.restart();
         
      }
    }
  }