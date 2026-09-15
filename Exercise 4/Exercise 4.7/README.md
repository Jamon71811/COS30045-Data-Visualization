# Exercise 4.7: Adding Labels

## Overview
To make the bar chart readable, I restructured the code to add text labels. Instead of appending rectangles directly, I bound the data to `<g>` (group) elements and used `translate` to move each group to the correct y-axis position. Inside each group, I appended the blue rectangle, but shifted it 160 pixels to the right. In that empty space, I appended a `<text>` element for the brand name, using `text-anchor: end` to align it perfectly to the right edge of the gap. Lastly, I appended another `<text>` element at the end of the blue bar to display the exact numerical count.

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To understand how to group SVG elements together and align text using SVG properties.
* **Adaptations:** I increased the left-side blank space to 160 pixels to ensure long brand names like "park electronics" would not be cut off.
* **Learnings:** I learned that grouping elements together makes it much easier to position multiple items (like a bar and its text) at the same time.
* **Limitations:** Text alignment required manual trial-and-error tweaking in the code to get the spacing to look visually balanced in the browser.