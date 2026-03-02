function setup() {
    textSize(32);
    fill(255);
    text('hi', 50, 50);
    canvas = createCanvas(500,500);
    console.log("hello words");

}

function draw() {
    //canvas = createCanvas(frameCount*5,500);
    background("black");
}
















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