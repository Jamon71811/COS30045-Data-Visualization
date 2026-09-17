# Exercise 5 – Multi-Chart Webpage

## Aim
Create a variety of different chart types using **D3.js**.

## Purpose
In previous exercises, we created simple charts such as a horizontal bar chart. In this exercise, you will extend your skills by building multiple chart types and presenting them on a webpage.

This activity focuses on using **D3 to visualise different types of data** and understanding when different charts are appropriate.

## Charts to Create

Using the provided **TV energy consumption dataset** (or your own dataset), your webpage must include the following chart types:

- **Scatter Plot**  
  Energy consumption vs star rating.

- **Donut Chart**  
  Energy consumption for different screen technologies across all TVs combined.

- **Bar Chart**  
  Energy consumption for different screen technologies for **55-inch TVs only**.

- **Line Chart**  
  Spot power prices from **1998 to 2024** (either plot the average or include a line for each state).

You may use the **provided datasets** or your **own dataset**, but your webpage must include **one example of each chart type**.

## Preparation

Before starting this exercise, it is recommended that you:

- Review this week's **lecture slides**
- Review **Chapter 4 and Chapter 5 of Dufour and Meeks (2024)**

## Instructions

Use the **forked repository that you created earlier for this unit**.

1. Open your existing **forked repository**.
2. Navigate to the **Exercise 5 folder**.
3. Add your code and files for this exercise inside that folder.
4. Build a webpage that displays the required charts using **D3.js**.
5. Commit and push your changes regularly to your GitHub repository.

## Submission

Your **forked repository** will serve as your submission.

Ensure that:
- All Exercise 5 files are inside the **Exercise 5 folder**
- Your code is pushed to GitHub
- Your repository link is submitted through the submission system.

## Overview
In this exercise, I built a comprehensive multi-chart dashboard using D3.js. I combined three different types of data visualizations into a single webpage (`exercise5-1.html`). 

First, I created a **Vertical Bar Chart** to compare the average energy consumption of different TV screen technologies, applying custom rounded corners and a premium color palette. Next, I built a combined **Scatter Plot and Line Chart** with a smooth area fill and interactive tooltips to track electricity prices over time. Finally, I created an interactive **Donut Chart** with a center "TOTAL" display and a custom percentage legend to show the proportion of TV sizes. All charts were styled cohesively and feature interactive hover effects to improve the user experience.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To understand the D3 syntax for advanced visualizations like smooth line curves (`d3.curveMonotoneX`), hover tooltips, and donut chart arcs.
* **Adaptations:** I customized the color palette heavily to match my specific "Sunny Premium" website theme (#FF8C00, #FFC300, #FFD400) and modified the HTML structure to display all three charts cleanly on a single dashboard page.
* **Learnings:** I learned how to render multiple independent D3 SVGs on the same page, how to create interactive tooltips using CSS and JavaScript mouse events, and how to use `arc.centroid()` to position text perfectly inside donut slices.
* **Limitations:** Setting up the custom legend for the donut chart and positioning the interactive tooltips required some manual trial-and-error to ensure the text aligned perfectly and didn't overlap with the graphics.