var player1;
var player2;
var ball;
var score = 0;
var score2 = 0;
var obstacles;
var obstaclesGroup;
var circle, hexagon, rectangle, square, triangle, star;
var topBorder, bottBorder
var obstacles2;
var obstacles2Group;
var gameState = "start";
var start, restart;


//edges = createEdgeSprites();

function preload(){
  circle = loadImage("assets/circle.png");
  hexagon = loadImage("assets/hexagon.png");
  rectangle = loadImage("assets/rectangle.png");
  square = loadImage("assets/square.png");
  triangle = loadImage("assets/triangle.png");
  star = loadImage("assets/star.png");
}

function setup() {
  createCanvas(800,800);
  player1 = createSprite(50,400,20,100);
  player1.shapeColor = "white";

  player2 = createSprite(750,400,20,100);
  player2.shapeColor = "white";

  topBorder = createSprite(400,800,800,5);
  topBorder.visible = false;
  bottBorder = createSprite(400,1,800,5);
  bottBorder.visible = false;

  start = createSprite (50,750,30,30);
  restart = createSprite (750,750,30,30);

  ball = createSprite(400,400,15,15);
  ball.shapeColor = "white";

  obstaclesGroup = new Group();
  obstacles2Group = new Group();
}

function draw() {

   background(30);
 
   textSize(25);
   text("Player 1:"+score,40,25);
   text("Player 2:"+score2,670,25);

    if(gameState == "start"){
      ball.velocityX = 0;
      ball.velocityY = 0;
      ball.x = 400;
      ball.y = 400;
    }
    else{
      gamePlay();
    }
    if(mousePressedOver(start)){
      serve();
    }

  drawSprites();

  console.log(gameState);
}

function spawnObstacles(){
  if(frameCount%100 == 0){
    
    obstacles = createSprite(400,-800,40,40);
    obstacles.x = Math.round(random(300,500));
    obstacles.shapeColor = "white";
    obstacles.scale = 0.4;
    obstaclesGroup.add(obstacles);
  
    var number = Math.round(random(1,5));

    switch(number){
      case 1: obstacles.addImage(circle);
              break;
      case 2: obstacles.addImage(hexagon);
              break;
      case 3: obstacles.addImage(rectangle);
              break;
      case 4: obstacles.addImage(square);
              break;
      case 5: obstacles.addImage(triangle);
              break;
      default:break;
    }
    if(frameCount>2500){
    obstacles.velocityY =+ 10;
    }
    else{
      obstacles.velocityY =+ 4;
    }
  }
}

function spawnObstacles2(){
  if(frameCount%8000 == 0){
    obstacles2 = createSprite(400,-800,40,40);
    obstacles2.x = Math.round(random(200,600));
    obstacles2.y = Math.round(random(200,600));
    obstacles2.shapeColor = "white";
    obstacles2.scale = 0.2;
    obstacles2Group.add(obstacles2);
    obstacles2.addImage(star);
  }
}
function serve(){
  if(gameState == "start"){
    ball.velocityX = -5;
    ball.velocityY = 2;
    gameState = "play";
  }
  
}
function gamePlay(){
  spawnObstacles();
  spawnObstacles2();

  ball.bounceOff(player1);
  ball.bounceOff(player2);
  ball.bounceOff(topBorder);
  ball.bounceOff(bottBorder);

   if(obstaclesGroup.isTouching(ball)){
     ball.velocityY += 1;
     ball.velocityX += 1;
 }

   if(obstacles2Group.isTouching(ball)){
     ball.velocityY -= 5;
     ball.velocityX -= 5;
}

 player2.y = mouseY;

   if (keyIsDown(UP_ARROW)) 
 {
   player1.position.y = player1.position.y - 5;
  
 }

 if (keyIsDown(DOWN_ARROW)) 
 {
   player1.position.y = player1.position.y + 5;
 }

 if (ball.x > 800){
   score =+ 1
 }

 if (ball.x < 0){
   score2 =+ 1
 }

 if(player1.y > 750 ){
   player1.y = 750;
 }

 if(player1.y < 50 ){
   player1.y = 50;
 }

 if(player2.y > 750 ){
   player2.y = 750;
 }

 if(player2.y < 50 ){
   player2.y = 50;
 }
}