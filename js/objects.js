class Objects{
   
        constructor(){}
    
        createObstacle (){
         if(frameCount % 30 === 0) {
                var p = random(-100,600);
                obsX = obsX+0.75*displayWidth+p;
                // obsX = obsX + displayWidth*500/600+p;
                var obstacle = createSprite(obsX,displayHeight-175,10,40);

                //obstacle.velocityX = -6;
                
                obstacle.scale = displayHeight/600;
                //generate random obstacles
                var rand = Math.round(random(1,2));
           
                switch(rand) {
                case 1: obstacle.addImage(obstacle1);
                        obstacle.scale = 0.8;
                        break;
                case 2: obstacle.addImage(obstacle2);
                        break;
                case 3: obstacle.addImage(obstacle3);
                        break;
                case 4: obstacle.addImage(obstacle4);
                        break;
                case 5: obstacle.addImage(obstacle5);
                        break;
                
                default: break;
                }
                
                //assign scale and lifetime to the obstacle           
                
               obstacle.lifetime = 200;
                //add each obstacle to the group
                  
                obstaclesGroup.add(obstacle)
                obstaclesGroup.setLifetimeEach(-1);
    
           }
        }
        createClouds (){
             if (frameCount % 20 === 0) {
                var q = random(-200,600); 
                    
                    cldX = cldX+ 0.65* displayWidth+q;
                    var cldY = random(0.3*displayHeight,20)
                    var cloud = createSprite(cldX,cldY,40,10);
                    //cloud.y = Math.round(random(displayHeight/2,displayHeight/10));
                    cloud.addImage(cloudImage);
                    cloud.scale = random(1,2);
                   // cloud.velocityX = -3;
                    
                     //assign lifetime to the variable
                    cloud.lifetime = 100;
                    
                    //adjust the depth
                    cloud.depth = trex.depth;
                    trex.depth = trex.depth + 1;
                    
                    cloud.depth = gameOver.depth;
                    gameOver.depth = gameOver.depth+1;
                    
                    //add each cloud to the group
                    cloudsGroup.add(cloud);
                    
                    cloudsGroup.setLifetimeEach(-1);
                  } 
    
        }
    
    };