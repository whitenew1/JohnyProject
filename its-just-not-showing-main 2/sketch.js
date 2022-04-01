var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;


function preload(){
  player_running = loadAnimation("player1.png","player.png","player2.png");
  player_collided = loadAnimation("gameover.png");
  
  groundImage = loadImage("ground2.png");
  
  //cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("slime1.png");
  obstacle2 = loadImage("slime2.png");
  obstacle3 = loadImage("slime3.png");
  obstacle4 = loadImage("slime4.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("collided" , player_collided)
  player.scale = 1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  //cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(200);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //move the ground
    
    score = score + Math.round(frameCount/60);
    if(keyDown("space")&& player.y >= 100) {
      player.velocityY = -13;
    }
    
    //player.velocityY = player.velocityY + 0.9
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    ground.velocityX = -4;
    //spawn the clouds
  //spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();

if(obstaclesGroup.isTouching(player)){
gameState=END
console.log("test2")

}



  }
  /*else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
  console.log("test")
  obstaclesGroup.setVelocityXEach(0)
  //cloudsGroup.setVelocityXEach(0)
  
  }*/
  
  
  player.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1)
              break
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
   // obstacle.scale = 0.10;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }*/
  
