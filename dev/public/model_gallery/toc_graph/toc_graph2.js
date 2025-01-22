import ForceGraph from 'force-graph';

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

export function GraphTOC(data, containerID, { height = 700 } = {}) {

    // Get the container element
    const containerElement = document.getElementById(containerID);
    if (!containerElement) {
        console.error(`Container with ID "${containerID}" not found.`);
        return;
    }

    // const { nodes, links } = transformData(data);
    const graphData = transformData(data);

    // Initialize the force graph
    const Graph = ForceGraph()(containerElement)
        .graphData(graphData) 
        .width(containerElement.offsetWidth)
        // .height(containerElement.offsetHeight)
        .height(height)
        .nodeId('id') 
        .nodeLabel('id') 
        .nodeAutoColorBy('type')
        .d3VelocityDecay(0.08)
        .linkColor(() => 'gray') 
        .cooldownTicks(10)
        .linkSource('source')
        .linkTarget('target')
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
    
    // Graph.onEngineStop(() => Graph.zoomToFit(500));

    return Graph;
}