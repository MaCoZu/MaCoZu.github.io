import ForceGraph from 'force-graph';
import * as d3 from "d3";

function transformData(data) {
    const nodes = data.children.map(item => ({
        id: item.id,
        type: item.type, // Group based on the type
        text: item.text,  // First paragraph or additional info
        url: item.url     // Link to navigate
    }));

    const links = data.children.flatMap(item =>
        item.links.map(link => ({
            source: item.id,
            target: link,
            value: 1 // Default weight for links
        }))
    );

    return { nodes, links };
}

export function GraphTOC(data, containerID, legendContainerID, { height = 700 } = {}) {

    // Get the container element
    const containerElement = document.getElementById(containerID);
    if (!containerElement) {
        console.error(`Container with ID "${containerID}" not found.`);
        return;
    }

    // const { nodes, links } = transformData(data);
    const graphData = transformData(data);

    // Define a color scale for node types
    const colorScale = {
        model: '#FF6F61', // Coral
        system: '#6B5B95', // Purple
        theory: '#88B04B', // Green
        // Add more types and colors as needed
    };

    // Initialize the force graph
    const Graph = ForceGraph()(containerElement)
        .graphData(graphData) 
        .width(containerElement.offsetWidth)
        // .height(containerElement.offsetHeight)
        .height(height)
        .nodeId('id') 
        .nodeLabel('id') 
        .nodeColor(node => colorScale[node.type] || '#CCCCCC') // Default to gray if type is not defined
        // .nodeColor('type')
        .d3VelocityDecay(0.08)
        .cooldownTicks(10)
        .linkSource('source')
        .linkTarget('target')
        .linkColor(() => 'gray') 
        .linkWidth(0.5)
        // .linkCurvature(0.1)
        .onNodeHover(node => {
            containerElement.style.cursor = node ? 'pointer' : null;
        })
        .onNodeClick(node => {
            if (node.url) {
                window.open(node.url, "_self");
            }
        })
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
        });
    
    // Generate the legend using D3.js
    const legendContainer = d3.select(`#${legendContainerID}`);
    if (legendContainer.empty()) {
        console.error(`Legend container with ID "${legendContainerID}" not found.`);
        return;
    }

    // Clear any existing content in the legend container
    legendContainer.selectAll('*').remove();

    // Create an SVG container for the legend
    const legendSvg = legendContainer.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('overflow', 'visible'); // Ensure the legend is visible

    // Extract unique types for the legend
    const uniqueTypes = [...new Set(graphData.nodes.map(node => node.type))];

    // Add legend items
    const legendItems = legendSvg.selectAll('.legend-item')
        .data(uniqueTypes)
        .join('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 45})`); // Adjust spacing as needed

    // Add circles
    legendItems.append('circle')
        .attr('cx', 10) // Center of the circle
        .attr('cy', 10) // Center of the circle
        .attr('r', 12)   // Radius of the circle
        .attr('fill', type => colorScale[type] || '#CCCCCC'); // Use the color scale

    // Add labels
    legendItems.append('text')
        .attr('x', 35) // Position the text to the right of the circle
        .attr('y', 15) // Align the text vertically with the circle
        .text(type => type.charAt(0).toUpperCase() + type.slice(1)) // Capitalize type names
        .style('font-size', '18px')
        .style('font-family', 'sans-serif')
        .style('fill', '#000');
    
    // Graph.onEngineStop(() => Graph.zoomToFit(500));

    return Graph;
}