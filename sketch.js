var trex, obstacle, cloud, gameState, score, ground, trexRunning, groundImage, invisibleGround, cloudImage, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, 
obstacleImage5, obstacleImage6, obstacleGroup, cloudGroup, Random, trexCollided, gameOverImage, restartImage, gameOver, restart, score, dieSound, jumpSound, checkpointSound,
cactusPosition, cloudPosition,speed, moreSpeed

function preload(){
  //animations
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  
trexCollided = loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(800, 300);
  
  //create sprites
   trex = createSprite(100,250,20,20)
   ground = createSprite(400,280,1600,20);
  invisibleGround = createSprite(400,295,800,20);
  
  //add animations
  trex.addAnimation("running", trexRunning);
  ground.addImage("ground", groundImage);
 
  invisibleGround.visible = false;
  trex.scale = 0.5;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  gameState = "play";
  
  gameOver = createSprite(0,70,20,20);
  gameOver.visible = false;
  restart = createSprite(0,150,20,20);
  restart.visible = false
  
  score = 0;
  cactusPosition = 600;
  cloudPosition = 400;
  moreSpeed =0;
}

function draw() {
  background(0,0,255);
  
    //trex staying on ground
  trex.collide(invisibleGround);
  
  textSize(20);
  fill("red");
  text("Score: " + Math.round(score),ground.x+200,50);
  
  if(gameState === "play"){
    gameOver.visible = false;
    restart.visible = false;
      score = score +0.5;
    //infinite ground
speed= score/50
     ground.x = ground.x + speed+3;
     if(speed>=10){
       speed=10
     }
     /*
   if(ground.x < 0){
    ground.x = ground.width/2;
  }
*/
camera.position.y= 150;
camera.position.x = ground.x;
trex.x = ground.x-350;
invisibleGround.x = ground.x;
   
  //trex movement and gravity
  trex.velocityY = trex.velocityY +0.8;
  if(keyDown("space") && trex.y > 240){
trex.velocityY = -14;  
jumpSound.play();
}
  
  //clouds
  clouds()
  obstacles()

  if(obstacleGroup.isTouching(trex)){
    gameState =  "end";
    dieSound.play();
}
    
if(score % 200 === 0) {
  checkpointSound.play();
}
  }
  
  if(gameState === "end"){
    gameOver.x = ground.x;
    restart.x = ground.x;
    gameOver.visible = true;
    restart.visible = true;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  trex.addImage("TrexCollided", trexCollided);
    ground.velocityX = 0;
    
    cloudGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
    
    gameOver.addImage("GameOver", gameOverImage);
    restart.addImage("Restart", restartImage);
  }
  drawSprites();
}
 
function clouds() {
 // if(frameCount % 60 === 0) {
    cloud = createSprite(cloudPosition,100,20,20);
    cloudPosition = cloudPosition + Math.round(random(250,400));
    cloud.addImage("clouds", cloudImage);
    //cloud.velocityX = -5;
    cloud.scale = 0.7;
   // cloud.lifetime = 200;
    cloud.y = random(120,220); 
    cloud.depth = trex.depth-1;
    cloudGroup.add(cloud);
    if(trex.x > cloud.x){
      cloud.destroy();
    }
 // }
}

function obstacles() {
 // if(frameCount % 6000 === 0) {
    obstacle = createSprite(cactusPosition,260,20,20);

    cactusPosition= cactusPosition+Math.round(random(300,400)) + moreSpeed;
    moreSpeed = moreSpeed+35;
    if(moreSpeed >=230){
      moreSpeed = 230;
    }
    Random = Math.round(random(1,6))
    switch(Random){
      case 1: {
      obstacle.addImage(obstacleImage1); 
      break;
      }
      case 2: {
      obstacle.addImage(obstacleImage2); 
      break;
      }
      case 3: {
      obstacle.addImage(obstacleImage3); 
        break;
      }
      case 4: {
      obstacle.addImage(obstacleImage4); 
        break;
      }
      case 5: {
      obstacle.addImage(obstacleImage5); 
        break;
      }
      case 6: {
      obstacle.addImage(obstacleImage6); 
        break;
      }
      default: break;
    }
    //obstacle.velocityX = -7;
    obstacle.scale = 0.5;
    //obstacle.y = random(100,250);
 
    obstacleGroup.add(obstacle);
  //}
}