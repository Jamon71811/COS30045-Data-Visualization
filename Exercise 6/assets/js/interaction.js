// Selects accordion elements
const accordions = document.querySelectorAll(".accordion");

// Attaches click events orchestrating FAQ panels
accordions.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Targets adjacent panel element
        let panel = this.nextElementSibling;
        
        // Controls display property based on current state
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});

// Orchestrates primary filtering logic
const populateFilters = (data) => {

    // Initializes total counters presenting absolute data length
    d3.select("#histogram-counter span").text(data.length);
    d3.select("#scatter-counter span").text(data.length);

    // Applies filtered data exclusively to histogram visualization
    const drawFilteredHistogram = (filteredData) => {
        // Generates refined bins from dataset
        const updatedBins = binGenerator(filteredData);
        
        // Determines maximum frequency utilizing fallback
        const newMaxHeight = d3.max(updatedBins, d => d.length) || 1;
        
        // Maps maximum height applying to Y scale domain
        yScale.domain([0, newMaxHeight]).range([innerHeight, 0]).nice();

        // Configures Y axis employing integer formatting
        const yAxis = d3.axisLeft(yScale)
            .ticks(newMaxHeight < 10 ? newMaxHeight : 10)
            .tickFormat(d3.format("d"));

        // Executes smooth transition targeting Y axis
        d3.select(".y-axis")
            .transition()
            .duration(750)
            .call(yAxis);

        // Binds data assigning transition animation to bars
        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(750)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };

    // Applies filtered data exclusively to scatterplot visualization
    const drawFilteredScatterplot = (filteredData) => {
        // Selects existing data points binding refined dataset utilizing model identifier
        innerChartS.selectAll("circle")
            .data(filteredData, d => d.model)
            .join(
                // Animates entering data points configuring initial zero radius
                enteringNodes => enteringNodes.append("circle")
                    .attr("cx", d => xScaleS(d.star))
                    .attr("cy", d => yScaleS(d.energyConsumption))
                    .attr("r", 0)
                    .attr("fill", d => colorScale(d.screenTech))
                    .attr("opacity", 0)
                    .call(enter => enter.transition().duration(750)
                        .attr("r", 5)
                        .attr("opacity", 0.65)),
                
                // Animates retaining data points interpolating coordinates
                retainingNodes => retainingNodes
                    .call(retain => retain.transition().duration(750)
                        .ease(d3.easeCubicInOut)
                        .attr("cx", d => xScaleS(d.star))
                        .attr("cy", d => yScaleS(d.energyConsumption))),
                
                // Animates exiting data points contracting radius prior to DOM unbinding
                exitingNodes => exitingNodes
                    .call(exit => exit.transition().duration(750)
                        .attr("r", 0)
                        .attr("opacity", 0)
                        .remove())
            );

        // Re-establishes interaction listeners for newly joined elements ensuring interactivity persists
        handleMouseEvents();
    };

    // Tracks selected filter states globally
    let currentTechFilter = "all";
    let currentSizeFilter = "all";
    let currentScatterTechFilter = "all";

    // Processes dataset evaluating active condition variables for Histogram
    const applyHistogramFilters = () => {
        let resultData = data;

        // Evaluates technology condition constraint
        if (currentTechFilter !== "all") {
            resultData = resultData.filter(tv => tv.screenTech === currentTechFilter);
        }

        // Evaluates size condition constraint
        if (currentSizeFilter !== "all") {
            resultData = resultData.filter(tv => tv.screenSize === currentSizeFilter);
        }

        // Displays current data array length inside interface counter
        d3.select("#histogram-counter span").text(resultData.length);

        // Executes histogram charting function
        drawFilteredHistogram(resultData);
    };

    // Processes dataset evaluating active condition variables for Scatterplot
    const applyScatterplotFilters = () => {
        let resultData = data;

        // Evaluates technology condition constraint specifically for Scatterplot
        if (currentScatterTechFilter !== "all") {
            resultData = resultData.filter(tv => tv.screenTech === currentScatterTechFilter);
        }

        // Displays current data array length inside interface counter
        d3.select("#scatter-counter span").text(resultData.length);

        // Executes scatterplot charting function
        drawFilteredScatterplot(resultData);
    };

    // Constructs interactive buttons mapped to Histogram Screen Technology
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (event, d) => {
            // Evaluates click event against state property
            if (!d.isActive) {
                // Assigns active state boolean in object array
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // Applies CSS class visually indicating active status
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);
                
                // Assigns global variable triggering filtration logic
                currentTechFilter = d.id;
                applyHistogramFilters();
            }
        });

    // Constructs interactive buttons mapped to Histogram Screen Size
    d3.select("#filters_size")
        .selectAll(".filter")
        .data(filters_size)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (event, d) => {
            // Evaluates click event against state property
            if (!d.isActive) {
                // Assigns active state boolean in object array
                filters_size.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // Applies CSS class visually indicating active status
                d3.selectAll("#filters_size .filter")
                    .classed("active", filter => filter.id === d.id);
                
                // Assigns global variable triggering filtration logic
                currentSizeFilter = d.id;
                applyHistogramFilters();
            }
        });

    // Constructs interactive buttons mapped exclusively to Scatterplot Screen Technology
    d3.select("#filters_screen_scatter")
        .selectAll(".filter")
        .data(filters_screen_scatter)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (event, d) => {
            // Evaluates click event against state property
            if (!d.isActive) {
                // Assigns active state boolean in object array
                filters_screen_scatter.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // Applies CSS class visually indicating active status
                d3.selectAll("#filters_screen_scatter .filter")
                    .classed("active", filter => filter.id === d.id);
                
                // Assigns global variable triggering scatterplot filtration logic
                currentScatterTechFilter = d.id;
                applyScatterplotFilters();
            }
        });
};

// Initializes SVG tooltip structure integrating extension data nodes
const createTooltip = () => {
    // Appends tooltip grouping element to scatterplot chart
    const tooltip = innerChartS
        .append("g")
        .attr("class", "svg-tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none"); 

    // Constructs styled background rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", "#1A2530")
        .attr("fill-opacity", 0.95)
        .attr("stroke", "#FFC107")
        .attr("stroke-width", 1.5);

    // Appends text element dedicated to brand representation
    tooltip.append("text")
        .attr("class", "tooltip-brand")
        .attr("x", 12)
        .attr("y", 22)
        .attr("fill", "#FFFFFF")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

    // Appends text element dedicated to model representation
    tooltip.append("text")
        .attr("class", "tooltip-model")
        .attr("x", 12)
        .attr("y", 42)
        .attr("fill", "#CBD5E1")
        .style("font-family", "sans-serif")
        .style("font-size", "11px");

    // Appends text element dedicated to technical specifications
    tooltip.append("text")
        .attr("class", "tooltip-specs")
        .attr("x", 12)
        .attr("y", 62)
        .attr("fill", "#FFC107")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .style("font-size", "12px");
};

// Initializes comprehensive mouse event framework controlling tooltip visibility
const handleMouseEvents = () => {
    // Selects scatterplot data points binding interaction listeners
    innerChartS.selectAll("circle")
        .on("mouseenter", function(event, d) {
            // Evaluates string length rendering shortened version appending ellipsis
            let brandText = d.brand.toUpperCase();
            if (brandText.length > 18) {
                brandText = brandText.substring(0, 18) + "...";
            }
            
            // Evaluates string length rendering shortened version appending ellipsis
            let modelText = d.model;
            if (modelText.length > 25) {
                modelText = modelText.substring(0, 25) + "...";
            }

            // Injects specific data content into text elements
            d3.select(".svg-tooltip .tooltip-brand").text(`Brand: ${brandText}`);
            d3.select(".svg-tooltip .tooltip-model").text(`Model: ${modelText}`);
            d3.select(".svg-tooltip .tooltip-specs").text(`Size: ${d.screenSize}" | Tech: ${d.screenTech}`);

            // Positions tooltip computing elevated coordinates avoiding legend intersection
            d3.select(".svg-tooltip")
                .attr("transform", `translate(${innerWidth - tooltipWidth - 140}, -35)`)
                .transition()
                .duration(200)
                .style("opacity", 1);
            
            // Emphasizes active circle element visually utilizing transitions
            d3.select(event.target)
                .transition()
                .duration(200)
                .attr("r", 8)
                .attr("opacity", 1)
                .attr("stroke", "#1A2530")
                .attr("stroke-width", 2);
        })
        .on("mouseleave", function(event, d) {
            // Hides tooltip manipulating opacity property
            d3.select(".svg-tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`); 
            
            // Reverts circle element formatting to default styling
            d3.select(event.target)
                .transition()
                .duration(200)
                .attr("r", 5)
                .attr("opacity", 0.65)
                .attr("stroke", "none");
        });
};