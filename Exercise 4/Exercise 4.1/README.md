# Exercise 4.1

## Exercise 4.1: SVG Primitives

### Generative AI Reflection
* **Tool(s) Used:** Google Gemini.
* **Purpose of Use:** Assisting with the mathematical planning of SVG Cartesian coordinates, ensuring exact alignments between the triangular roof polygon and the rectangular house walls, and generating the Bezier curve path logic.
* **Adaptations Made:** Structured the raw SVG elements semantically within an isolated HTML file (`svg-house.html`) to prevent conflicts with future D3.js exercises. Implemented `<g>` tags with `transform="translate(...)"` for modular window positioning.
* **Key Learnings:** Learned that the SVG Y-axis inverts standard mathematical graphs (increasing downwards), and observed how grouping elements via `<g>` drastically simplifies applying common strokes and fills across duplicate components.
* **Limitations Encountered:** Automated layout tools sometimes produce minor pixel gaps between adjoining geometric shapes, requiring manual verification of the exact Cartesian coordinate intersections.

This code fulfills the "Customise your picture" requirement by:

Changing fill colours: The house is now a modern mint-green with a dark slate roof.

Changing/adding strokes: The sun now has a thick orange outline (stroke), and the garden path has a decorative dashed white line (stroke-dasharray).

Moving shapes: The middle cloud has been repositioned higher and further to the right.

Adding new items: A wooden boundary fence and a street mailbox have been constructed using <rect> and <path> primitives.