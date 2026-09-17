// Defines the main function to draw the vertical bar chart
const drawBarChart = data => {
    
    // Sets the margins to provide adequate space for axes and titles
    const margin = { top: 60, right: 170, bottom: 60, left: 60 };
    const width = 1000;
    const height = 500;
    
    // Calculates the internal drawing area
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Creates the SVG canvas element
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Groups the chart elements and shifts them according to the margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ==========================================
    // Scales and Sunny Color Palette
    // ==========================================
    
    // Configures the horizontal axis spacing for the bars
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.2); 

    // Configures the vertical axis data range
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption) * 1.15]) 
        .range([innerHeight, 0]); 

    // Maps the categories to the specific sunny gradient colors
    const colorScale = d3.scaleOrdinal()
        .domain(["LED", "OLED", "LCD"])
        .range(["#FF8C00", "#FFC300", "#FFD400"]); 

    // ==========================================
    // Axes and Typography
    // ==========================================

    // Constructs the horizontal X-axis
    const bottomAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)
        .selectAll("text")
        .style("font-size", "15px") 
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("font-weight", "600");

    // Renders the X-axis title
    innerChart.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45) 
        .attr("text-anchor", "middle")
        .text("Screen_Tech")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#333");

    // Constructs the vertical Y-axis with a larger font size
    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(leftAxis)
        .selectAll("text")
        .style("font-size", "16px") 
        .style("font-family", "'Segoe UI', Tahoma, sans-serif");

    // Renders the Y-axis title with a larger font size
    innerChart.append("text")
        .text("Mean(Labelled energy consumption (kWh/year))")
        .attr("x", -margin.left)
        .attr("y", -20) 
        .attr("text-anchor", "start")
        .style("font-size", "17px") 
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#333");

    // ==========================================
    // Custom Bar Geometry
    // ==========================================

    // Creates a custom SVG path to round only the top corners of the bars
    const drawTopRoundedRect = (x, y, w, h, r) => {
        return `M${x},${y+h} V${y+r} Q${x},${y} ${x+r},${y} H${x+w-r} Q${x+w},${y} ${x+w},${y+r} V${y+h} Z`;
    };

    // Renders the bars and attaches interaction events
    innerChart.selectAll(".bar")
        .data(data)
        .join("path")
        .attr("class", "bar")
        .attr("d", d => drawTopRoundedRect(
            xScale(d.Screen_Tech), 
            yScale(d.Energy_Consumption), 
            xScale.bandwidth(), 
            innerHeight - yScale(d.Energy_Consumption), 
            15 
        ))
        .style("fill", d => colorScale(d.Screen_Tech))
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
            // Darkens the exact current color to provide hover feedback
            const currentColor = colorScale(d.Screen_Tech);
            d3.select(this)
              .transition().duration(200)
              .style("fill", d3.color(currentColor).darker(0.5)); 
        })
        .on("mouseout", function(event, d) {
            // Reverts back to the original mapped color
            const originalColor = colorScale(d.Screen_Tech);
            d3.select(this)
              .transition().duration(200)
              .style("fill", originalColor); 
        });

    // Positions the numerical labels above each bar
    innerChart.selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .text(d => Math.round(d.Energy_Consumption) + " kWh")
        .attr("x", d => xScale(d.Screen_Tech) + (xScale.bandwidth() / 2))
        .attr("y", d => yScale(d.Energy_Consumption) - 12)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#1A2530");
};

// ==========================================
// Data Execution
// ==========================================

// Fetches and parses the CSV data
d3.csv("assets/data/Data_exercise 5.1-1.csv", d => {
    const keys = Object.keys(d);
    return {
        Screen_Tech: String(d[keys[0]]).toUpperCase(),
        Energy_Consumption: +d[keys[1]]
    };
}).then(data => {
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    drawBarChart(data);
});