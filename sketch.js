var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jungle , jungleImg
var reset, gameover
var resetImg, gameoverImg
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score;
var invisible_ground

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 resetImg=loadImage("reset.png");
 gameoverImg=loadImage("gameover.png") 
  jungleImg=loadImage("jungle.jpg")
}



function setup() {
   createCanvas(500, 390);
  jungle = createSprite(250,200);
  jungle.addImage(jungleImg);
  jungle.velocityX=-4;
  jungle.scale=1.0
  jungle.x = jungle.width /2;
  
  score=0;
 
  
  reset=createSprite(250,180);
  reset.addImage(resetImg);
  reset.scale=0.6;
  
  gameover=createSprite(250,100);
  gameover.addImage(gameoverImg);
  gameover.scale=0.6;
  
  invisible_ground= createSprite(70,350,100,10);
  invisible_ground.visible=false;
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.06
  
  
  

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  //monkey.debug=true;
  background(255);

  
    if (gameState===PLAY){
      
     
      
      jungle.velocityX = -(4 + 3* score/6)
      
      if(FoodGroup.isTouching(monkey)){
        FoodGroup.destroyEach();    
        //monkey.scale=+0.08
        score=score+2
        
      }
      
      if(keyDown("space") && monkey.y>=350) {
      monkey.velocityY = -15;
    }
      
   monkey.velocityY = monkey.velocityY - 0.5
  
  switch (score){
    case 4:monkey.scale=0.07;
            break;
    case 8:monkey.scale=0.08;
            break;
    case 12:monkey.scale=0.09;
            break;        
    case 16:monkey.scale=0.10;
            break;     
    default: break;        
  }

       
    if(keyDown("space") && monkey.y>=305) {
      monkey.velocityY = -12;
    }
   monkey.velocityY = monkey.velocityY + 0.8
    
    reset.visible=false;  
      gameover.visible=false;
      if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    }
  
  if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
   if (gameState === END) {
     background(1);
     
  reset.visible=true;
  gameover.visible=true;
  monkey.visible=false;
  banana.visible=false;
  jungle.visible=false;
  obstacle.visible=false;
  score.visible=false;
    
  
  }
    monkey.collide(invisible_ground);   
    spawnFood();
    spawnObstacles();
 
  
 
  drawSprites();
  text("Score: "+ score, 430,30);
  stroke("white");
  textSize(40);
  fill("red");
        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        jungle.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  
}

function reset() {
   gameState = PLAY;
  gameover.visible = false;
 reset.visible = false;
 FoodGroup.destroyEach();
  score=0; 
  
}


function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.velocityX = -(3 + score/4);
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

  