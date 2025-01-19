import * as d3 from 'd3';

export function LogisticMapChart(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
    
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Default parameters for the logistic map
    let r = 3.5; // Growth rate
    let x0 = 0.5; // Initial population (normalized)
    let steps = 100; // Number of steps

    // Calculate inner dimensions (width and height minus margins)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Scales for the chart
    const xScale = d3.scaleLinear().domain([0, steps]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([innerHeight, 0]);

    const removeZeroFormatter = (d) => (d === 0 ? "" : d);

    // Custom tick formatter to remove leading zero for decimals
    const decimalFormatter = (d) => {
        if (d > 0 && d < 1) {
            return d.toString().replace("0.", ". "); // Remove leading zero
        }
        return d; // Return the original value for other cases
    };

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).ticks(10).tickPadding(8).tickFormat(removeZeroFormatter).tickSize(-innerWidth);

    // Add x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll(".tick text")
        .style("font-size", "14px");

    // Add y-axis
    const yAxisGroup = svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

    // Style the tick text
    yAxisGroup.selectAll(".tick text")
        .style("font-size", "14px");

    // Style the gridlines (tick lines)
    yAxisGroup.selectAll(".tick line")
        .style("stroke-opacity", 0.2);
            

    // Add x-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", margin.left + innerWidth / 2)
        .attr("y", height)
        .style("text-anchor", "middle")
        .text("t")
        .style("font-size", "20px")
        .style("font-family", "sans-serif");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -margin.top - innerHeight / 2)
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Population")
        .style("font-size", "20px")
        .style("font-family", "sans-serif");


    // Line generator
    const line = d3.line()
        .x((d, i) => xScale(i) + margin.left)
        .y(d => yScale(d) + margin.top);


    // Function to calculate logistic map
    function logisticMap(r, x0, steps) {
        const data = [x0];
        for (let i = 1; i <= steps; i++) {
            const prevX = data[i - 1];
            const nextX = r * prevX * (1 - prevX);
            data.push(nextX);
        }
        return data;
    }

    // Initial data
    let data = logisticMap(r, x0, steps);

    // Draw the initial line
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", line);

    // Function to update the chart// Function to update the chart
    function updateChart() {
        data = logisticMap(r, x0, steps);

        // Adjust y-scale domain dynamically based on data
        const maxY = d3.max(data); // Find the maximum value in the data
        yScale.domain([0, Math.max(1, maxY)]); // Set y-scale domain to [0, maxY] or [0, 1], whichever is larger

        // Smoothly transition the y-axis
        svg.select(".y-axis")
            .transition()
            .duration(500)
            .call(yAxis);

        // Update the line path
        path.datum(data)
            .transition() // Add transition
            .duration(300) // Set duration to 500ms
            .attr("d", line);
    }

    // Expose update functions for sliders
    return {
        updateR(value) {
            r = +value;
            updateChart();
        },
        updateX0(value) {
            x0 = +value;
            updateChart();
        },
        updateSteps(value) {
            steps = +value;
            xScale.domain([0, steps]); // Update x-scale domain
            svg.select(".x-axis")
                .transition() // Add transition
                .duration(300) // Set duration to 500ms
                .call(xAxis); // Redraw the x-axis
            updateChart();
        },
    };
}