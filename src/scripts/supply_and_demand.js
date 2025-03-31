import * as d3 from "d3";

export function DemandSupplyMoves(container, slider_container, {margin = { top: 50, right: 10, bottom: 70, left: 120 } } = {}) {

    // Get the width of the container
    // const containerWidth = d3.select(container).node().getBoundingClientRect().width;
    // const width = containerWidth;
    const width = 500;
    const height = 450;

    // Create SVG element
    const svg = d3.select(container)
        .append("svg")
        // .attr("viewBox", `0 0 ${width} ${height}`)
        // .attr("viewBox", "0 0 450 500")
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
    
    // Demand Label
    svg.append("text")
        .attr("x", xScale(10))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .text("Demand:")
        .style("font-size", "16px")
        .attr("fill", "blue")
        .style("font-family", "sans-serif");
    
    const demandQuantityLabel = svg.append("text")
        .attr("x", xScale(24))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .text("50")
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
    
    // Supply Label
    svg.append("text")
        .attr("x", xScale(86))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .text("Supply:")
        .style("font-size", "16px")
        .attr("fill", "red")
        .style("font-family", "sans-serif");
    
    const supplyQuantityLabel =svg.append("text")
        .attr("x", xScale(98))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .text("50")
        .style("font-size", "16px")
        .attr("fill", "red")
        .style("font-family", "sans-serif");

    // Demand Quantity
    const demandQuantityLine = svg.append("line")
        .attr("x1", xScale(50))
        .attr("x2", xScale(50))
        .attr("y1", 10)
        .attr("y2", innerHeight)
        .attr("stroke", "blue")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 1.5);
    
    // Supply Quantity
    const supplyQuantityLine = svg.append("line")
        .attr("x1", xScale(50))
        .attr("x2", xScale(50))
        .attr("y1", 10)
        .attr("y2", innerHeight)
        .attr("stroke", "red")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 1.5);
    
    // Price Line
    const priceLine = svg.append("line")
        .attr("x1", 0)
        .attr("x2", xScale(100))
        .attr("y1", yScale(50))
        .attr("y2", yScale(50))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 0.5);
    
    // Gap Line
    const discrepancyQuantityLine = svg.append("line")
        .attr("class", "discrepancy-line")
        .attr("stroke", "black")
        .attr("stroke-width", 3)

    // Gap Label
    const ESS_Label = svg.append("text")
        .attr("x", xScale(12))
        .attr("y", yScale(105) )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Equilibrium")
        .attr("fill", "black")
        .style("font-family", "sans-serif");
    
    svg.append("text")
        .attr("x", `${innerWidth / 2 - 15}`)
        .attr("y", yScale(105))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Gap:")
        .style("font-family", "sans-serif");
    
    const discrepancyQuantityLabel = svg.append("text")
        .attr("x", `${innerWidth /2 + 21}`)
        .attr("y", yScale(105) )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("0")
        .style("font-family", "sans-serif");
    
    // Q Label
    svg.append("text")
        .attr("x", xScale(50))
        .attr("y", innerHeight + 50)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Q")
        .style("font-family", "sans-serif");
    
    // P Label
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

    const sliderContainer = d3.select(slider_container)
        .style("height", `${innerHeight}px`)
        .style("display", "flex")
        .style("align-items", "center");
    
    const slider = sliderContainer.append("input")
        .attr("class", "custom-slider")
        .attr("type", "range")
        .style("width", `${innerHeight}px`)
        .style("height", `15px`)
        .style("transform", "rotate(-90deg)")
        .style("transform-origin", "center")
        .style("margin-left", `-100px`)
        .on("input", function () {
            const p = +this.value; 
            const demandQ = 100 - p; 

            // Move quantity and price lines
            supplyQuantityLine.attr("x1", xScale(p)).attr("x2", xScale(p));
            demandQuantityLine.attr("x1", xScale(demandQ)).attr("x2", xScale(demandQ));
            priceLine.attr("y1", yScale(p)).attr("y2", yScale(p));

            // Update text labels
            priceLabel.text(`${p}`).transition().duration(900);
            demandQuantityLabel.text(`${demandQ}`).transition().duration(900);
            supplyQuantityLabel.text(`${p}`).transition().duration(900);

            // Update the red lines to show the discrepancy
            discrepancyQuantityLine
                .attr("x1", xScale(demandQ))
                .attr("x2", xScale(p))
                .attr("y1", yScale(p))
                .attr("y2", yScale(p))
                .transition().duration(900);

            const discrepancyValue = p - demandQ;
            discrepancyQuantityLabel
                .text(`${Math.abs(discrepancyValue)}`)
                .transition().duration(900);
            
            discrepancyQuantityLabel
                .transition()
                .duration(300)
                .attr("fill", discrepancyValue === 0 ? "black" : discrepancyValue > 0 ? "green" : "darkviolet")
                .style("opacity", 1) // Fade in
            
            ESS_Label
                .transition()
                .duration(300)
                .attr("fill", discrepancyValue === 0 ? "black" : discrepancyValue > 0 ? "green" : "darkviolet")
                .style("opacity", 1) // Fade in
                .text(discrepancyValue === 0 ? "Equilibrium" : discrepancyValue > 0 ? "Surplus" : "Shortage");
        });
    return svg.node();
}



export function DemandSupplyShifts(container, demand_slider, supply_slider, { margin = { top: 20, right: 50, bottom: 40, left: 60 } } = {}) {
    const width = 500; // Fixed width for the chart
    const height = 400; // Fixed height for the chart

    // Create SVG element
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10).tickSize(8).tickPadding(8).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(10).tickSize(8).tickPadding(8).tickSizeOuter(0);

    // Append x-axis
    svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    // Append y-axis
    svg.append("g").call(yAxis);

    // Define a clip path to restrict drawing to the inner chart area
    svg.append("defs")
        .append("clipPath")
        .attr("id", "chart-clip")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", innerWidth)
        .attr("height", innerHeight);

    // Demand curve
    const demandPath = svg.append("path")
        .attr("class", "demand-curve")
        .attr("stroke", "blue")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("clip-path", "url(#chart-clip)"); // Apply clip path

    // Supply curve
    const supplyPath = svg.append("path")
        .attr("class", "supply-curve")
        .attr("stroke", "red")
        .attr("stroke-width", 2.5)
        .attr("fill", "none")
        .attr("clip-path", "url(#chart-clip)"); // Apply clip path

    // Equilibrium lines
    const eqPriceLine = svg.append("line")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("clip-path", "url(#chart-clip)");

    const eqQuantityLine = svg.append("line")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("clip-path", "url(#chart-clip)");

    // eqPrice
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2 -40)
        .attr("y", -margin.left + 15)
        .style("text-anchor", "middle")
        .text("Equilibrium Price:")
        .style("font-size", "17px")
        .style("font-family", "sans-serif");
    
    const eqY = svg.append("text")
        .attr("x", - margin.left +10)
        .attr("y", innerHeight/2 - 50)
        .text("50")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-family", "sans-serif");

    // eqQuantity
    svg.append("text")
        .attr("x", xScale(20))
        .attr("y", innerHeight + 50)
        .text("Equilibrium Quantity:")
        .attr("text-anchor", "start")
        .style("font-size", "16px")
        .style("font-family", "sans-serif");
    
    const eqX = svg.append("text")
        .attr("x", xScale(65))
        .attr("y", innerHeight + 50)
        .text("50")
        .attr("text-anchor", "start")
        .style("font-size", "16px")
        .style("font-family", "sans-serif");
    
    // Initial intercepts for demand and supply curves
    let demandIntercept = 100; // Initial demand intercept
    let supplyIntercept = 0;  // Initial supply intercept

    // Function to update the curves
    function updateCurves() {
        // Update demand curve
        const demandLine = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(demandIntercept - d.x));

        demandPath
            .datum(d3.range(0, 101).map(x => ({ x })))
            .attr("d", demandLine);

        // Update supply curve
        const supplyLine = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.x - supplyIntercept));

        supplyPath
            .datum(d3.range(0, 101).map(x => ({ x })))
            .attr("d", supplyLine);

        // Calculate equilibrium point
        const equilibriumX = (demandIntercept + supplyIntercept) / 2;
        const equilibriumY = (demandIntercept - supplyIntercept) / 2;

        // Update equilibrium lines
        eqPriceLine
            .attr("x1", xScale(equilibriumX))
            .attr("y1", yScale(0))
            .attr("x2", xScale(equilibriumX))
            .attr("y2", yScale(100));

        eqQuantityLine
            .attr("x1", xScale(0))
            .attr("y1", yScale(equilibriumY))
            .attr("x2", xScale(100))
            .attr("y2", yScale(equilibriumY));

        eqX
            .text(equilibriumX.toFixed(0));
        
        eqY
            .text(equilibriumY.toFixed(0));
    }

    // Initial curve update
    updateCurves();

    // Select the existing slider elements
    const demandSlider = d3.select("#demand_slider");
    const supplySlider = d3.select("#supply_slider");

    // Add event listeners to the sliders
    demandSlider.on("input", function () {
        demandIntercept = +this.value; // Update demand intercept
        updateCurves(); // Update the chart
    });

    supplySlider.on("input", function () {
        supplyIntercept = +this.value; // Update supply intercept
        updateCurves(); // Update the chart
    });

    return svg.node();
}
