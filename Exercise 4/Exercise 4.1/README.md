# Exercise 4.1: SVG Shapes and Coordinates

## Overview
In this exercise, I built an HTML page to draw a house and a garden using pure Scalable Vector Graphics (SVG) code. To do this, I set up an `<svg>` canvas with an 800x600 coordinate system. I used basic geometric tags like `<rect>` for the house walls, `<circle>` for the sun, and `<path>` to draw a curved road. Instead of writing the exact same code twice for the windows, I wrapped them in a `<g>` (group) tag and used the `transform="translate(x,y)"` attribute to move them into the correct positions. 

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To get the correct syntax for drawing SVG curves and basic shapes.
* **Adaptations:** I manually changed the exact X and Y coordinates to make sure the roof and walls aligned properly.
* **Learnings:** I learned that the SVG coordinate system starts with (0,0) at the top-left corner, and that elements written lower in the code will overlap earlier elements.
* **Limitations:** The AI-generated coordinates sometimes left small visual gaps between shapes, which required me to test and fix the numbers manually.