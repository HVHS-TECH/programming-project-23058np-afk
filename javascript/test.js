
function setup() {
    createCanvas(500,500);
    frameRate(60);
    allSprites.strokeWeight = 0
    allSprites.overlap(allSprites);
    

    player = new Group();
    player.strokeWeight = 4;
    player.drag = 15;
    player.moveSpeed = 12;
    player.charge = 5;
    player.health = 3;
    player.dead = false;
    
    laser = new Group();
    laser.life = 15;
    laser.overlaps(allSprites);

    laserTracer = new Group();
    laserTracer.overlaps(allSprites);
    laserTracer.life = 10;
    laserTracer.speed = 90;
    
    laserPointer = new Group();
    laserPointer.overlaps(allSprites);
    laserPointer.rotationDirection = 1;

    function createP1() {
        player1 = new player.Sprite(450,450,25,25,'d');
        player1.color =('red')
        player1.stroke = color(190,50,50);

        P1LaserPointer = new laserPointer.Sprite(player1.x,player1.y,12,'triangle',);
        P1LaserPointer.color = ("red");
        P1LaserPointer.offset.y = -17;
    }
    
    function createP2() {
        player2 = new player.Sprite(50,50,25,25,'d');
        player2.color =('blue')
        player2.stroke = color(24,18,222);

        P2LaserPointer = new laserPointer.Sprite(player2.x,player2.y,12,'triangle',);
        P2LaserPointer.color = ("blue");
        P2LaserPointer.offset.y = -17;
        P2LaserPointer.rotationDirection = -1;
        P2LaserPointer.rotation += 180;//for symmetry

    }
    
    
    function createWalls() {
        wall = new Group();
        wall.opacity = 0;

        westWall = new wall.Sprite(-5,height/2,5,500,'k');
        eastWall = new wall.Sprite(505,height/2,5,500,'k');
        southWall = new wall.Sprite(width/2,505,500,5,'k');
        northWall = new wall.Sprite(width/2,-5,500,5,'k'); //teese are invisible barriers
    }
    createP1();
    createP2();
    createWalls();
} 

function draw() {
    background(230,230,230);
    text(`Charge: ${player1.charge}`,50,60);    
    text(`health ${player2.health}`,50,70)
    if (frameCount % 40  == 1) {
        P1Laser = new laser.Sprite(width+50,player1.y,12,710,'k');
        P2Laser = new laser.Sprite(width+50,player1.y,12,710,'k');
    }
    if (player1.overlaps(P2Laser)) {
        hit(1)
    } 
    if (player2.overlaps(P1Laser)) {
        hit(2)
    } 
    function P1PointerVisuals() {
        P1LaserPointer.x = player1.x;
        P1LaserPointer.y = player1.y; 
        if (kb.pressing(";")) { 
        P1LaserPointer.rotationSpeed = 0.6 * P1LaserPointer.rotationDirection;
        } else {
        P1LaserPointer.rotationSpeed = 9 * P1LaserPointer.rotationDirection;
        }  
        if (kb.released(";"))
            P1LaserPointer .rotationDirection *= -1
    }
    function P2PointerVisuals() {
        P2LaserPointer.x = player2.x;
        P2LaserPointer.y = player2.y; 
        if (kb.pressing("x")) { 
        P2LaserPointer.rotationSpeed = 0.6 * P2LaserPointer.rotationDirection;
        } else {
        P2LaserPointer.rotationSpeed = 9 * P2LaserPointer.rotationDirection;
        }  
        if (kb.released("x"))
            P2LaserPointer .rotationDirection *= -1
    }
    function P1Recharge() {
        if (round(millis()/300 % 2)  == 1) {
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
        if (round(millis()/300 % 2)  == 1) {
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
    P1Recharge();
    P2Recharge();
    P1PointerVisuals();
    P2PointerVisuals();

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
function hit(playerHit) {
    if (playerHit == 1) {
        player1.health -= 1;
        
    }
    if (playerHit == 2) {
        player2.health -= 1;
    }
    checkForAWin();
}
function fireLaser(rotation,posX,posY,playerFiring) {
    if (playerFiring == 1) {
        P1Laser = new laser.Sprite(posX,posY,12,710,'k');
        P1Laser.offset.y = -192.5;
        P1Laser.rotation = rotation;
    }
    if (playerFiring == 2) {
        P2Laser = new laser.Sprite(posX,posY,12,710,'k');
        P2Laser.offset.y = -192.5;
        P2Laser.rotation = rotation;  
    }
    
}
function fireTracer(playerFiring) {
    if (playerFiring == 1) {
        P1tracer = new laserTracer.Sprite(player1.x,player1.y,7,105,'k')
        P1tracer.rotation = P1LaserPointer.rotation;
        P1tracer.direction = P1LaserPointer.rotation - 90;
        posX = player1.x
        posY = player1.y
        setTimeout (fireLaser,350,P1tracer.rotation,posX,posY,1);
    }
    if (playerFiring == 2) {
        P2tracer = new laserTracer.Sprite(player2.x,player2.y,7,105,'k')
        P2tracer.rotation = P2LaserPointer.rotation;
        P2tracer.direction = P2LaserPointer.rotation - 90;
        posX = player2.x
        posY = player2.y
        setTimeout (fireLaser,350,P2tracer.rotation,posX,posY,2);
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
function keyPressed() {
    function P1Controls() {
        if (player1.charge != 0 && !kb.pressing(";")) {
        if (kb.presses("arrowLeft")) {
            player1.vel.x = -player1.moveSpeed;
            chargeDown(1);
        }
        if (kb.presses("arrowRight")) {
            player1.vel.x = player1.moveSpeed;
            chargeDown(1);
        }
        if (kb.presses("arrowUp")) {
            player1.vel.y = -player1.moveSpeed;
            chargeDown(1);
        }
        if (kb.presses("arrowDown")) {
            player1.vel.y = player1.moveSpeed;
            chargeDown(1);
        }
    }
    
    if (player1.charge != 0 ) {    
        if (kb.presses("/")) {
            fireTracer(1);
            chargeDown(1);
        }
    }
    }
    function P2Controls() {
        if (player2.charge != 0 && !kb.pressing("x")) {
            if (kb.presses("a")) {
                player2.vel.x = -player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("d")) {
                player2.vel.x = player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("w")) {
                player2.vel.y = -player2.moveSpeed;
                chargeDown(2);
            }
            if (kb.presses("s")) {
                player2.vel.y = player2.moveSpeed;
                chargeDown(2);
            }
    }
        if (player2.charge != 0 ) {    
            if (kb.presses("c")) {
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
