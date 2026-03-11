function setup() {  
    rgbR = 230;
    rgbG = 230;
    rgbB = 230;
    gameStarted = false;
    textSize(24);
    fill(255);
    stroke("white");
    canvas = createCanvas(500,500);
    startButton = new Sprite(width/2,height/2,100*1.61,100,'s');
    console.log(startButton);
    startButton.color = ("white");
    startButton.text = ("Start Game");
    startButton.overlaps(allSprites);
    stick = new Sprite(width/2,height/2,10,100);
    stick.color = ("rgb(77, 59, 32)");
    stick.strokeWeight = 0;
    stick.opacity = 0;
}
stickMovement = 0;
totalMovement = 0;
friction = 0;
frictionIncrement = 0;
fireStarted = true;
frictionThreshold = 10;
function draw() {
    if (gameStarted == true) { 
     
        background(rgbR, rgbG, rgbB);
        function getStickOrientation() {
            left = Math.min(kb.pressing("left"),1);
            right = Math.min(kb.pressing("right"),1);
            stickSide = (left - right);
        }

        function moveStick() {
            if (stickSide != stickMovement) {
                totalMovement = stickMovement - stickSide
            }
            return totalMovement
            
        }
        totalMovement = 0; // why does it break if not here?
        function generateFriction () {
            frictionIncrement = Math.abs(totalMovement);
            friction = friction + frictionIncrement;
            text(friction, 50,50);
            function checkThreshold() {
                function startFire() {
                    fireStarted = true;
                }
                if (friction >= frictionThreshold) {
                    startFire();
                }
            }
            checkThreshold();
        }
        endGame() {

        }
        function stickVisuals() {
        stick.opacity += 0.03;
        stick.x = width/2-50*stickSide;
        }

        // Running functions seperater
        
        getStickOrientation();
        moveStick(); 
        if (fireStarted == true) {
            endGame();
        }
        generateFriction();
        stickVisuals(); //Must be last to run
        stickMovement = stickSide;// this has to go even laster.. idk
    } else {
        background("rgb(0, 0, 0)");
        if (startButton.mouse.pressed()) {
        startGame();
        }
    }
}
/*
left to right
it need to track when and how far you go left to right
*/
function startGame() {
    gameStarted = true;
    startButton.remove();
}
// variable startButton can be referred to  as t or testB or test in the code after  declaration if there are no other variables that shaare theese letters. use as little as possible

/* 
p5.play sprite modifers pulled from chat gpt because i couldnt find them online. I think you have to create some account for it, and it need your student id/

In p5.play (and the modern p5play library), sprites are the core building blocks for 2D games, featuring various modifiers to change their appearance, physical behavior, movement, and interactions. 
Here is a breakdown of key sprite modifiers:
1. Appearance and Visual Modifiers
.addAnimation() / .addAni(): Adds animations to a sprite.
.image / .img: Sets a static image for the sprite.
.color / .shapeColor: Changes the color of a default rectangle/circle sprite.
.scale: Uniformly scales the sprite's visual appearance and collider.
.rotation: Sets the sprite's rotation angle.
.visible: A boolean (true/false) to hide or show a sprite.
.layer: Determines the draw order (higher numbers are drawn on top).
.opacity: Sets the transparency of the sprite. 

2. Movement and Position Modifiers
.x, .y: Directly sets the position of the sprite.
.velocity.x, .velocity.y / .vel: Sets the movement speed in pixels per frame.
.speed & .direction: Controls movement using angle and speed.
.moveTowards() / .moveTo(): Moves a sprite towards a target point.
.rotateTo(): Rotates the sprite towards an angle or direction.
.friction: Determines how quickly a sprite slows down.
.rotationSpeed: Sets the speed at which a sprite rotates. 

3. Physics and Collision Modifiers
.collider: Defines the active area for interactions ("static", "dynamic", "kinematic", "none").
.setCollider(type, offsetX, offsetY, width, height): Defines the shape (rectangle, circle) and size of the hitbox.
.debug: Set to true to visualize the collider hitbox.
.mass: Affects how the sprite behaves in collisions with others.
.bounciness: Determines how much energy is retained in a collision.
.rotationLock: Prevents the sprite from rotating due to physics collisions. 

4. Interaction Modifiers
.collides(): Detects if a sprite has touched another; returns true only on the first frame of contact.
.colliding(): Returns true every frame two sprites are touching.
.collided(): Returns true when two sprites are no longer touching.
.overlap(): Similar to collide, but allows sprites to pass through each other while detecting the interaction. 

5. Life and Group Modifiers
.life: Sets the number of frames before a sprite is automatically removed.
.remove(): Immediately removes the sprite from the sketch.
.group: Adds the sprite to a group for collective modification.
*/















/*
-- Game planning -- 18 spells left
-- main game --
-- Goal --
The main goal of this game is to spin a bow drill to create fire. The longer you keep the fire going the more points you get

-- Creating Fire --
By spinning the bow drill you create friction. Friction must reach a certain threshold to start the fire. 
    
You can generate Friction by pressing left and right arrow keys in alternating order. This spins the bow drill.


extra as well
-- Maintaining the fire --
this meter is the 'health bar'. 
You can keep the fire up by blowing on it and feeding it sticks.

-- extra --
Weather and Wind - can be done later
There are two enviromental factors within the game:
- Weather (rain, storm, sunny, etc), which is the 'difficulty' of the game. 
- Wind is a variable factor that creates a challenge to the players fire. A wind will come from any of the 4 cardinal directions to try 
  blow the fire out, but you have one barricade that can be adjusted to shelter the fire from the wind. For gameplay reasons 
  the barricade is fireproof.
  - The worse the wind is the less time you have to react. wind gets worse over time. and is the main difficulty scalar which makes 
    scores more than how much time you put into a motonous task.
    
- you get bonus points the worse the weather is
- The Friction threshold is determined by the weather and wind.
*/