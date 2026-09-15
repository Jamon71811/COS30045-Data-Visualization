// ==========================================
// D3.js Final Bar Chart with Perfect Typography
// ==========================================

// Selects the responsive container and appends the SVG canvas
// Establishes a wider coordinate system boundary (700x550) to accommodate long text labels
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 700 550")
    .style("border", "1px solid black");

// Defines the logic to construct the scaled bar chart geometry with data labels
const drawBarChart = data => {
    
    // Establishes a linear scale for the horizontal x-axis
    // Maps the numerical data domain (0 to 1100) to a constrained physical pixel range (0 to 480)
    // Ensures rectangular primitives do not touch the right border
    const xScale = d3.scaleLinear()
        .domain([0, 1100])
        .range([0, 480]);

    // Establishes a band scale for the vertical y-axis categorical data
    // Distributes the brand categories evenly across the canvas height (0 to 550) with spacing padding
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 550])
        .padding(0.1);

    // Binds the dataset to SVG group primitives
    // Translates each group to the vertical position calculated by the y-axis scale
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Appends rectangular primitives inside the translated groups
    // Allocates 160 pixels of empty horizontal space on the left to fit the longest brand names
    barAndLabel
        .append("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 160)
        .attr("y", 0);

    // Appends text elements to display the categorical brand names
    // Anchors the typography to the exact edge of the 160-pixel margin
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 150)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .style("font-family", "Arial, sans-serif");

    // Appends text elements to display the numerical count values
    // Positions the typography at the exact end of each corresponding rectangular bar
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 160 + xScale(d.count) + 6)
        .attr("y", 15)
        .style("font-size", "14px")
        .style("font-family", "Arial, sans-serif");
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