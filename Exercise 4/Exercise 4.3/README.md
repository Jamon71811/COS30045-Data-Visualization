# Exercise 4.3: Responsive SVG Container

## Overview
The goal of this exercise was to build a chart container that can automatically resize itself based on the user's screen width. To achieve this, I wrote a new CSS class called `.responsive-svg-container` to center the block and limit its maximum width. In my `main.js` file, I used D3 to append a new `<svg>` element into this container. Instead of giving it a fixed width and height in pixels, I gave it a `viewBox="0 0 1200 1600"` attribute. This creates a flexible internal map, allowing the SVG to shrink or expand perfectly when the browser window changes. 

### Generative AI Reflection
* **Tool Used:** Gemini
* **Purpose:** To understand how the SVG `viewBox` attribute works with CSS properties.
* **Adaptations:** I separated the styling logic, moving the layout rules into `styles.css` instead of keeping them inside the JavaScript code.
* **Learnings:** I learned that using `viewBox` is much better for responsive web design than using hard-coded pixel widths.
* **Limitations:** No major issues; the explanation of responsive behavior required some manual testing in the browser to fully understand.