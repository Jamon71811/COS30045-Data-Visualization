// ==========================================
// D3.js DOM Manipulation Script
// ==========================================

// Selects the primary heading element and applies a specific text colour styling
d3.select("h1")
  .style("color", "orange");

// Selects the container class division and appends a new paragraph element containing specific text
d3.select(".container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Selects the target SVG canvas and appends a rectangular primitive with specific dimensions and fill colour
d3.select("#d3-canvas")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "orange");