// Draws the interactive scatterplot visualization
const drawScatterplot = (data) => {
    // Selects HTML container and appends responsive SVG
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .classed("svg-content", true);

    // Establishes inner chart group utilizing margins
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extracts maximum values for domain boundaries
    const maxStar = d3.max(data, d => d.star) || 10;
    const maxEnergy = d3.max(data, d => d.energyConsumption) || 1000;

    // Configures X and Y scale mappings
    xScaleS.domain([0, maxStar + 1]).range([0, innerWidth]);
    yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice();

    // Determines unique categories for the colour scale
    const screenTypes = Array.from(new Set(data.map(d => d.screenTech)));
    
    // Assigns professional hex colours mapping to screen technology
    colorScale.domain(screenTypes)
              .range(["#3498DB", "#E67E22", "#2ECC71"]);

    // Draws data points as circles utilizing opacity for readability
    innerChartS.selectAll("circle")
        .data(data, d => d.model)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.65);

    // Generates X axis structure
    const xAxis = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    // Generates Y axis structure
    const yAxis = d3.axisLeft(yScaleS);
    innerChartS.append("g")
        .call(yAxis);

    // Applies descriptive X axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .style("text-anchor", "middle")
        .text("Star Rating");

    // Applies descriptive Y axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .style("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Constructs legend container positioning it precisely
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, ${margin.top})`);

    // Iterates through categories defining legend entries
    colorScale.domain().forEach((tech, i) => {
        // Builds individual legend row grouping
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 25})`);

        // Draws category colour swatch with rounded corners
        legendRow.append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("fill", colorScale(tech))
            .attr("rx", 3); 

        // Applies category text label
        legendRow.append("text")
            .attr("x", 24)
            .attr("y", 11)
            .attr("class", "axis-label")
            .style("alignment-baseline", "middle")
            .text(tech);
    });
};