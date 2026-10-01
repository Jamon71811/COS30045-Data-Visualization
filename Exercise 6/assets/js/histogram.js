// Draws the interactive histogram
const drawHistogram = (data) => {
    // Selects container and appends SVG
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .classed("svg-content", true);

    // Creates inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Groups data into initial bins
    const bins = binGenerator(data);

    // Extracts minimum and maximum X values
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    // Sets input domains and output ranges for X scale
    xScale.domain([minEng, maxEng]).range([0, innerWidth]);

    // Locks bin generator settings ensuring consistent filtering
    binGenerator.domain(xScale.domain());
    binGenerator.thresholds(bins.map(b => b.x0));

    // Determines maximum frequency for Y axis utilizing fallback
    const binsMaxHeight = d3.max(bins, d => d.length) || 1;

    // Sets input domains and output ranges for Y scale mapping to SVG coordinates
    yScale.domain([0, binsMaxHeight]).range([innerHeight, 0]).nice();

    // Targets tooltip element
    const tooltip = d3.select("#tooltip");

    // Draws histogram bars
    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .on("mouseover", function(event, d) {
            // Highlights bar colour and displays tooltip content
            d3.select(this).attr("fill", hoverColor);
            tooltip.style("opacity", 1)
                   .html(`Range: ${d.x0} - ${d.x1} kWh<br>Count: ${d.length} TVs`);
        })
        .on("mousemove", function(event) {
            // Tracks tooltip alongside mouse cursor utilizing absolute coordinates
            tooltip.style("left", (event.pageX + 20) + "px")
                   .style("top", (event.pageY - 40) + "px");
        })
        .on("mouseout", function() {
            // Restores default bar colour and hides tooltip
            d3.select(this).attr("fill", barColor);
            tooltip.style("opacity", 0);
        });

    // Configures X axis format
    const xAxis = d3.axisBottom(xScale);
    
    // Appends X axis group
    innerChart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    // Configures Y axis utilizing integer formatting
    const yAxis = d3.axisLeft(yScale)
        .ticks(binsMaxHeight < 10 ? binsMaxHeight : 10)
        .tickFormat(d3.format("d"));

    // Appends Y axis group establishing specific class mapping
    innerChart.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    // Applies X axis descriptive label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .style("text-anchor", "middle")
        .text("Labelled Energy Consumption (kWh/year)");

    // Applies Y axis descriptive label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .style("text-anchor", "middle")
        .text("Frequency (Number of TVs)");
};