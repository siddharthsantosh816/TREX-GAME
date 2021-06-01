class Game{
   
    constructor(){}

    start(){
        
        
        trex = createSprite(10,0.68*displayHeight,50,50);
        trex.visible = false;
        trex.addAnimation("running", trex_running);
        trex.addAnimation("collided", trex_collided);
        trex.scale = 1.4;
        trex.setCollider("rectangle",0,-5,65,60);
        
        gameOver = createSprite(displayWidth/2-200,300);
        gameOver.addImage(gameOverImg);
        
        restart = createSprite(displayWidth/2-200,displayHeight/3);
        restart.addImage(restartImg);
          
        gameOver.scale = 0.8;
        restart.scale = 0.7;
        // console.log(gameOver.x);
        // console.log(restart.x)
      
        gameOver.visible = false;
        restart.visible = false;
        
        invisibleGround = createSprite(displayWidth/2,0.79*displayHeight,displayWidth*500,50);
        invisibleGround.visible = false;

        objects = new Objects();
        cloudsGroup = new Group();
        obstaclesGroup = new Group();     
    }
    plays(){
        score= Math.round(score+trex.x/3000);
       // console.log(trex.x)
       trex.velocityX = 6 + score/1000;
       
       
        //console.log(trex.velocityX);
        
        gameOver.x=trex.x+430;
        restart.x=trex.x+430;
        
        if((touches.length > 0 || keyDown("space")) && trex.y >= 0.67*displayHeight) {
            trex.velocityY = -13;
            jumpSound.play();
            touches = [];  
        }
        
        trex.velocityY = trex.velocityY + 0.9;
        
        trex.collide(invisibleGround);
        objects.createObstacle();
        objects.createClouds();

        if(obstaclesGroup.isTouching(trex)){
            collideSound.play();
            gameState = END;
        }
                
         camera.position.x=trex.x+400;
         camera.position.y=displayHeight/2-55;    
    }

    ends() {
        gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        trex.velocityY = 0;
        trex.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        
        //change the trex animation
        trex.changeAnimation("collided",trex_collided);
        
         obstaclesGroup.setLifetimeEach(-1);
         cloudsGroup.setLifetimeEach(-1);  
      }
    restart() {
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
        
        trex.changeAnimation("running",trex_running);
        
        touches = [];
        score = 0;
        obsX=0;
        cldX=0;
        trex.x=50;
    }
};