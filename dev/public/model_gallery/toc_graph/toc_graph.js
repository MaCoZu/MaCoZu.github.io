import * as d3 from 'd3'; 


export function GraphTOC(data, container, { height = 600 } = {}) {
    // Get the available width of the container
    const containerWidth = d3.select(container).node().getBoundingClientRect().width;


    // Use the container's width and the specified height
    const width = containerWidth;



    // Flatten nodes and create links based on the "links" property.
    const nodes = data.children.map(d => ({
        id: d.id,
        text: d.text,
        url: d.url
    }));

    const links = data.children.flatMap(d =>
        d.links.map(target => ({
            source: d.id,
            target
        }))
    );

    // Start the force simulation.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(130).strength(1.5))
        .force("charge", d3.forceManyBody().strength(-200).distanceMin(150))
        .force("center", d3.forceCenter().strength(1))
        .force("collide", d3.forceCollide().radius(45).strength(1)) // Add collision detection
        // .force("radial", d3.forceRadial(100, width / 2, height / 2))
        .force("x", d3.forceX(1).strength(0.0001))
        .force("y", d3.forceY(height).strength(0.0001));
    
        
    // Create the container SVG.
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");
    
    // Add a glow filter
    svg.append("defs").append("filter")
        .attr("id", "glow")
        .append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "coloredBlur");

    const feMerge = svg.select("filter#glow").append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Append links.
    const link = svg.append("g")
        .attr("stroke", "black")
        .attr("stroke-opacity", 0.3)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 1.5);

    // Append nodes.
    const node = svg.append("g")
        // .attr("stroke", "darkgreen")
        // .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("fill", "darkorange")
        .attr("r", 6)
        .call(drag(simulation)) // Dragging functionality.
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)
                .style("font-size", "14px")
                .html(`<strong>${d.id}</strong><br>${d.text}`);
        })
        .on("mousemove", event => {
            tooltip
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY}px`);
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        })
        .on("click", (event, d) => {
            window.open(d.url, "_self"); // Open the link in a new tab.
        });

    const labels = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("font-size", "12px")
        .attr("font-weight", 400)
        .attr("text-anchor", "middle") // Center-align the labels
        .attr("dy", "-2.8em") // Position slightly above the nodes
        .attr("dx", "0.1em")
        .text(d => d.id);


    // Add tooltips.
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("padding", "8px")
        .style("font-size", "14px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels
            .attr("x", d => d.x) // Update label position dynamically
            .attr("y", d => d.y + 20); // Offset vertically below the nodes
    });

    return svg.node();

    function drag(simulation) {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();

                // Bring the dragged node to the front
                d3.select(event.sourceEvent.target).raise();

                // Fix the dragged node's position
                d.fx = d.x;
                d.fy = d.y;

                // Increase the size of the dragged node
                d3.select(event.sourceEvent.target)
                    .attr("r", 12) // Increase radius
                    .attr("filter", "url(#glow)"); // Add a glow effect

                // Reduce the repulsion for other nodes to make the dragged node stand out
                simulation.force("charge", d3.forceManyBody().strength(node => (node === d ? -500 : -30)));
            })
            .on("drag", (event, d) => {
                // Move the dragged node
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);

                // Reset the dragged node's size and remove the glow effect
                d3.select(event.sourceEvent.target)
                    .attr("r", 6) // Reset radius
                    .attr("filter", null); // Remove glow effect

                // Release the dragged node's fixed position
                d.fx = null;
                d.fy = null;

                // Reset the charge force
                simulation.force("charge", d3.forceManyBody().strength(-200));
            });
    }
}