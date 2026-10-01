// Defines SVG dimensions and margins
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const width = 850; 
const height = 450; 
const innerWidth = width - margin.left - margin.right; 
const innerHeight = height - margin.top - margin.bottom; 

// Assigns colours for the histogram bars
const barColor = "#E67E22"; 
const hoverColor = "#FFC107"; 
const bodyBackgroundColor = "#FFFFFF"; 

// Initializes empty scales for Histogram X and Y axes
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Constructs bin generator targeting energyConsumption data
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); 

// =========================================
// SCATTERPLOT CONSTANTS
// =========================================

// Establishes inner chart variable for the scatterplot
let innerChartS;

// Defines optimized tooltip dimensions accommodating extensive brand text
const tooltipWidth = 200;
const tooltipHeight = 75;

// Initializes empty scales for Scatterplot X and Y axes
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

// Initializes colour mapping scale for categorical data
const colorScale = d3.scaleOrdinal();

// =========================================
// FILTER ARRAYS
// =========================================

// Stores screen technology filter options for Histogram
const filters_screen = [
    { id: "all", label: "All Tech", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Stores screen size filter options for Histogram
const filters_size = [
    { id: "all", label: "All Sizes", isActive: true },
    { id: 24, label: '24"', isActive: false },
    { id: 32, label: '32"', isActive: false },
    { id: 55, label: '55"', isActive: false },
    { id: 65, label: '65"', isActive: false },
    { id: 98, label: '98"', isActive: false }
];

// Stores screen technology filter options specifically for Scatterplot
const filters_screen_scatter = [
    { id: "all", label: "All Tech", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];