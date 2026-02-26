function setup() {
    canvas = createCanvas(500,500);
    console.log("hello words");

}

function draw() {
    //canvas = createCanvas(frameCount*5,500);
    background("black");
}

/*
-- Game planning --
General goal is to spin a bow drill to create fire. The longer you keep the fire going the more points you get

-- How fire is started --
By spinning the bow drill you create friction. Friction must reach a certain threshold to start the fire
    - This friction threshold is determined by the weather and wind.

-- Maintaining the fire --
- Heat meter -
this meter is the 'health bar'. 
You can keep the fire up by blowing on it and feeding it sticks.

Weather and Wind
There are two enviromental factors within the game:
- Weather (rain, storm, sunny, etc), which is the 'difficulty' of the game. 
- Wind is a variable factor that creates a challenge to the players fire. A wind will come from any of the 4 cardinal directions to try 
  blow the fire out, but you have one barricade that can be adjusted to shelter the fire from the wind. For gameplay reasons 
  the barricade is fireproof.
  - The worse the wind is the less time you have to react. wind gets worse over time. and is the main difficulty scalar which makes 
    scores more than how much time you put into a motonous task.

- you get bonus points the worse the weather is
*/