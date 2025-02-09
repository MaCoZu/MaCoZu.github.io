import * as d3 from 'd3';

export function RegressionLine(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
    
    // Clear the existing chart
    d3.select(container).select("svg").remove();
    
    // Get the width of the container
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Create SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Generate random data
    const datapoints = 30;
    const data = d3.range(datapoints).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100
    }));

    // Set up scales
    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);

    const removeZeroFormatter = (d) => (d === 0 ? "" : d);

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickSize(8).tickPadding(8).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).tickSize(8).tickPadding(10).tickFormat(removeZeroFormatter);

    // Add horizontal gridlines
    g.selectAll("line.horizontalGrid")
        .data(yScale.ticks(10)) // Use 10 ticks for gridlines
        .enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0) // Start at the left edge of the chart
        .attr("x2", innerWidth) // End at the right edge of the chart
        .attr("y1", d => yScale(d)) // Y position of the gridline
        .attr("y2", d => yScale(d)) // Y position of the gridline
        .attr("stroke", "#ddd") // Light gray color
        .attr("stroke-width", 1) // Thin stroke
    // .attr("stroke-dasharray", "2,2"); // Dashed line

    // Add horizontal gridlines
    g.selectAll("line.verticalGrid")
        .data(yScale.ticks(10)) // Use 10 ticks for gridlines
        .enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", d => xScale(d)) // Start at the left edge of the chart
        .attr("x2", d => xScale(d)) // End at the right edge of the chart
        .attr("y1", innerHeight) // Y position of the gridline
        .attr("y2", 0) // Y position of the gridline
        .attr("stroke", "#ddd") // Light gray color
        .attr("stroke-width", 1) // Thin stroke
    // .attr("stroke-dasharray", "2,2"); // Dashed line

    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    g.append("g")
        .call(yAxis);
    
    // Add axis labels
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 0)
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("X");

    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 20)
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("Y");

    // Linear regression function
    function linearRegression(data) {
        const n = data.length;
        const sumX = d3.sum(data, d => d.x);
        const sumY = d3.sum(data, d => d.y);
        const sumXY = d3.sum(data, d => d.x * d.y);
        const sumX2 = d3.sum(data, d => d.x * d.x);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
    }

    // Function to update the regression line
    function updateRegressionLine(data) {
        const regression = linearRegression(data);

        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(regression.slope * d.x + regression.intercept));

        g.selectAll(".regression-line")
            .data([data])
            .join("path")
            .attr("class", "regression-line")
            .attr("d", line)
            .style("stroke", "navy")
            .style("stroke-width", 2)
            ;
    }

    // Function to add points one by one
    function addPoints(data, index = 0) {
        if (index >= data.length) return;

        g.selectAll(".dot")
            .data(data.slice(0, index + 1))
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .style("fill", "gray")
            .style("stroke", "black")
            .style("stroke-width", 0.5)
            .transition()
            .duration(500);

        updateRegressionLine(data.slice(0, index + 1));

        setTimeout(() => addPoints(data, index + 1), 1200);
    }

    // Start the animation
    addPoints(data);
}

export function Galton_Regression(container, { height = 400, margin = { top: 50, right: 50, bottom: 60, left: 70 } } = {}) {
    // Clear the existing chart
    // d3.select(container).select("svg").remove();

    // Get the width of the container
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Create SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load data from CSV
    d3.csv("galton_data_reduced.csv").then(data => {
        // Convert string values to numbers
        data.forEach(d => {
            d.height = +d.height;
            d.midparents_height = +d.midparents_height;
        });

        // Set up scales
        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.midparents_height) - 1, d3.max(data, d => d.midparents_height) + 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.height) - 1, d3.max(data, d => d.height) + 1])
            .range([innerHeight, 0]);

        // Add axes
        const xAxis = d3.axisBottom(xScale).tickSize(8).tickPadding(8).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).tickSize(8).tickPadding(10);

        // Add horizontal gridlines
        g.selectAll("line.horizontalGrid")
            .data(yScale.ticks(10)) // Use 10 ticks for gridlines
            .enter()
            .append("line")
            .attr("class", "horizontalGrid")
            .attr("x1", 0) // Start at the left edge of the chart
            .attr("x2", innerWidth) // End at the right edge of the chart
            .attr("y1", d => yScale(d)) // Y position of the gridline
            .attr("y2", d => yScale(d)) // Y position of the gridline
            // .attr("stroke", "#ddd") // Light gray color
            // .attr("opacity", "0.8") // Light gray color
            // .attr("stroke-width", 0.8); // Thin stroke

        // Add vertical gridlines
        g.selectAll("line.verticalGrid")
            .data(xScale.ticks(10)) // Use 10 ticks for gridlines
            .enter()
            .append("line")
            .attr("class", "verticalGrid")
            .attr("x1", d => xScale(d)) // Start at the left edge of the chart
            .attr("x2", d => xScale(d)) // End at the right edge of the chart
            .attr("y1", 0) // Y position of the gridline
            .attr("y2", innerHeight) // Y position of the gridline
            // .attr("stroke", "#ddd") // Light gray color
            // .attr("opacity", "0.8") // Light gray color
            // .attr("stroke-width", 0.8); // Thin stroke

        // Append x-axis
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        // Append y-axis
        g.append("g")
            .call(yAxis);

        // X axis labels
        g.append("text")
            .attr("class", "axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + margin.bottom-10)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .text("Parents Average Height");

        // Y axis labels
        g.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -margin.left + 20)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .text("Child Height");

        // Linear regression function
        function linearRegression(data) {
            const n = data.length;
            const sumX = d3.sum(data, d => d.midparents_height);
            const sumY = d3.sum(data, d => d.height);
            const sumXY = d3.sum(data, d => d.midparents_height * d.height);
            const sumX2 = d3.sum(data, d => d.midparents_height * d.midparents_height);

            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;

            return { slope, intercept };
        }

        // Calculate regression line
        const regression = linearRegression(data);

        // Add scatter plot points
        g.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.midparents_height))
            .attr("cy", d => yScale(d.height))
            .attr("r", 3)
            .style("fill", "lightsteelblue")
            .style("stroke", "lightsteelblue")
            .style("stroke-width", 0.5);


        // Draw regression line
        const regressionLine = d3.line()
            .x(d => xScale(d.midparents_height))
            .y(d => yScale(regression.slope * d.midparents_height + regression.intercept));

        g.append("path")
            .datum(data)
            .attr("class", "regression-line")
            .attr("d", regressionLine)
            .style("stroke", "navy")
            .style("stroke-width", 2)
            .style("fill", "none");

    }).catch(error => {
        console.error("Error loading the CSV file:", error);
    });
}