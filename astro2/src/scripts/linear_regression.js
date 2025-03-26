import * as d3 from 'd3';

export function Scatter_Plot(container, { height = 400, margin = { top: 50, right: 50, bottom: 60, left: 70 } } = {}) {
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
    d3.csv("/data/galton_data_reduced.csv").then(data => {
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
            .attr("stroke", "#ddd") // Light gray color
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

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
            .attr("stroke", "#ddd") // Light gray color
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

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
            .attr("y", innerHeight + margin.bottom - 10)
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


        // Add scatter plot points
        g.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.midparents_height))
            .attr("cy", d => yScale(d.height))
            .attr("r", 2)
            .style("fill", "gray")
            .style("stroke", "gray")
            .style("stroke-width", 0.5);

    }).catch(error => {
        console.error("Error loading the CSV file:", error);
    });
}

export function Scatter_Plot_Line(container, button_container, { height = 400, margin = { top: 10, right: 50, bottom: 60, left: 70 } } = {}) {
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

    // Load data from CSV
    d3.csv("/data/galton_data_reduced.csv").then(data => {
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
            .attr("stroke", "#ddd") // Light gray color
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

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
            .attr("stroke", "#ddd") // Light gray color
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

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
            .attr("y", innerHeight + margin.bottom - 10)
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

        // Add scatter plot points
        g.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.midparents_height))
            .attr("cy", d => yScale(d.height))
            .attr("r", 2)
            .style("fill", "gray")
            .style("stroke", "gray")
            .style("stroke-width", 0.5);

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
        const regressionLine = d3.line()
            .x(d => xScale(d.midparents_height))
            .y(d => yScale(regression.slope * d.midparents_height + regression.intercept));

        // Create a clip path to reveal the regression line progressively
        const clip = g.append("defs")
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", innerHeight)
            .attr("width", 0); // Start with zero width

        // Add the regression line
        const regressionPath = g.append("path")
            .datum(data)
            .attr("class", "regression-line")
            .attr("d", regressionLine)
            .style("stroke", "navy")
            .style("stroke-width", 2)
            .attr("clip-path", "url(#clip)"); // Apply the clip path

        // Add a button to reveal the regression line
        const button = d3.select(button_container)
            .append("button")
            .style("position", "abslute")
            .style("right", innerWidth/2 + "px") // Position in the lower-right quadrant
            .style("top", innerHeight + "px")
            .text("Show Regression Line")
            .style("font-family", "sans-serif")
            .style("font-size", "14px")
            // .style("color", "white")
            // .style("background-color", "navy")
            .on("click", () => {
                // Animate the clip path to reveal the regression line
                clip.transition()
                    .duration(2000) // Duration of the animation
                    .attr("width", innerWidth); // Reveal the full width
            });

    }).catch(error => {
        console.error("Error loading the CSV file:", error);
    });
}



export function RegressionLine(container, { height = 400, margin = { top: 10, right: 50, bottom: 60, left: 70 } } = {}) {

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

    // Load data from CSV
    d3.csv("/data/galton_data_reduced.csv").then(data => {
        // Convert string values to numbers and map to x and y
        data.forEach(d => {
            d.x = +d.midparents_height; // Independent variable
            d.y = +d.height; // Dependent variable
        });

        // Calculate fixed domains for x and y scales
        const xDomain = [d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1];
        const yDomain = [d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1];

        // Set up scales with fixed domains
        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(yDomain)
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
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

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
            .attr("stroke", "#ddd") // Light gray color
            .attr("opacity", "0.8") // Light gray color
            .attr("stroke-width", 0.8); // Thin stroke

        // Add axes to the chart
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append("g")
            .call(yAxis);

        // X axis labels
        g.append("text")
            .attr("class", "axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + margin.bottom - 10)
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
                .style("stroke-width", 2);
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
                .attr("r", 3)
                .style("fill", "gray")
                // .style("stroke", "black")
                .style("opacity", 0.3)
                // .style("stroke-width", 0.5)
                .transition()
                .duration(500);

                
                setTimeout(() => addPoints(data, index + 1), 100);
                updateRegressionLine(data.slice(0, index + 1));
        }

        

        // Start the animation
        addPoints(data);
    });
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

export function GroupedAverage(container, { height = 400, margin = { top: 40, right: 40, bottom: 60, left: 60 } } = {}) {

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

    const dataPoints = 100;

    // Generate random data
    const data = d3.range(dataPoints).map(() => ({
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

    // Group data into four groups
    const groups = [
        { range: [0, 25], data: [] },
        { range: [26, 50], data: [] },
        { range: [51, 75], data: [] },
        { range: [76, 100], data: [] }
    ];

    data.forEach(d => {
        if (d.x >= 0 && d.x <= 25) groups[0].data.push(d);
        else if (d.x >= 26 && d.x <= 50) groups[1].data.push(d);
        else if (d.x >= 51 && d.x <= 75) groups[2].data.push(d);
        else if (d.x >= 76 && d.x <= 100) groups[3].data.push(d);
    });

    // Calculate averages for each group
    const averages = groups.map(group => {
        const avgX = d3.mean(group.data, d => d.x);
        const avgY = d3.mean(group.data, d => d.y);
        return { x: avgX, y: avgY };
    });

    // Function to draw the scatter plot
    function drawScatterPlot() {
        g.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 3)
            .attr("fill", "#4682b4")
            .attr("opacity", 0)
            .transition()
            .duration(1000)
            .attr("opacity", 0.4);
    }

    // Function to draw vertical group lines
    function drawGroupLines() {
        g.selectAll(".group-line")
            .data([25, 50, 75]) // Vertical lines at x = 25, 50, 75
            .enter()
            .append("line")
            .attr("class", "group-line")
            .attr("x1", d => xScale(d)) // X position of the line
            .attr("x2", d => xScale(d)) // X position of the line
            .attr("y1", 0) // Top of the chart
            .attr("y2", innerHeight) // Bottom of the chart
            .attr("stroke", "#999") // Light gray color
            .attr("stroke-width", 2) // Thin stroke
            .attr("stroke-dasharray", "2,2") // Dashed line
            .attr("opacity", 0) // Initially hidden
            .transition()
            .delay(1000) // Delay before animation starts
            .duration(500) // Animation duration
            .attr("opacity", 1); // Fully visible
    }

    // Function to draw average dots
    function drawAverageDots() {
        // Draw the average dots
        const dots = g.selectAll(".average-dot")
            .data(averages)
            .enter()
            .append("circle")
            .attr("class", "average-dot")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .attr("fill", "darkblue") // Set fill color
            .attr("stroke-width", 2) // Set stroke width
            .attr("opacity", 0)
            .transition()
            .delay(1500)
            .duration(500)
            .attr("opacity", 1);

        // Add labels for each average dot
        const labels = g.selectAll(".average-label")
            .data(averages)
            .enter()
            .append("foreignObject") // Use foreignObject for HTML content
            .attr("x", d => xScale(d.x) - 45) // Position label to the right of the dot
            .attr("y", d => yScale(d.y) - 60) // Position label above the dot
            .attr("width", 100) // Set a width for the foreignObject
            .attr("height", 50) // Set a height for the foreignObject
            .html((d, i) => `
            <div xmlns="http://www.w3.org/1999/xhtml">
                <span class="katex">\\( (\\bar{x}_{${i + 1}}, \\bar{y}_{${i + 1}}) \\)</span>
            </div>
        `)
            .attr("opacity", 0)
            .transition()
            .delay(2500)
            .duration(500)
            .attr("opacity", 1);

        // Render LaTeX with KaTeX
        renderMathInElement(document.body);
    }

    // Function to draw the average line
    function drawAverageLine() {
        const line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        // Append the path for the average line
        const path = g.append("path")
            .datum(averages)
            .attr("class", "average-line")
            .attr("d", line)
            .attr("fill", "none") // Ensure no fill
            .attr("stroke", "darkblue") // Set stroke color
            .attr("stroke-width", 2) // Set stroke width
            .attr("stroke-dasharray", function () {
                // Calculate the total length of the path
                return this.getTotalLength();
            })
            .attr("stroke-dashoffset", function () {
                // Start with the path fully hidden
                return this.getTotalLength();
            })
            .attr("opacity", 1); // Make the path visible

        // Animate the line drawing
        path.transition()
            .delay(2000) // Delay before animation starts
            .duration(4000) // Duration of the animation
            .ease(d3.easeLinear) // Linear easing for smooth drawing
            .attr("stroke-dashoffset", 0); // Fully reveal the path
    }

    // Animate everything step by step
    setTimeout(drawScatterPlot, 500);
    setTimeout(drawGroupLines, 800);
    setTimeout(drawAverageDots, 1400);
    setTimeout(drawAverageLine, 2000);
}
