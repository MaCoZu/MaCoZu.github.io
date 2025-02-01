import * as d3 from "d3";

export function DemandSupplyChart(container, { height = 400, margin = { top: 50, right: 10, bottom: 70, left: 120 } } = {}) {

    // Get the width of the container
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    // const width = containerWidth;
    const width = 500;

    // Create SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // Supply and demand curves (linear functions)
    const demandLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(100 - d.x)); // Demand: y = 100 - x

    const supplyLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.x)); // Supply: y = x

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10).tickSize(8).tickPadding(8).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(10).tickSize(8).tickPadding(8).tickSizeOuter(0);

    svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    svg.append("g").call(yAxis);

    // Demand curve
    svg.append("path")
        .datum(d3.range(0, 101).map(x => ({ x })))
        .attr("d", demandLine)
        .attr("stroke", "blue")
        .attr("stroke-width", 2.5)
        .attr("fill", "none");
    
    svg.append("text")
        .attr("x", xScale(20))
        .attr("y", 2)
        .attr("text-anchor", "middle")
        .text("Demand")
        .style("font-size", "16px")
        .attr("fill", "blue")
        .style("font-family", "sans-serif");

    // Supply curve
    svg.append("path")
        .datum(d3.range(0, 101).map(x => ({ x })))
        .attr("d", supplyLine)
        .attr("stroke", "red")
        .attr("stroke-width", 2.5)
        .attr("fill", "none");
    
    svg.append("text")
        .attr("x", xScale(80))
        .attr("y", 2)
        .attr("text-anchor", "middle")
        .text("Supply")
        .style("font-size", "16px")
        .attr("fill", "red")
        .style("font-family", "sans-serif");

    // Moving gray lines
    const quantityLine = svg.append("line")
        .attr("x1", xScale(50))
        .attr("x2", xScale(50))
        .attr("y1", 10)
        .attr("y2", innerHeight)
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 2);
    
    const priceLine = svg.append("line")
        .attr("x1", 0)
        .attr("x2", xScale(50))
        .attr("y1", yScale(50))
        .attr("y2", yScale(50))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 2);

    // Labels
    svg.append("text")
        .attr("x", xScale(50)-50)
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Quantity:")
        .style("font-family", "sans-serif");
    
    const quantityLabel = svg.append("text")
        .attr("x", xScale(50))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("50")
        .style("font-family", "sans-serif");

    svg.append("text")
        .attr("x", -40)
        .attr("y", yScale(50) -20)
        .text("Price:")
        .attr("text-anchor", "end")
        .style("font-size", "16px")
        .style("font-family", "sans-serif");

    const priceLabel = svg.append("text")
        .attr("x", -40)
        .attr("y", yScale(50) + 5)
        .attr("text-anchor", "end")
        .style("font-size", "16px")
        .text("50")
        .style("font-family", "sans-serif");


    // Slider
    const slider = d3.select(container)
        .append("input")
        .attr("type", "range")
        .attr("min", 0)
        .attr("max", 100)
        .attr("value", 50)
        .on("input", function () {
            const q = +this.value;
            const p = 100 - q; // Price from demand curve

            quantityLine.attr("x1", xScale(q)).attr("x2", xScale(q)).transition().duration(900);
            priceLine.attr("x2", xScale(q)).attr("y1", yScale(p)).attr("y2", yScale(p)).transition().duration(900);

            // quantityLabel.attr("x", xScale(q)).text(`Quantity: ${q}`);
            // priceLabel.attr("y", yScale(p) + 5).text(`Price: ${p}`);
            
            priceLabel.text(`${p}`).transition().duration(900);
            quantityLabel.text(`${q}`).transition().duration(900);
        });

    return svg.node();
}
