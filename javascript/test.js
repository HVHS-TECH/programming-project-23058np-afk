function setup() {
    createCanvas(500,500);
    frameRate(60);
    allSprites.strokeWeight = 0
    allSprites.overlaps(allSprites);

    player = new Group();
    player.strokeWeight = 4;
    player.drag = 24;
    player.moveSpeed = 16;
    player.charge = 999
    

    player1 = new player.Sprite(450,450,25,25,'d');
    player1.color =('red')
    player1.stroke = color(190,50,50);

    player2 = new player.Sprite(50,50,25,25,'d');
    player2.color =('blue')
    player2.stroke = color(24,18,222);
    
    laser = new Group();
    laser.life = 40
    laser.overlaps(allSprites)

    laserPointer = new Group();
    laserPointer.overlaps(allSprites);
    laserPointer.rotationDirection = 1

    laserPointerP1 = new laserPointer.Sprite(player1.x,player1.y,12,'triangle',);
    laserPointerP1.color = ("red");
    laserPointerP1.offset.y = -17;


    wall = new Group();
    wall.opacity = 0;

    wall1 = new wall.Sprite(-5,height/2,5,500,'k');
    wall2 = new wall.Sprite(505,height/2,5,500,'k');
    wall3 = new wall.Sprite(width/2,505,500,5,'k');
    wall4 = new wall.Sprite(width/2,-5,500,5,'k'); //teese are invisible barriers

    
} 

function draw() {
    background(230,230,230);
    text(`Player Speed: ${player1.moveSpeed}`,50,50)
    text(`Charge: ${player1.charge}`,50,60);    
    function pointerVisuals() {
        laserPointerP1.x = player1.x;
        laserPointerP1.y = player1.y; 
        
        if (kb.pressing(".")) { 
        laserPointerP1.rotationSpeed = 0.6 * laserPointerP1.rotationDirection;
        } else {
        laserPointerP1.rotationSpeed = 9 * laserPointerP1.rotationDirection;
        }  
        if (kb.released("."))
            laserPointerP1 .rotationDirection *= -1
    }
    function p1reCharge () {
        if (round(millis()/300 % 2)  == 1) {
        if (key == 1) {
            console.log("charge");
            if (player1.charge < 5) {
                player1.charge += 1;
            }
            key = 0;
        }
        
    } else {
        key = 1;
    }
    }
    p1reCharge();
    pointerVisuals ();

}

function keyPressed() {
    function p1ChargeDown() {
    player1.charge -= 1;
    }
    function fire() {
    if (player1.charge != 0) {
        laser1 = new laser.Sprite(player1.x,player1.y,12,710,'k');
        laser1.offset.y = -192.5;
        laser1.rotation = laserPointerP1.rotation;  
    }
}
    if (player1.charge != 0) {
        if (kb.presses("arrowLeft")) {
            player1.vel.x = -player1.moveSpeed;
            p1ChargeDown();
        }
        if (kb.presses("arrowRight")) {
            player1.vel.x = player1.moveSpeed;
            p1ChargeDown();
        }
        if (kb.presses("arrowUp")) {
            player1.vel.y = -player1.moveSpeed;
            p1ChargeDown();
        }
        if (kb.presses("arrowDown")) {
            player1.vel.y = player1.moveSpeed;
            p1ChargeDown();
        }
        if (kb.presses("/")) {
            p1ChargeDown();
            fire();
        }
    
    }
   
}
