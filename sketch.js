
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground;
var FoodGroup, obstacleGroup;
var score;
var survivaltime = 0;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(100,375,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(100,380,4000,20);
  ground.velocityX = -5;
  
  obstacleGroup  = createGroup();
  bananaGroup = createGroup();
  
  
  
}


function draw() {
  background("yellow");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(monkey.isTouching(obstacleGroup)){
    survivaltime = 0;
    score = 0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    banana.visible = false;
    bananaGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.destroyEach(0);
    
  }
  
  if(keyDown("space") && monkey.y>=300 ){
    monkey.velocityY = -12;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("survival Time:  " + survivaltime,100,50);
  survivaltime = survivaltime+ Math.ceil(getFrameRate()/40)
  

  monkey.collide(ground);
  
  console.log(ground.velocityX);
  
  banana();
  obstacle();
  drawSprites();
}

function  banana(){
  if(frameCount%120 === 0){
    var banana = createSprite(200,-10,40,10);
    banana.x = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityY = 3;
    banana.lifetime = 360;
    
    bananaGroup.add(banana);
  }
}

function  obstacle(){

 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,360,10,40);
   obstacle.velocityX = -6 ;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
}
}

