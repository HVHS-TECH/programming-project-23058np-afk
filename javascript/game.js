
/*Spamming game that requires you to spam left and right arrow keys as fast as you can, 
With theme of lighting a fire*/
// all setup vars here
let gameStarted = false;
let gameEnded = false;
let stickMovement = 0
let totalMovement = 0;
let friction = 0;
let controlText = `
Spam left & right arrow to increase heat.\n
Get to 50 heat to start a fire.\n
Start a fire quick as possible!
`;
const FRICTION_THRESHOLD = 50;

function setup() {  
    textSize(24);
    fill(255);
    stroke("white");
    textAlign(CENTER); 
    canvas = createCanvas(500,500);
    function beforeGame() { //variable scope defined?
        function createStartButton() {
            startButton = new Sprite(width/2,height/2,100*1.61,100,'s');
            startButton.color = ("white");
            startButton.text = ("Start Game");
            startButton.overlaps(allSprites);
        }

        function createControlButton() {
            controlButton = new Sprite(width/2,100,150,50,'s');
            controlButton.color = ("white");
            controlButton.text = ("Controls");
        }

        function createStick() {
                stick = new Sprite(width/2,height/2+25,10,100,'s');
                stick.color = ("rgb(77, 59, 32)");
                stick.strokeWeight = 0;
                stick.visible = false;
                stick.offset.y = -45;
        }

        function createCamp() {
            campfire = new Sprite(width/2,height/2+25,0,0,"n");
            campfire.image = '../assets/images/campfire.jpg';
            campfire.image.scale = 0.3;
            campfire.layer = 0;
            campfire.visible = false;
        }

        createStick();
        createCamp();
        createStartButton();
        createControlButton();
    }
    beforeGame();
}

function startGame() {
    gameStarted = true;
    secondsToStart = millis() / 1000,1; // "starts" a timer made more clear within showTimeToWin()

    function updateGameVisuals () {
        campfire.visible = true;
        stick.visible = true;
        startButton.remove();
        controlButton.remove();
    }
    updateGameVisuals
    changeGameState();

}

function endGame() {
    function showTimeToWin() {
        if (gameEnded == false) {
            seconds = millis() / 1000;
            secondsToWin = round(seconds - secondsToStart,1);
            gameEnded = true;       
            text(`took ${secondsToWin} to win\nctrl + r to restart`,width/2, 400);   
            textSize(32);
        }
    }

    function makeWinningEmberJelliesOfVictory() {
        WinningEmberJellyOfVictory = new Sprite(width/2,height/2+25,10,'d');
        WinningEmberJellyOfVictory.color = color(255,random(160,170),random(59,67));
        WinningEmberJellyOfVictory.strokeWeight = 0;
        WinningEmberJellyOfVictory.scale = random(1,2);
        WinningEmberJellyOfVictory.life = random(60,100);
        WinningEmberJellyOfVictory.drag.x = 0.001;
        WinningEmberJellyOfVictory.vel.x += random(0.3,-0.3)
        WinningEmberJellyOfVictory.vel.y -= random(0.01,0.3)
        WinningEmberJellyOfVictory.opacity = 0.5;
        WinningEmberJellyOfVictory.overlaps(allSprites);
    }
    for (i=0; i<1; i++) { //doubles up on embers.
        makeWinningEmberJelliesOfVictory();
    }
    showTimeToWin();
}

function draw() {
    textSize(100);
    if (gameStarted == true) { 
        background(230,230,230);

        function updateStick() {
            left = Math.min(kb.pressing("left"),1);
            right = Math.min(kb.pressing("right"),1);
            stickSide = (left - right); 
            stick.rotation = -15*stickSide;
        }

        function updateFriction() {
            if (gameEnded == false) {
                totalMovement = stickMovement - stickSide;
                stickMovement = stickSide;
                frictionIncrement = Math.abs(totalMovement); //increment cannot be negative
                friction = friction + frictionIncrement;                
                totalMovement = 0; 
                text(friction, width/2,100);
                //this lets it update score when stick move back as well as forth
            } else {
                text("winnder!", width/2, 100);
            }
        }

        updateStick();        
        updateFriction();
        if (friction >= FRICTION_THRESHOLD) {
            endGame();
        }
    } else {
        background("rgb(0, 0, 0)");
        if (startButton.mouse.pressed()) {
            startGame();
        }
        if (controlButton.mouse.pressed()) {
            function showControl() {
                controlButton.scale = 3;
                controlButton.text = (controlText);
            } //tested spamming this: no issues
            showControl()
        }
    } 
}