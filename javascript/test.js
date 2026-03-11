function setup() {
    createCanvas(500,500);
    frameRate(40);
    player1 = new Sprite(width/2,height/2,25,25);
    player1.color = color(255,0,0);
    player1.stroke = color(0, 0, 0); 
    player1.strokeWeight = 4;
    player1.stroke = color(190,70,70);
    player1.drag = 24;
    player1Speed = 16;
    player1Charge = 2
    startTime=0;
    time = 0;
    
} 
function draw() {
    background(230,230,230);
    text(`Player Speed: ${player1Speed}`,50,50)
    text(`Charge: ${player1Charge}`,50,60);
    elapsed = (millis() - startTime) / 1000;
    text(int(elapsed), 50, 70);
    text(int(frameCount),50,80);
    time = time + frameCount%40;
    text("time " + int(time),50,90);
     
}
function chargesys() {
        function fire() {
            player1.color = ("green");
        }
        if (player1Charge > 0) {
            fire();
        } else {
            player1.color = ("red")
            console.log("nocharge");
        }
    }
//player1.color = ("green");
  //      player1.stroke = color(70,190,70)

//player1.color = ("green");
  //      player1.stroke = color(70,190,70);
function keyPressed() {
    if (kb.presses("r")) {
        
    }
    if (kb.presses("left")) {
        player1.vel.x = -player1Speed;
    }
    if (kb.presses("right")) {
        player1.vel.x = player1Speed;
    }
    if (kb.presses("up")) {
        player1.vel.y = -player1Speed;
    }
    if (kb.presses("down")) {
        player1.vel.y = player1Speed;
    }
    if (kb.presses("1")) {
        player1Speed += 1;
    }
    if (kb.presses("2")) {
        player1Speed -= 1;
    }
    if (kb.presses("shift")) {
        chargesys();
        player1Charge  -= 1;
    }
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