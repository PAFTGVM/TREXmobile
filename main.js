var trex, trexImg,chao,chao2,chao_img;

var cacto1_img, cacto2_img, cacto3_img,cacto4_img, cacto5_img, cacto6_img;

var nuvem_img;

var grnuvem,grcacto;

var placar = 0;

var play = 1;

var end = 0;

var gamestate = play;

var olho;

var jump,check,dead;

var gameOver,gameOver_img,restart_img;

function preload(){
  trexImg = loadAnimation("images/trex1.png","images/trex3.png","images/trex4.png");
  chao_img= loadImage("images/ground2.png");
  nuvem_img = loadImage("images/cloud.png");
  cacto1_img=loadImage("images/obstacle1.png");
  cacto2_img=loadImage("images/obstacle2.png");
  cacto3_img=loadImage("images/obstacle3.png");
  cacto4_img=loadImage("images/obstacle4.png");
  cacto5_img=loadImage("images/obstacle5.png");
  cacto6_img=loadImage("images/obstacle6.png");
  olho = loadAnimation("images/trex_collided.png");
  gameOver_img = loadImage("images/gameOver.png");
  restart_img = loadImage("images/restart.png");
  
  jump = loadSound("sounds/jump.mp3")
  
  check = loadSound("sounds/checkpoint.mp3");
  
  dead = loadSound("sounds/die.mp3");
}

function setup() {
   createCanvas(windowWidth,windowHeight);
   trex = createSprite(50,height-160,20,50);
   trex.addAnimation("correndo",trexImg);
   trex.addAnimation("olho",olho);
   trex.scale=0.7;
   
   gameOver = createSprite(width/2,height/2);
   gameOver.addImage(gameOver_img);
  
  
  
   restart = createSprite(width/2,height/2 + 40 );      
   restart.addImage(restart_img);
   restart.scale = 0.6;
  
  
  chao = createSprite(300,height-180,600,10);
  chao.addImage(chao_img);

  
  
  //chao invisivel
  chao2 = createSprite(300,height-160,600,10);
  chao2.visible = false;
  
grcacto = new Group();
 
grnuvem = new Group();
//trex.debug = true;
trex.setCollider  ("rectangle",-8,0,60,90);
}

function draw() {  
  background("white");
  
  
textSize(14);
textFont("arial black");
text("placar " + placar ,300,50);
 
  if (gamestate === play) {
    placar = placar + Math.round(getFrameRate()/60);
    gameOver.visible = false;
    restart.visible = false;
    chao.velocityX = -(4 + 3 * placar/100);
    
    
    
    
    
    
      //pulo
  if(touches.length > 0 || keyDown("space") && trex.y > height-200){
       trex.velocityY = -10;
       jump.play();
       touches=[];
     }
  
   if ( placar> 0 && placar%100 === 0){
   check.play()
     
  
   } 
   

    
    
    //gravidade
  //trex.velocityY = trex.velocityY + 0.5;
   trex.velocityY += 0.5;

    
    
  gerarNuvens();
  gerarObstaculos();
    
   if (trex.isTouching(grcacto)) {
     gamestate = end;
     dead.play()
     
     
     
   }
    
    
  }else if (gamestate === end){
  trex.velocityY = 0;
  chao.velocityX = 0;
  grcacto.setVelocityXEach(0);
  grnuvem.setVelocityXEach(0);
  grcacto.setLifetimeEach(-1); 
  grnuvem.setLifetimeEach(-1);  
  trex.changeAnimation("olho");
  gameOver.visible = true;
  restart.visible = true;
 
  if(mousePressedOver(restart) || touches.length > 0) {
    reset();
    touches=[];    
    
  }  
  }
  
  
  
  

  
  trex.collide(chao2);
  
  //chao infinito
  if(chao.x < 0){
     chao.x = width;
     }
  
  
  drawSprites();
  
  
}

function gerarNuvens(){
  if(frameCount% 60 ===0){
    var nuvem = createSprite(width,random(100,190),50,20);
    nuvem.addImage(nuvem_img);
    nuvem.scale =0.6;
    nuvem.velocityX = -(2 + 3 * placar/100);
    nuvem.lifetime = 260;
    grnuvem.add(nuvem);
  }
}

function gerarObstaculos(){
  if(frameCount% 80 ===0){
    var cacto = createSprite(width,height-200,50,20);
    cacto.scale =0.5;
    //cacto.addImage(cacto_img);
   
    cacto.velocityX = -(4 + 3 * placar/100);

    var num = Math.round(random(1,6));//número aleatório

    //sorteando imagem do cacto
    switch(num){
      case 1:cacto.addImage(cacto1_img);
        cacto.scale =0.9;
        break;
      case 2:cacto.addImage(cacto2_img);
        cacto.scale =0.9;
        break;
      case 3:cacto.addImage(cacto3_img);
        break;
      case 4:cacto.addImage(cacto4_img);
        break;
      case 5:cacto.addImage(cacto5_img);
        break;
      case 6:cacto.addImage(cacto6_img);
        break;
        default:break;
    }
    grcacto.add(cacto);
    
    cacto.lifetime = 300;
    cacto.depth = trex.depth;
    trex.depth +=1;
  }
}
function reset() {
  trex.changeAnimation("correndo");  
  gamestate = play
  grnuvem.destroyEach();
  grcacto.destroyEach();
  placar = 0;
}






