// Defines the function for the line and scatter plot chart
const drawLineChart = data => {
    
    // Sets the internal dimensions
    const margin = { top: 60, right: 170, bottom: 60, left: 60 };
    const width = 1000;
    const height = 500;
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Creates the main SVG element
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Creates an invisible tooltip division in the HTML body
    const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip");

    // ==========================================
    // Scales Configuration
    // ==========================================
    
    // Maps the years along the horizontal axis
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    // Maps the price data along the vertical axis
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice) * 1.1])
        .range([innerHeight, 0]);

    // ==========================================
    // Axes and Typography
    // ==========================================

    // Formats the X-axis to display solid numbers without commas
    const bottomAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)
        .selectAll("text")
        .style("font-size", "14px")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif");

    innerChart.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .text("Year")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#333");

    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(leftAxis)
        .selectAll("text")
        .style("font-size", "14px")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif");

    innerChart.append("text")
        .text("Average Price ($ per MWh)")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("text-anchor", "start")
        .style("font-size", "16px")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#333");

    // ==========================================
    // Area and Line Path Generation
    // ==========================================
    
    // Defines a smooth area fill below the line
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(innerHeight)
        .y1(d => yScale(d.averagePrice))
        .curve(d3.curveMonotoneX); 

    innerChart.append("path")
        .datum(data)
        .attr("d", areaGenerator)
        .attr("fill", "#1A2530") 
        .attr("opacity", 0.1); 

    // Defines the smooth line passing through all data points
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveMonotoneX); 

    innerChart.append("path")
        .datum(data)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "#1A2530")
        .attr("stroke-width", 3); 

    // ==========================================
    // Scatter Plot Interaction
    // ==========================================
    
    // Renders individual data points and handles mouse interactions
    innerChart.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 6) 
        .attr("fill", "#FF8C00") 
        .attr("stroke", "#FFFFFF") 
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
            // Increases the dot radius upon hovering
            d3.select(this)
              .transition().duration(200)
              .attr("r", 9);
            
            // Injects the data value into the HTML tooltip structure
            tooltip.style("display", "block")
                   .html(`Average Price: <br><strong>$${d.averagePrice} per MWh</strong>`);
        })
        .on("mousemove", function(event) {
            // Dynamically updates the tooltip coordinates relative to the cursor
            tooltip.style("left", (event.pageX + 15) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
            // Restores the original element size and conceals the tooltip
            d3.select(this)
              .transition().duration(200)
              .attr("r", 6);
              
            tooltip.style("display", "none");
        });

    // Appends the specific year label to the final data point
    const lastDataPoint = data[data.length - 1];
    innerChart.append("text")
        .text("2024") 
        .attr("x", xScale(lastDataPoint.year) + 15)
        .attr("y", yScale(lastDataPoint.averagePrice))
        .attr("alignment-baseline", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#FF8C00");
};

// ==========================================
// Data Execution
// ==========================================

// Fetches the historical pricing data
d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
    const keys = Object.keys(d);
    return {
        year: +d[keys[0]], 
        averagePrice: +d[keys[7]] 
    };
}).then(data => {
    drawLineChart(data);
});