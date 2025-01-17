import * as d3 from "d3";

export function createLogisticGrowthChart(container, {height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {

        const containerWidth = d3.select(container).node().getBoundingClientRect().width;
        const width = containerWidth;

    // Default parameters for the logistic growth model
    let N = 10; // Initial population
    let K = 100; // Carrying capacity
    let r = 0.1; // Growth rate
    let t = 50; // Time steps

    // Calculate inner dimensions (width and height minus margins)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Scales for the chart
    const xScale = d3.scaleLinear().domain([0, t]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, K]).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10).tickPadding(10);
    const yAxis = d3.axisLeft(yScale).ticks(10).tickPadding(8);

    // Add x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll(".tick text") // Select all x-axis tick labels
        .style("font-size", "14px");

    // Add y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis)
        .selectAll(".tick text") // Select all x-axis tick labels
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
        .x((d, i) => xScale(i) + margin.left) // Adjust for margin
        .y(d => yScale(d) + margin.top); // Adjust for margin

    // Function to calculate logistic growth
    function logisticGrowth(N, K, r, t) {
        const data = [N];
        for (let i = 1; i <= t; i++) {
            const prevN = data[i - 1];
            const nextN = prevN + r * prevN * (1 - prevN / K);
            data.push(nextN);
        }
        return data;
    }

    // Initial data
    let data = logisticGrowth(N, K, r, t);

    // Draw the initial line
    const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Function to update the chart
    function updateChart() {
        data = logisticGrowth(N, K, r, t);
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
            svg.select(".y-axis").call(yAxis); // Update y-axis
            updateChart();
        },
        updateR(value) {
            r = +value;
            updateChart();
        },
        updateT(value) {
            t = +value;
            xScale.domain([0, t]); // Update x-scale domain
            svg.select(".x-axis").call(xAxis); // Update x-axis
            updateChart();
        },
    };
}


// export function createLogisticGrowthChart(container, {height = 400 } = {}) {

//     const containerWidth = d3.select(container).node().getBoundingClientRect().width;
//     const width = containerWidth;

//     // Default parameters for the logistic growth model
//     let N = 10; // Initial population
//     let K = 100; // Carrying capacity
//     let r = 0.1; // Growth rate
//     let t = 50; // Time steps

//     margin = { top: 50, right: 50, bottom: 50, left: 50 }

//     // Calculate inner dimensions (width and height minus margins)
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     // Create the SVG element
//     const svg = d3.select(container)
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     // Scales for the chart
//     const xScale = d3.scaleLinear().domain([0, t]).range([0, innerWidth]);
//     const yScale = d3.scaleLinear().domain([0, K]).range([innerHeight, 0]);

//     // Axes
//     const xAxis = d3.axisBottom(xScale).ticks(10).tickPadding(10);
//     const yAxis = d3.axisLeft(yScale).ticks(10).tickPadding(8);;

//     // Add x-axis
//     svg.append("g")
//         .attr("class", "x-axis")
//         .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
//         .call(xAxis);

//     // Add y-axis
//     svg.append("g")
//         .attr("class", "y-axis")
//         .attr("transform", `translate(${margin.left}, ${margin.top})`)
//         .call(yAxis);
    
//     // Add x-axis label
//     svg.append("text")
//         .attr("class", "x-axis-label")
//         .attr("x", margin.left + innerWidth / 2)
//         .attr("y", height - 10)
//         .style("text-anchor", "middle")
//         .text("t");

//     // Add y-axis label
//     svg.append("text")
//         .attr("class", "y-axis-label")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -margin.top - innerHeight / 2)
//         .attr("y", 15)
//         .style("text-anchor", "middle")
//         .text("Population");s

//     // Line generator
//     const line = d3.line()
//         .x((d, i) => xScale(i) + margin.left) // Adjust for margin
//         .y(d => yScale(d) + margin.top);

//     // Function to calculate logistic growth
//     function logisticGrowth(N, K, r, t) {
//         const data = [N];
//         for (let i = 1; i <= t; i++) {
//             const prevN = data[i - 1];
//             const nextN = prevN + r * prevN * (1 - prevN / K);
//             data.push(nextN);
//         }
//         return data;
//     }

//     // Initial data
//     let data = logisticGrowth(N, K, r, t);

//     // Draw the initial line
//     const path = svg.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 2)
//         .attr("d", line);

//     // Function to update the chart
//     function updateChart() {
//         data = logisticGrowth(N, K, r, t);
//         path.datum(data)
//             .attr("d", line);
//     }

//     // Expose update functions for sliders
//     return {
//         updateN(value) {
//             N = +value;
//             updateChart();
//         },
//         updateK(value) {
//             K = +value;
//             yScale.domain([0, K]); // Update y-scale domain
//             svg.select(".y-axis").call(yAxis); // Update y-axis
//             updateChart();
//         },
//         updateR(value) {
//             r = +value;
//             updateChart();
//         },
//         updateT(value) {
//             t = +value;
//             xScale.domain([0, t]); // Update x-scale domain
//             svg.select(".x-axis").call(xAxis); // Update x-axis
//             updateChart();
//         },
//     };
// }