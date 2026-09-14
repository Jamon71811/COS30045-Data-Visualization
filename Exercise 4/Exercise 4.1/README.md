# Exercise 4.1

## Exercise 4.1: SVG Primitives

### Generative AI Reflection
* **Tool(s) Used:** Google Gemini.
* **Purpose of Use:** Assisting with the mathematical planning of SVG Cartesian coordinates, ensuring exact alignments between the triangular roof polygon and the rectangular house walls, and generating the Bezier curve path logic.
* **Adaptations Made:** Structured the raw SVG elements semantically within an isolated HTML file (`svg-house.html`) to prevent conflicts with future D3.js exercises. Implemented `<g>` tags with `transform="translate(...)"` for modular window positioning.
* **Key Learnings:** Learned that the SVG Y-axis inverts standard mathematical graphs (increasing downwards), and observed how grouping elements via `<g>` drastically simplifies applying common strokes and fills across duplicate components.
* **Limitations Encountered:** Automated layout tools sometimes produce minor pixel gaps between adjoining geometric shapes, requiring manual verification of the exact Cartesian coordinate intersections.