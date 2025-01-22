import * as d3 from 'd3';


export function NormalDistribution(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Default parameters for the normal distribution
    let mean = 0; // Mean (μ)
    let stdDev = 1; // Standard deviation (σ)

    // Calculate inner dimensions (width and height minus margins)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Define a clip path to prevent lines and labels from appearing outside the chart area
    svg.append("defs").append("clipPath")
        .attr("id", "chart-clip")
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", innerWidth)
        .attr("height", innerHeight);

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
        .attr("d", d3.line()
            .x(d => xScale(d.x) + margin.left)
            .y(d => yScale(d.y) + margin.top)
        );

    // Function to fill area under the curve
    function fillArea(startX, endX, color) {
        const area = d3.area()
            .x(d => xScale(d.x) + margin.left)
            .y0(innerHeight + margin.top)
            .y1(d => yScale(d.y) + margin.top);

        svg.append("path")
            .attr("class", "area")
            .datum(data.filter(d => d.x >= startX && d.x <= endX))
            .transition().duration(500)
            .attr("fill", color)
            .attr("opacity", 0.5)
            .attr("d", area);
    }

    // Function to draw vertical lines and labels at ±1σ, ±2σ, ±3σ
    function drawVerticalLinesAndLabels() {
        const offsets = [-3, -2, -1, 1, 2, 3].map(d => mean + d * stdDev);
        const labels = ["-3σ", "-2σ", "-1σ", "+1σ", "+2σ", "+3σ"];

        // Draw vertical lines
        svg.selectAll(".std-line")
            .data(offsets)
            .join("line")
            .attr("class", "std-line")
            .attr("x1", d => xScale(d) + margin.left)
            .attr("x2", d => xScale(d) + margin.left)
            .attr("y1", margin.top + 30)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "gray")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1)
            .attr("clip-path", "url(#chart-clip)");

        // Add labels next to vertical lines
        svg.selectAll(".std-label")
            .data(offsets)
            .join("text")
            .attr("class", "std-label")
            .attr("x", d => xScale(d) + margin.left - 18) // Offset labels to the right of the lines
            .attr("y", margin.top + 20) // Position labels at the bottom
            .style("text-anchor", "start")
            .style("font-size", "20px")
            .style("font-family", "serif")
            .text((d, i) => {
                if (stdDev < 0.4) {
                    // Only show ±3σ labels if stdDev < 0.4
                    return Math.abs(offsets[i] - mean) === 3 * stdDev ? labels[i] : "";
                } else if (stdDev < 0.7) {
                    // Show ±2σ and ±3σ labels if stdDev < 0.6
                    return Math.abs(offsets[i] - mean) >= 2 * stdDev ? labels[i] : "";
                } else {
                    // Show all labels if stdDev >= 0.6
                    return labels[i];
                }

            })
            .attr("clip-path", "url(#chart-clip)");
    }

    // Function to update the chart
    function updateChart() {
        data = generateNormalData(mean, stdDev);

        // Update the normal distribution curve
        path.datum(data)
            .transition()
            .duration(500)
            .attr("d", d3.line()
                .x(d => xScale(d.x) + margin.left)
                .y(d => yScale(d.y) + margin.top)
                
            );

        // Clear previous areas and lines
        svg.selectAll(".area").remove().transition().duration(500);
        svg.selectAll(".std-line").remove().transition().duration(500);
        svg.selectAll(".std-label").remove().transition().duration(500);

        // Fill areas under the curve according to the empirical rule
        fillArea(mean - stdDev, mean + stdDev, "#89ce00"); // 68% region
        fillArea(mean - 2 * stdDev, mean - stdDev, "#0073e6"); // 95% region (left)
        fillArea(mean + stdDev, mean + 2 * stdDev, "#0073e6"); // 95% region (right)
        fillArea(mean - 3 * stdDev, mean - 2 * stdDev, "#e6308a"); // 99.7% region (left)
        fillArea(mean + 2 * stdDev, mean + 3 * stdDev, "#e6308a"); // 99.7% region (right)

        // Draw vertical lines and labels
        drawVerticalLinesAndLabels();
    }

    // Initial chart rendering
    updateChart();

    // Expose update functions for sliders
    return {
        updateMean(value) {
            mean = +value;
            updateChart();
        },
        updateStdDev(value) {
            stdDev = +value;
            updateChart();
        },
    };
}