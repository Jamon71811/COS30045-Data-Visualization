// ==========================================
// D3.js Data Loading and Parsing Script
// ==========================================

// Selects the responsive container and appends the SVG canvas
// Establishes the coordinate system boundary
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Defines a function to receive and process the structured dataset
// Future implementation will construct the bar chart geometry here
function drawBarChart(data) {
    console.log("Data is successfully passed to the charting function.");
}

// Fetches the CSV dataset from the local directory
// The row conversion function parses the count column into a numerical format
d3.csv("assets/data/Exercise4.4_tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    // Outputs the parsed dataset and its statistical properties to the browser console
    console.log("Raw dataset array:", data);
    console.log("Total number of records:", data.length);
    console.log("Maximum count value:", d3.max(data, d => d.count));
    console.log("Minimum count value:", d3.min(data, d => d.count));
    console.log("Data extent [min, max]:", d3.extent(data, d => d.count));

    // Sorts the dataset array in descending numerical order based on count
    data.sort((a, b) => b.count - a.count);

    // Passes the sorted dataset into the chart generation function
    drawBarChart(data);
});