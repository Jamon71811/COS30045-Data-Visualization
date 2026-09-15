# Exercise 4.6: Scaling Charts

## Overview
Because hard-coded sizes don't work well for large datasets, I updated the chart to use D3 scales. I created a `d3.scaleLinear()` for the x-axis. This tool takes the maximum numerical value in the data (domain) and mathematically shrinks it to fit exactly within a 500-pixel wide canvas (range). For the y-axis, I used `d3.scaleBand()`. This scale took the list of all TV brands and evenly distributed them across the height of the canvas, automatically calculating the perfect bar thickness and adding a 10% gap (`.padding(0.1)`) between them. I then updated the drawing code to use these scales for the width, height, and y-coordinates.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To get the correct syntax for linear and band scales in D3.
* **Adaptations:** I manually adjusted the domain and range numbers to ensure the longest bar didn't hit the right edge of the screen.
* **Learnings:** I learned how D3 scales automatically handle the complex math needed to fit data of any size into a fixed pixel area.
* **Limitations:** The AI provided generic pixel ranges, so I had to experiment in the browser to find the best dimensions for my specific chart.