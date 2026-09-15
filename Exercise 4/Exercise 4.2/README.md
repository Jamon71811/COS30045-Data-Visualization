# Exercise 4.2: D3 DOM Manipulation

## Overview
This exercise was about learning how to use the D3.js library to control elements on a webpage. First, I added the D3 script link into my `index.html` file. Then, I created a new JavaScript file called `main.js`. Inside this file, I used `d3.select("h1")` to target the main heading and changed its text color to green using `.style()`. After that, I used `.append("p")` to inject a new paragraph into an existing empty `<div>`. Finally, I used D3 to select an empty `<svg>` canvas and dynamically drew a blue rectangle inside it by setting its attributes through JavaScript.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To understand the basic syntax of D3 selections and element appending.
* **Adaptations:** I updated the text content and selected different HTML classes to match my own website structure.
* **Learnings:** I learned how D3 can interact directly with the Document Object Model (DOM) to create and style HTML elements without writing them manually in the HTML file.
* **Limitations:** The initial code from the AI targeted generic tags, so I had to specify the correct class names to make it work.