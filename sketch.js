const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var gameState = "play";

var engine, world;

var bgImg;
var fishImg,fish2Img;
var player,playerImg;
var bubbleImg;
var fish;
var bubbleGroup;
var score = 0;
var resetButton,resetButtonImg;
var fish1Group,fish2Group;


function preload(){
bgImg=loadImage("image/oceanbg.jpg");
fishImg = loadImage("image/yellowfish.gif");
fish2Img = loadImage("image/fish4.png");
playerImg = loadImage("image/sprite_fish0.png");
bubbleImg  =loadImage("image/sprite_bubble0.png");
resetButtonImg = loadImage("image/sprite_0.png");
}
function setup(){
    var canvas = createCanvas(1200,500);
    engine = Engine.create();
    world = engine.world;

    player = createSprite(100,200);
    player.scale = 0.04;
    player.addImage(playerImg);
    //player.debug = "false"; 
    player.setCollider ("circle",0,0,1000);

    resetButton = createSprite(600,250);
    resetButton.scale = 0.1;
    resetButton.addImage(resetButtonImg);
       
  fish1Group = createGroup();
  fish2Group = createGroup();
  bubbleGroup = createGroup();

   // ground = Bodies.rectangle(200,390,200,20,ground_options);
   // World.add(world,ground);

  //  console.log(ground);
}

function draw(){
    background(bgImg);
    Engine.update(engine);

    
    fill(0);
   textSize(32);
   text("Score:"+score,1000,50);

    
    console.log("gameState",gameState);
    if (gameState === "play"){

    player.y = mouseY;

    resetButton.visible = 0;

    if (keyDown("space")){
    bubbles();
    }

    if(score%10===0){
      fish1Group.setVelocityXEach = fish1Group.setVelocityXEach*5 ;
      fish2Group.setVelocityXEach = fish2Group.setVelocityXEach*5;  
    }

    spawnFish();
    spawnFish2();
    shoot();

    if(fish2Group.collide(player)){
      score--;
    }

    if (fish1Group.collide(player)){
      gameState = "end";
    }
  }
  else if(gameState === "end"){

    fish1Group.velocityXEach = 0;
    fish2Group.velocityXEach  = 0;

    fish1Group.destroyEach();
    fish2Group.destroyEach();

    bubbleGroup.destroyEach();

    resetButton.visible = 1;

    if(mousePressedOver(resetButton)){
      reset();
    }
  }
  
   drawSprites();
   
}
function spawnFish(){
    if(frameCount%60===0){
    fish = createSprite(1200,random(0,500),20,20);
    fish.addImage(fishImg);
    fish.scale =0.1;
    fish.velocityX = -15;
    fish.lifetime = 240;
      fish.debug = "true";
    fish1Group.add(fish);
    }
}
function spawnFish2(){
    if(frameCount%40===0){
        var fish2 = createSprite(1200,random(0,500),20,20);
        fish2.addImage(fish2Img);
        fish2.scale =0.3;
        fish2.velocityX = -15;
        fish2.lifetime = 80;

        fish2Group.add(fish2);
    }
}
function bubbles(){
    var bubble = createSprite(200,200);
    bubble.scale = 0.01;
    bubble.addImage(bubbleImg);
    bubble.velocityX = 6;
    bubble.y= mouseY ;
    bubble.lifetime = 200;

    bubbleGroup.add(bubble);

}
function shoot(){
  if(bubbleGroup.isTouching(fish1Group)){
      fish1Group.destroyEach();
      bubbleGroup.destroyEach();
      score++;
  }

  if(bubbleGroup.isTouching(fish2Group)){
      fish2Group.destroyEach();
      bubbleGroup.destroyEach();
      score++;
  }
}
function reset(){
  gameState = "play";
  score = 0;
}
