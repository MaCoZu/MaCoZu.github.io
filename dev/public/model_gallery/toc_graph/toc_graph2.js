import ForceGraph from 'force-graph';

function transformData(data) {
    const nodes = [];
    const links = [];

    // Recursively extract nodes and links
    function processNode(node, parentId = null) {
        nodes.push({
            id: node.id,
            type: node.type,
            text: node.text,
            url: node.url
        });

        if (parentId) {
            links.push({
                source: parentId,
                target: node.id
            });
        }

        if (node.links) {
            node.links.forEach(linkedId => {
                links.push({
                    source: node.id,
                    target: linkedId
                });
            });
        }

        if (node.children) {
            node.children.forEach(child => processNode(child, node.id));
        }
    }

    processNode(data);
    return { nodes, links };
}




export function createForceGraph(data, container, { height = 600 } = {}) {
    // Transform your data into nodes and links
    const { nodes, links } = transformData(data);

    // Get the container's width
    const containerWidth = document.getElementById(container).getBoundingClientRect().width;

    // Define color scale for node types
    const colorScale = {
        "model": "steelblue",
        "theory": "green",
        "system": "orange"
    };

    // Initialize the force graph
    const graph = ForceGraph();
    const elem = document.getElementById(container);

    graph(elem)
        .graphData({ nodes, links })
        .nodeId("id")
        .nodeLabel("text")
        .nodeAutoColorBy("type")
        .nodeCanvasObject((node, ctx, globalScale) => {
            // Draw node as a circle
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = colorScale[node.type] || "gray"; // Use color scale
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fill();

            // Draw node label
            ctx.fillStyle = "black";
            ctx.fillText(label, node.x, node.y + 10);
        })
        .linkColor(() => "rgba(0, 0, 0, 0.2)")
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(2)
        .onNodeHover(node => {
            // Highlight nodes and links on hover
            elem.style.cursor = node ? 'pointer' : null;
            graph
                .nodeAutoColorBy(n => node && (n === node || n.neighbors?.includes(node)) ? colorScale[n.type] : "gray")
                .linkColor(l => node && (l.source === node || l.target === node) ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.2)");
        })
        .onNodeClick(node => {
            // Open URL on node click
            if (node.url) {
                window.open(node.url, "_self");
            }
        })
        .width(containerWidth)
        .height(height);
}