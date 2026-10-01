// Reads dataset from the specified file path
d3.csv("assets/data/Ex6_TVdata_withStar.csv", d => {
    // Formats string values converting to numbers
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize, 
        screenTech: d.screenTech,
        energyConsumption: +d.energyConsumption, 
        star: +d.star 
    };
}).then(data => {
    // Outputs success message and loaded objects to console
    console.log("Dataset read operations completed:", data);
    
    // Executes histogram charting function
    drawHistogram(data);
    
    // Executes scatterplot charting function
    drawScatterplot(data);
    
    // Invokes filter panel generation function
    populateFilters(data);

    // Executes prerequisite tooltip placeholder function
    createTooltip();
    
    // Executes prerequisite mouse event placeholder function
    handleMouseEvents();

}).catch(error => {
    // Outputs error trace upon file read failure
    console.error("Dataset read operations encountered an error:", error);
});