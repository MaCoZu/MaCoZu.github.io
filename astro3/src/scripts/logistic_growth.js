import * as d3 from "d3";

export function createLogisticGrowthChart(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    const width = containerWidth;

    // Default parameters for the logistic growth model
    let N = 10; // Initial population
    let K = 100; // Carrying capacity
    let r = 0.1; // Growth rate
    let t = 50; // Time steps
    const dt = 0.1; // Time step for Euler method

    // Calculate inner dimensions (width and height minus margins)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Scales for the chart
    const xScale = d3.scaleLinear().domain([0, t]).range([0, innerWidth]); // Domain is [0, t]
    const yScale = d3.scaleLinear().domain([0, K]).range([innerHeight, 0]);


    // Custom tick formatter to remove zeros
    const removeZeroFormatter = (d) => (d === 0 ? "" : d);

    // Axes
    const xAxis = d3.axisBottom(xScale)
        .ticks(10)
        .tickPadding(10)

    const yAxis = d3.axisLeft(yScale)
        .ticks(10)
        .tickPadding(8)
        .tickFormat(removeZeroFormatter);


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
        .x((d, i) => xScale(i * dt) + margin.left) // Scale x-coordinate by dt
        .y(d => yScale(d) + margin.top); // Adjust for margin

    // Function to calculate logistic growth (continuous-time)
    function logisticGrowth(N, K, r, t, dt) {
        const data = [N];
        for (let i = 1; i <= t / dt; i++) {
            const prevN = data[i - 1];
            const dN = r * prevN * (1 - prevN / K) * dt; // Euler method
            const nextN = prevN + dN;
            data.push(nextN);
        }
        return data;
    }

    // Initial data
    let data = logisticGrowth(N, K, r, t, dt);

    // Draw the initial line
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#5ba300")
        .attr("stroke-width", 3)
        .attr("d", line);

    // Function to update the chart
    function updateChart() {
        data = logisticGrowth(N, K, r, t, dt);
        path.datum(data)
            .attr("d", line);
    }

    // Expose update functions for sliders
    return {
        updateN(value) {
            N = +value;
            updateChart();
        },
        updateK(value) {
            K = +value;
            yScale.domain([0, K]); // Update y-scale domain
            svg.select(".y-axis")
                .transition() // Add transition
                .duration(300)
                .call(yAxis) // Update y-axis
            updateChart();
        },
        updateR(value) {
            r = +value;
            updateChart();
        },
        updateT(value) {
            t = +value;
            xScale.domain([0, t]); // Update x-scale domain
            svg.select(".x-axis")
                .transition() // Add transition
                .duration(300)
                .call(xAxis) // Update x-axis
            updateChart();
        },
    };
}