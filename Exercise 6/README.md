# Exercise 6 – Interactive Visualisations

## Overview
In this exercise you will build **interactive data visualisations using D3.js**. Interaction allows users to explore the data and gain deeper insights through features such as filtering and tooltips.

Use the **same repository you forked earlier for this unit** and complete this exercise inside the **Exercise 6 folder**.

---

## Exercise 6.1 – Interactive Histogram: Filtering

### Aim
Build a histogram and add **interactive filters**.

### Purpose
Interaction is one of the key advantages of visualisations on the web. In this exercise you will build a **histogram using the TV dataset** and allow users to filter the data.

Users should be able to explore energy consumption for different TV screen technologies such as:

- LCD
- LED
- OLED

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Exercise 6.2 – Interactive Scatterplot: Tooltips

### Aim
Build a scatterplot and add **tooltips and colour coding**.

### Purpose
Tooltips are one of the most common interactive features in data visualisations. In this exercise you will create a **scatterplot using the TV dataset**.

The chart should allow users to explore the relationship between:

- Energy consumption
- Star rating
- Screen size
- Screen technology

Tooltips should display additional information such as **screen size**, and colours should represent **screen type**.

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Instructions

1. Open your **existing forked repository**.
2. Navigate to the **Exercise 6 folder**.
3. Add the files needed to implement the histogram and scatterplot.
4. Implement the required interactive features using **D3.js**.
5. Commit and push your changes regularly to GitHub.

Your forked repository will serve as your **submission record**.

## Overview
In this exercise, I built a highly interactive data visualization dashboard using D3.js, focusing on data filtering and user interactions. 

First, I created a **Histogram** to display the frequency distribution of TV energy consumption. I then added interactive **Filter Buttons** that allow users to filter the dataset by Screen Technology and Screen Size, utilizing D3's smooth transitions and dynamic Y-axis rescaling. Next, I built a **Scatterplot** to explore the relationship between Star Ratings and Energy Consumption, applying a categorical color scale for different screen types. Finally, I integrated an advanced, multi-line **Interactive Tooltip** that reveals specific TV details (Brand, Model, Size, Tech) upon hovering over data points. The entire dashboard was styled with a professional, cohesive UI (Navy, Orange, and Yellow theme) featuring hover effects and dynamic "Total TVs" counters.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To assist with understanding advanced D3.js interactivity, specifically the `.join()` pattern for smooth data transitions, dynamic axis rescaling, and absolute positioning for interactive tooltips.
* **Adaptations:** I heavily customized the UI/UX to match a modern dashboard aesthetic and completely separated the filtering logic so that the scatterplot and histogram have their own independent, fully functional filter buttons. I also enhanced the tooltip to display multi-variable data rather than just a single value.
* **Learnings:** I learned how to bind HTML button click events to D3 data filtering, how to smoothly animate entering and exiting data points using `.join().transition()`, and how to extract multiple data attributes (`d.brand`, `d.model`, etc.) from an SVG circle into a cleanly formatted, fixed-position tooltip.
* **Limitations:** Calculating the exact coordinate positioning for the scatterplot tooltip to ensure it didn't overlap or block the chart's legend required careful manual adjustments. Additionally, structuring the code so that newly generated (filtered) data points successfully retained their mouse hover event listeners took some trial and error to get perfectly right.