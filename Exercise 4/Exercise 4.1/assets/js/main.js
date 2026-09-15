// ==========================================
// D3.js DOM Manipulation Script
// ==========================================

// Selects the targeted responsive container and appends an SVG canvas element
// The viewBox attribute establishes the internal coordinate system and aspect ratio
// The border style provides a visible boundary for developmental scale observation
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Appends a rectangular geometric primitive to the established SVG canvas
// Defines exact Cartesian coordinates, dimensions, and fill colour
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");