import * as d3 from 'd3';

export function RegressionLine(container, { height = 400, margin = { top: 50, right: 50, bottom: 50, left: 70 } } = {}) {
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
    const xAxis = d3.axisBottom(xScale).tickSize(8).tickPadding(8).tickSizeOuter(0).tickFormat(removeZeroFormatter);
    const yAxis = d3.axisLeft(yScale).tickSize(8).tickPadding(10).tickFormat(removeZeroFormatter);

    svg.selectAll("line.horizontalGrid").data(yScale.ticks(10)).enter()
        .append("line")
        .attr(
            {
                "class": "horizontalGrid",
                "x1": margin.right,
                "x2": width,
                "y1": function (d) { return yScale(d); },
                "y2": function (d) { return yScale(d); },
                "fill": "none",
                "shape-rendering": "crispEdges",
                "stroke": "black",
                "stroke-width": "1px"
            });

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
            .style("stroke", "blue")
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
            .transition()
            .duration(500);

        updateRegressionLine(data.slice(0, index + 1));

        setTimeout(() => addPoints(data, index + 1), 500);
    }

    // Start the animation
    addPoints(data);
}