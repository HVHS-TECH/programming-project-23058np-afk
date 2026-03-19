
/*******************************************************/
// SETUP
/*******************************************************/
function setup() {
    createCanvas(500,500)
    textSize(24);
    textAlign(CENTER);
    fill(255,255,255);
    gameStarted = false;
    i = 0;
    u = 0;//arbitrary values! What do they do???
    
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
        P1Recharge();
        P2Recharge();
        P1PointerVisuals();
        P2PointerVisuals();
        showPlayerStats();
    } else {
        background(0,0,0);
        text("press space to start",250,250);
        if (kb.pressed("space")) {
            startGame();
        }
    }
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
//
/*******************************************************/

/*******************************************************/
//START GAME
/*******************************************************/
function startGame() {
    gameStarted = true;
    resizeCanvas(700,500);
    frameRate(60);
    textSize(14);
    setupPlayers();
    createWalls();
}
/*******************************************************/
//SETUP PLAYERS
/*******************************************************/
function setupPlayers() {
    allSprites.strokeWeight = 0
    player = new Group();
    player.strokeWeight = 4;
    player.drag = 15;
    player.moveSpeed = 12;
    player.charge = 5;
    player.health = 3;
    player.dead = false;
    player.overlaps(player);
    
    laser = new Group();
    // these two cannot go anywhere else. because i said so. (They are reference for the collision script in the draw loop before lasers are shot, and therefore need to have infinite life.)
    P1Laser = new laser.Sprite(width+50,0,12,710,'k');
    P2Laser = new laser.Sprite(width+50,0,12,710,'k');
    laser.life = 15;
    laser.overlaps(allSprites);
    
    laserTracer = new Group();
    laserTracer.life = 10;
    laserTracer.speed = 104.9;
    laserTracer.opacity = 1;
    laserTracer.overlaps(allSprites);

    laserPointer = new Group();
    laserPointer.rotationDirection = 1;
    laserPointer.opacity = 0.5;
    laserPointer.overlaps(allSprites);

    function createP1() {
        player1 = new player.Sprite(155,50,25,25,'d');
        player1.color =('red')
        player1.stroke = color(190,50,50);

        P1LaserPointer = new laserPointer.Sprite(player1.x,player1.y,12,'triangle');
        P1LaserPointer.color = ("red");
        P1LaserPointer.offset.y = -17;
    }

    function createP2() {
        player2 = new player.Sprite(550,450,25,25,'d');
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

    westWall = new wall.Sprite(105,height/2,5,500,'k');
    eastWall = new wall.Sprite(600,height/2,5,500,'k');
    southWall = new wall.Sprite(width/2,505,500,5,'k');
    northWall = new wall.Sprite(width/2,-5,500,5,'k'); //teese are invisible barriers
}

function P1PointerVisuals() {
    P1LaserPointer.x = player1.x;
    P1LaserPointer.y = player1.y; 
    if (kb.pressing("x")) { 
    P1LaserPointer.rotationSpeed = 0.6 * P1LaserPointer.rotationDirection;
    } else {
    P1LaserPointer.rotationSpeed = 9 * P1LaserPointer.rotationDirection;
    }  
    if (kb.released("x"))
        P1LaserPointer .rotationDirection *= -1
}

function P2PointerVisuals() {
    P2LaserPointer.x = player2.x;
    P2LaserPointer.y = player2.y; 
    if (kb.pressing(";")) { 
    P2LaserPointer.rotationSpeed = 0.6 * P2LaserPointer.rotationDirection;
    } else {
    P2LaserPointer.rotationSpeed = 9 * P2LaserPointer.rotationDirection;
    }  
    if (kb.released(";"))
        P2LaserPointer .rotationDirection *= -1
}

function showPlayerStats() {
    text(`P1 Charge: ${player1.charge}`,50,60);    
    text(`P1 Health: ${player1.health}`,50,80);
    text(`P2 Charge: ${player2.charge}`,650,60);    
    text(`P2 Health: ${player2.health}`,650,80);
}

function P1Recharge() {
    if (round(millis()/600 % 2)  == 1) {
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
    if (round(millis()/600 % 2)  == 1) {
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
    checkForAWin();
}

function checkForAWin() {
    if (player1.health == 0) {
        player.dead = true;
        player1.remove();
        P1LaserPointer.remove();
    }
    if (player2.health == 0) {
        player2.dead = true;
        player2.remove();
        P2LaserPointer.remove();
    }
}

function fireTracer(playerFiring) {
    if (playerFiring == 1) {
        P1tracer = new laserTracer.Sprite(player1.x,player1.y,7,105,'k')
        P1tracer.rotation = P1LaserPointer.rotation;
        P1tracer.direction = P1LaserPointer.rotation - 90;
        P1tracer.color = ("red");
        posX = player1.x
        posY = player1.y
        setTimeout (fireLaser,350,P1tracer.rotation,posX,posY,1);
    }
    if (playerFiring == 2) {
        P2tracer = new laserTracer.Sprite(player2.x,player2.y,7,105,'k')
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
        P1Laser = new laser.Sprite(posX,posY,12,710,'k');
        P1Laser.offset.y = -192.5;
        P1Laser.rotation = rotation;
        P1Laser.color = ("red");
    }
    if (playerFiring == 2) {
        P2Laser = new laser.Sprite(posX,posY,12,710,'k');
        P2Laser.offset.y = -192.5;
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

