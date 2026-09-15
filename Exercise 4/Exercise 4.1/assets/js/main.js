// ==========================================
// D3.js Bar Chart Generation Script
// ==========================================

// Selects the responsive container and appends the SVG canvas
// Establishes the coordinate system boundary
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Defines the logic to construct the bar chart geometry
const drawBarChart = data => {
    // Defines constant numerical values for vertical geometry
    const barHeight = 20;
    const barSpacing = 5;

    // Binds the dataset to SVG rectangular primitives
    // Applies exact coordinates, dimensions, and structural classes based on individual data points
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + barSpacing));
};

// Fetches the CSV dataset from the local directory
// Parses the count column into a numerical format
d3.csv("assets/data/Exercise4.4_tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    // Outputs the parsed dataset and its statistical properties to the browser console
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));

    // Sorts the dataset array in descending numerical order based on count
    data.sort((a, b) => b.count - a.count);

    // Passes the sorted dataset into the chart generation function
    drawBarChart(data);
});