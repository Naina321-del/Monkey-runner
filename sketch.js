
var monkey , monkey_running;
var  banana,bananaImage, obstacle,obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime;
var bg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  monkey = createSprite(110,300,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground =createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  score = 0;
  survivalTime = 0;
  
}


function draw() {
  background(250);
  
  if(ground.x<0){
  ground.x = ground.width/2;
  }
  
   if(keyDown("space")&& monkey.y >= 100) {
     monkey.velocityY = -12;
    }
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8 
    monkey.collide(ground);
  
  
food();
enemy();  
drawSprites();

    stroke("black");
    textSize(20);
    fill("black");
    
    text("Score : " + score , 400,50);
  
    if (obstacleGroup.isTouching(monkey)){
       ground.velocityX = 0;
       monkey.velocityY = 0;
       obstacleGroup.setVelocityXEach(0);
       foodGroup.setVelocityXEach(0);
       obstacleGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);
       foodGroup.x = 0;
       obstacleGroup.x=0;
 }
  console.log(obstacleGroup.x);
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("survivalTime :" + survivalTime , 100,50);
  
}

function food(){
 if (frameCount % 180 === 0) {
  banana = createSprite(120,200,12,12);
  banana.x = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale=0.1; 
  banana.velocityX =-5;
  banana.lifetime=300; 
  monkey.depth = banana.depth+1;
  foodGroup.add(banana);
  }
 if (foodGroup.isTouching(monkey)){
  foodGroup.destroyEach();
}}

function enemy(){
 if (frameCount % 300 === 0){
  obstacle = createSprite(403,325,12,12);
  obstacle.addImage(obstacleImage);   
  obstacle.scale=0.1; 
  obstacle.velocityX = -6;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);   
  }}



