import * as d3 from 'd3';

export function NormalDistribution(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Default parameters for the normal distribution
    let mean = 0; // Mean (μ)
    let variance = 1; // Variance (σ²)
    const stdDev = Math.sqrt(variance); // Standard deviation (σ)

    // Calculate inner dimensions (width and height minus margins)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Scales for the chart
    const xScale = d3.scaleLinear().domain([-5, 5]).range([0, innerWidth]); // x-axis range for normal distribution
    const yScale = d3.scaleLinear().domain([0, 0.5]).range([innerHeight, 0]); // y-axis range for PDF

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).ticks(5).tickPadding(8);

    // Add x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll(".tick text")
        .style("font-size", "14px");

    // Add y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis)
        .selectAll(".tick text")
        .style("font-size", "14px");

    // Add x-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", margin.left + innerWidth / 2)
        .attr("y", height)
        .style("text-anchor", "middle")
        .text("x")
        .style("font-size", "20px")
        .style("font-family", "sans-serif");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -margin.top - innerHeight / 2)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Probability Density")
        .style("font-size", "20px")
        .style("font-family", "sans-serif");

    // Line generator
    const line = d3.line()
        .x(d => xScale(d.x) + margin.left) // Scale x-coordinate
        .y(d => yScale(d.y) + margin.top); // Scale y-coordinate

    // Function to calculate normal distribution PDF
    function normalPDF(x, mean, stdDev) {
        const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
        const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
        return coefficient * Math.exp(exponent);
    }

    // Function to generate data for the normal distribution
    function generateNormalData(mean, stdDev) {
        const data = [];
        for (let x = -5; x <= 5; x += 0.1) {
            data.push({ x, y: normalPDF(x, mean, stdDev) });
        }
        return data;
    }

    // Initial data
    let data = generateNormalData(mean, stdDev);

    // Draw the initial line
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Function to update the chart
    function updateChart() {
        const newStdDev = Math.sqrt(variance); // Recalculate standard deviation
        data = generateNormalData(mean, newStdDev);
        path.datum(data)
            .attr("d", line);
    }

    // Expose update functions for sliders
    return {
        updateMean(value) {
            mean = +value;
            updateChart();
        },
        updateVariance(value) {
            variance = +value;
            updateChart();
        },
    };
}