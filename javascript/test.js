
/*******************************************************/
// SETUP
/*******************************************************/
padding = 25
function setup() {
    createCanvas(windowWidth-padding,windowHeight-padding)
    gameMessage = "Press Space to Start"
    gameStarted = false;
    i = 0;
    u = 0;//arbitrary values! What do they do???

    /*chargebar1 = new Sprite(width/2,height/2, 40,80);
    chargebar2 = new Sprite(width/2,height/2, 40,80);
    chargebar3 = new Sprite(width/2,height/2, 40,80);
    chargebar4 = new Sprite(width/2,height/2, 40,80);
    chargebar5 = new Sprite(width/2,height/2, 40,80);
*/ 
    
    
} 

/*******************************************************/
// DRAW
/*******************************************************/
function draw() {
    if (gameStarted == true) {
        background(230,230,230);
        fill(0,0,0);
        textSize(16);
        
        if (player1.overlaps(P2Laser)) {
            hit(1)
        } 
        if (player2.overlaps(P1Laser)) {
            hit(2)
        } 
        playerDeathSparks.opacity -= 0.1
        P1Recharge();
        P2Recharge();
        P1PointerVisuals();
        P2PointerVisuals();
        showPlayerStats();
        if (millis())
    } else {
        background(0,0,0);
        fill(255,255,255);
        textSize(24);
        textAlign(CENTER);
        
        text(gameMessage,width/2,height/2); // gameMessage is set when player 1 or 2 dies and at the start of the game in setup(). GameMessage shows who won.
        if (kb.pressed("space")) {
            startGame();
        }
    }
}
function P1PointerVisuals() {
    P1LaserPointer.x = player1.x;
    P1LaserPointer.y = player1.y; 
    if (kb.pressing("x")) { 
    P1LaserPointer.rotationSpeed = 0.4 * P1LaserPointer.rotationDirection;
    } else {
    P1LaserPointer.rotationSpeed = 7.5 * P1LaserPointer.rotationDirection;
    }  
    if (kb.released("x"))
        P1LaserPointer .rotationDirection *= -1
}

function P2PointerVisuals() {
    P2LaserPointer.x = player2.x;
    P2LaserPointer.y = player2.y; 
    if (kb.pressing(";")) { 
    P2LaserPointer.rotationSpeed = 0.4 * P2LaserPointer.rotationDirection;
    } else {
    P2LaserPointer.rotationSpeed = 7.5 * P2LaserPointer.rotationDirection;
    }  
    if (kb.released(";"))
        P2LaserPointer .rotationDirection *= -1
}
function P1Recharge() {
    if (round(millis()/450 % 2)  == 1) {
        if (i == 1) {
            if (player1.charge < 5) {
                player1.charge += 1;
            }
            i = 0;
        } 
        } else {
            i = 1;
        }
}

function P2Recharge() {
    if (round(millis()/400 % 2)  == 1) {
        if (u == 1) {
            if (player2.charge < 5) {
                player2.charge += 1;
            }
            u = 0;
        } 
        } else {
            u = 1;
        }
}

function showPlayerStats() {
    text(`P1 Charge: ${player1.charge}`,50,60);    
    text(`P1 Health: ${player1.health}`,50,80);
    text(`P2 Charge: ${player2.charge}`,650,60);    
    text(`P2 Health: ${player2.health}`,650,80);
}

/*******************************************************/
//INPUT
/*******************************************************/
function keyPressed() {
    if (gameStarted == true) {
    //P1 CONTROLS
    function P1Controls() {
        if (player1.charge != 0 && !kb.pressing("x")) {
            if (kb.presses("a")) {
                player1.vel.x = -player1.moveSpeed;
                chargeDown(1);
            }
            if (kb.presses("d")) {
                player1.vel.x = player1.moveSpeed;
                chargeDown(1);
            }
            if (kb.presses("w")) {
                player1.vel.y = -player1.moveSpeed;
                chargeDown(1);
            }
            if (kb.presses("s")) {
                player1.vel.y = player1.moveSpeed;
                chargeDown(1);
            }
        }
        if (player1.charge != 0 ) {    
            if (kb.presses("c")) {
                fireTracer(1);
                chargeDown(1);
            }
        }
    }
    //P2 INPUT
    function P2Controls() {
        if (player2.charge != 0 && !kb.pressing(";")) {
            if (kb.presses("arrowLeft")) {
                player2.vel.x = -player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("arrowRight")) {
                player2.vel.x = player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("arrowUp")) {
                player2.vel.y = -player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("arrowDown")) {
                player2.vel.y = player2.moveSpeed;
                chargeDown(2);
            }
        }
        if (player2.charge != 0 ) {    
            if (kb.presses("/")) {
                fireTracer(2);
                chargeDown(2);
            }
        }
    }
    if (player1.dead == false) {
        P1Controls();
    }
    if (player2.dead == false) {
        P2Controls();
    }  
    }
    
}

/*******************************************************/
//START GAME 
/*******************************************************/
function startGame() {
    
    gameStarted = true;
    frameRate(60);
    textSize(14);
    setupPlayers();
    createWalls();
    laser.opacity = 1;
}

/*******************************************************/
//SETUP PLAYERS
/*******************************************************/
function setupPlayers() {
    allSprites.strokeWeight = 0
    player = new Group();
    player.strokeWeight = 4;
    player.drag = 15;
    player.moveSpeed = 15;
    player.charge = 50;
    player.layer = 1;
    player.health = 3;
    player.dead = false;
    player.overlaps(player);

    playerDeathSparks = new Group();
    playerDeathSparks.speed = 0.1
    
    laser = new Group();
    // these two cannot go anywhere else. because i said so. (They are reference for the collision script in the draw loop before lasers are shot, and therefore need to have infinite life.)
    P1Laser = new laser.Sprite(width+50,0,12,710,'k');
    P2Laser = new laser.Sprite(width+50,0,12,710,'k');
    laser.layer = 0;
    laser.life = 15;
    laser.overlaps(allSprites);
    
    laserTracer = new Group();
    laserTracer.life = 10;
    laserTracer.speed = 400;
    laserTracer.opacity = 0.9;
    laserTracer.overlaps(allSprites);
    laserTracer.layer =0;

    laserPointer = new Group();
    laserPointer.rotationDirection = 1;
    laserPointer.opacity = 0.5;
    laserPointer.overlaps(allSprites);
    laserPointer.layer = 1;

    function createP1() {
        player1 = new player.Sprite(width*0.26,height*0.05,25,25,'d');
        player1.color =('red')
        player1.stroke = color(190,50,50);

        P1LaserPointer = new laserPointer.Sprite(player1.x,player1.y,12,'triangle');
        P1LaserPointer.color = ("red");
        P1LaserPointer.offset.y = -17;
    }

    function createP2() {
        player2 = new player.Sprite(width*0.74,height*0.95,25,25,'d');
        player2.color =('blue')
        player2.stroke = color(24,18,222);

        P2LaserPointer = new laserPointer.Sprite(player2.x,player2.y,12,'triangle',);
        P2LaserPointer.color = ("blue");
        P2LaserPointer.offset.y = -17;
        P2LaserPointer.rotation += 180;//for symmetry in relation to the other pointer
    }

    createP1();
    createP2();
}

function createWalls() {
    wall = new Group();
    wall.opacity = 0.1;
    wall.color = ("black")

    westWall = new wall.Sprite(width*0.23,height/2,5,height,'k');
    eastWall = new wall.Sprite(width*0.77,height/2,5,height,'k');
    southWall = new wall.Sprite(width/2,height+2.5,width,5,'k');
    northWall = new wall.Sprite(width/2,-2.5,width,5,'k');
}

function endGame(msg) {
    laser.opacity = 0;
    allSprites.remove();
    gameStarted = false;
    gameMessage = msg; 
}

function hit(playerHit) {
    if (playerHit == 1) {
        player1.health -= 1;
        player1.text = ("owch");
        function unOwch() {
            player1.text = ("");
        }     
        setTimeout(unOwch,500)
    }
    if (playerHit == 2) {
        player2.health -= 1;
        player2.text = ("owch");
        function unOwch() {
            player2.text = ("");
        }     
        setTimeout(unOwch,500)
    }
    checkPlayerLife();
}

function checkPlayerLife() {
    if (player1.health == 0) {
        player.dead = true;
        for (i = 0; i < 37; i++) {
            P1DeathSparks = new playerDeathSparks.Sprite(player1.x,player1.y, 5,'n');
            P1DeathSparks.direction = i * 10;
            P1DeathSparks.speed = random(4.3,5.7)
            P1DeathSparks.color = ("red");
        }
        player1.remove();
        P1LaserPointer.remove();
        setTimeout(endGame,1000,"Player 2 wins. \n Press Space to restart.");
    }
    if (player2.health == 0) {
        player2.dead = true;
        for (i = 0; i < 37; i++) {
            P2DeathSparks = new playerDeathSparks.Sprite(player2.x,player2.y, 5,'n');
            P2DeathSparks.direction = i * 10;
            P2DeathSparks.speed = random(4.3,5.7)
            P2DeathSparks.color = ("blue");
        }
        player2.remove();
        P2LaserPointer.remove();
        setTimeout(endGame,1000,"Player 1 wins. \n Press Space to restart.")
    }
}

function fireTracer(playerFiring) {
    if (playerFiring == 1) {
        P1tracer = new laserTracer.Sprite(player1.x,player1.y,7,140,'k')
        P1tracer.rotation = P1LaserPointer.rotation;
        P1tracer.direction = P1LaserPointer.rotation - 90;
        P1tracer.color = ("red");
        posX = player1.x
        posY = player1.y
        setTimeout (fireLaser,350,P1tracer.rotation,posX,posY,1);
    }
    if (playerFiring == 2) {
        P2tracer = new laserTracer.Sprite(player2.x,player2.y,7,140,'k')
        P2tracer.rotation = P2LaserPointer.rotation;
        P2tracer.direction = P2LaserPointer.rotation - 90;
        P2tracer.color = ("blue");
        posX = player2.x
        posY = player2.y
        setTimeout (fireLaser,350,P2tracer.rotation,posX,posY,2);
    }
}

function fireLaser(rotation,posX,posY,playerFiring) {
    if (playerFiring == 1) {
        P1Laser = new laser.Sprite(posX,posY,12,2000,'k');
        P1Laser.offset.y = -515;
        P1Laser.rotation = rotation;
        P1Laser.color = ("red");
    }
    if (playerFiring == 2) {
        P2Laser = new laser.Sprite(posX,posY,12,2000,'k');
        P2Laser.offset.y = -515;
        P2Laser.rotation = rotation;  
        P2Laser.color = ("blue");
    }
    
}

function chargeDown(playerFiring) {
    if (playerFiring == 1) {
        player1.charge -= 1;
    }
    if (playerFiring == 2) {
        player2.charge -= 1;
    }
}

