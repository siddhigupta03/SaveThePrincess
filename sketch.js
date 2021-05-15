var instructions = 0;
var PLAY = 1;
var END = 2;
var gameState = instructions;

var princess, princessImg;

var ground, groundImg, iGround;

var soilder, soilderG, prince, princeG;

var gameOverS;

var princeImg;

var soilderImg;

var gameOver, gameOverImg;

var score = 0;

function preload() {
    gameOverS = loadSound("gameOver.mp4");
    princeImg = loadImage("prince.png");
    soilderImg = loadImage("soilder.png");
    princessImg = loadImage("princess.png");
    groundImg = loadImage("grass.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(1000,600);
    ground = createSprite(500,600,1000,30);
    ground.addImage(groundImg);
    ground.scale = 0.2;

    iGround = createSprite(500,590,1000,30);

    princess = createSprite(100,400);
    princess.addImage(princessImg);
    princess.scale = 0.05;
    
    gameOver = createSprite(500,200);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;

    princeG = new Group();
    soilderG = new Group();
}

function draw() {
    background(255);

    if(gameState === instructions) {
        background(255);
        texts();
        princess.visible = false;
        gameOver.visible = false;
        ground.visible = false;
        iGround.visible = false;

        if(keyDown("s")) {
            gameState = PLAY;
        }
    }

    princess.collide(iGround);

    if(gameState === PLAY) {
        iGround.visible = false;
        ground.visible = true;

    if(keyDown("space")) {
      princess.velocityY = -12;
    }
    princess.velocityY += 1;
    princess.visible = true;

    textSize(35);
    fill("black");
    text("Score: " + score, 50,50);

    gameOver.visible = false;

    if(princess.isTouching(princeG)) {
        score = score + 1;
        princeG.destroyEach();
    }

    if(princess.isTouching(soilderG)) {
        gameState = END;
        gameOverS.play();
        soilderG.destroyEach();
        princeG.destroyEach();
    }
    obstacle();
    scores();
}

    if(gameState === END) {
        gameOver.visible = true;
        princess.visible = false;
        ground.visible = false;

        textSize(55);
        fill("black");
        text("Press 'R' to restart.",250,400);
    }

    if(keyCode === 114 && gameState === END) {
        gameState = PLAY;
        reset();
    }

    drawSprites();
}

function obstacle() {
    if(frameCount % 200 === 0) {
        soilder= createSprite(1000,500,20,20);
        soilder.velocityX = -5;
        soilder.scale = 0.09;
        soilder.addImage(soilderImg);
        soilderG.add(soilder);
    }

}
function scores() {
    if(frameCount % 200 === 0) {
        prince = createSprite(1000,150,20,20);
        prince.velocityX = -5;
        prince.scale = 0.2;
        prince.addImage(princeImg);
        princeG.add(prince);
    }
   
}

function reset() {
    iGround.visible = false;
    princess.collide(iGround);

    if(keyDown("space")) {
      princess.velocityY = -12;
    }
    princess.velocityY += 1;
    princess.visible = true;

    textSize(35);
    fill("black");
    text("Scores: " + score, 50,50);

    score = 0;

    gameOver.visible = false;
}

function texts() {
    textSize(40);
    fill("black")
    text("GAME INSRUCTIONS", 20, 50);

    textSize(25);
    fill("black")
    text("1) Press 'SPACE' to jump.", 20, 120);

    textSize(25);
    fill("black");
    text("2) Collect prince to increment your score.", 20, 190);

    textSize(25);
    fill("black");
    text("3) Be careful from soilders!!", 20, 260);

    textSize(25);
    fill("black");
    text("4) If your game's over, then press 'R' to restart", 20, 330);

    textSize(25);
    fill("black");
    text("5) Wanna start the game? Press 's'.", 20, 400);

    textSize(65);
    fill("magenta");
    textFont("Bookman Old Style");
    text("ALL THE BEST!!", 250, 500);
}
