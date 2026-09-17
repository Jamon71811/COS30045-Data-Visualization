// Defines the interactive donut chart function
const drawDonutChart = data => {
    
    // Sets the base canvas dimensions
    const width = 850;
    const height = 450;
    
    // Calculates the total sum for percentage logic and center text
    const totalTVs = d3.sum(data, d => d.Count);
    
    // Derives the maximum safe radius based on available space
    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Offsets the graphic to the left to create space for the legend
    const innerChart = svg.append("g")
        .attr("transform", `translate(${width * 0.35}, ${height / 2})`);

    // ==========================================
    // Scales and Sunny Color Palette
    // ==========================================
    
    // Maps the specific dataset categories to the sunny gradient palette
    const colorScale = d3.scaleOrdinal()
        .domain(["large", "medium", "small"])
        .range(["#FF8C00", "#FFC300", "#FFD400"]); 

    // ==========================================
    // Arc Geometry Configuration
    // ==========================================
    
    // Calculates the angular values corresponding to each count
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); 

    // Defines the physical thickness and corner roundness of each slice
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.55) 
        .outerRadius(radius) 
        .padAngle(0.02) 
        .cornerRadius(6); 

    // ==========================================
    // Slice Construction and Interaction
    // ==========================================
    
    const arcs = innerChart.selectAll(".arc")
        .data(pie(data))
        .join("g")
        .attr("class", "arc");

    // Applies colors and dictates the hover lighting effect
    arcs.append("path")
        .attr("d", arcGenerator)
        .style("fill", d => colorScale(d.data.Screensize_Category.toLowerCase()))
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
            // Applies a brighter filter over the native color
            const currentColor = colorScale(d.data.Screensize_Category.toLowerCase());
            d3.select(this)
              .transition().duration(200)
              .style("fill", d3.color(currentColor).brighter(0.4)); 
        })
        .on("mouseout", function(event, d) {
            // Reverts color to the initial state
            const originalColor = colorScale(d.data.Screensize_Category.toLowerCase());
            d3.select(this)
              .transition().duration(200)
              .style("fill", originalColor); 
        });

    // ==========================================
    // Internal Slice Typography
    // ==========================================
    
    // Calculates the geometric center of each slice to place the category label
    arcs.append("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#1A2530") 
        .text(d => d.data.Screensize_Category.toUpperCase());

    // Positions the numerical count directly beneath the category label
    arcs.append("text")
        .attr("transform", d => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y + 20})`; 
        })
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "700")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#1A2530")
        .text(d => d.data.Count + " TVs");

    // ==========================================
    // Center Canvas Typography
    // ==========================================
    
    // Positions the static TOTAL text label in the hollow center
    innerChart.append("text")
        .text("TOTAL")
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "600")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#666");

    // Positions the dynamic total value beneath the static label
    innerChart.append("text")
        .text(totalTVs)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "32px")
        .style("font-weight", "bold")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#1A2530");

    // ==========================================
    // Custom Right-Side Legend
    // ==========================================
    
    // Positions the legend group structure to the far right
    const legend = svg.append("g")
        .attr("transform", `translate(${width * 0.70}, ${height / 2 - 60})`);

    const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 45})`); 

    // Renders the color-coded reference squares
    legendItems.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("rx", 4) 
        .style("fill", d => colorScale(d.Screensize_Category.toLowerCase()));

    // Formats the text displaying category, raw count, and exact percentage calculation
    legendItems.append("text")
        .text(d => {
            const percentage = ((d.Count / totalTVs) * 100).toFixed(1);
            return `${d.Screensize_Category.toUpperCase()} : ${d.Count} TVs (${percentage}%)`;
        })
        .attr("x", 35) 
        .attr("y", 15)
        .style("font-size", "15px")
        .style("font-weight", "600")
        .style("font-family", "'Segoe UI', Tahoma, sans-serif")
        .style("fill", "#333");
};

// ==========================================
// Data Execution
// ==========================================

// Fetches the specific dataset for the donut chart
d3.csv("assets/data/Data_exercise 5.3.csv", d => {
    const keys = Object.keys(d);
    return {
        Screensize_Category: String(d[keys[0]]).trim(),
        Count: +d[keys[1]]
    };
}).then(data => {
    drawDonutChart(data);
});