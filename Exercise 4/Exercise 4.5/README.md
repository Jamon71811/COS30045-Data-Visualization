# Exercise 4.5: Binding Data to SVGs

## Overview
This exercise was about connecting the CSV data directly to visual shapes. I created a function called `drawBarChart(data)`. Inside it, I used the D3 data-join pattern: `.selectAll("rect")`, `.data(data)`, and `.join("rect")`. This loop told D3 to create one SVG rectangle for every row of data in my dataset. I set a fixed height and spacing for the bars, but I used `d.count` to dynamically set the width of each bar. I also calculated the vertical `y` position mathematically using the index `(i)` so the bars would stack neatly on top of each other.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To understand the basic structure of the D3 data-join process.
* **Adaptations:** I placed the drawing logic inside a dedicated function to keep the code clean and only called it after the data was fully sorted.
* **Learnings:** I learned how to map data attributes to physical shape attributes, such as making the rectangle's width equal to the data's numerical value.
* **Limitations:** The hard-coded dimensions caused the bars to look squeezed, which showed me the need for dynamic scaling in future steps.