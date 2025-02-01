import * as d3 from 'd3';


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
