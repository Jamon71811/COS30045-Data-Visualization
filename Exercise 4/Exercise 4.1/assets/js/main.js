// ==========================================
// D3.js Scaled Bar Chart Generation Script
// ==========================================

// Selects the responsive container and appends the SVG canvas
// Establishes a compact coordinate system boundary (500x500) for scaling demonstration
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 500")
    .style("border", "1px solid black");

// Defines the logic to construct the scaled bar chart geometry
const drawBarChart = data => {
    
    // Establishes a linear scale for the horizontal x-axis
    // Maps the numerical data domain (0 to 1100) to the physical pixel range of the canvas (0 to 500)
    const xScale = d3.scaleLinear()
        .domain([0, 1100])
        .range([0, 500]);

    // Establishes a band scale for the vertical y-axis categorical data
    // Distributes the brand categories evenly across the canvas height (0 to 500) with a 10% spacing padding
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 500])
        .padding(0.1);

    // Binds the dataset to SVG rectangular primitives
    // Applies dynamic coordinates and dimensions computed automatically by the defined scales
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand));
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