import * as d3 from "d3";


// segregation_test.js
export default async function createTestChart(data, targetID) {

    // Create the SVG element and append it to the target element
    const svg = d3.select(targetID)
        .append("svg")
        .attr("width", 500) // Adjust width as needed
        .attr("height", 100); // Adjust height as needed

    // Create circles for each data point
    svg.selectAll("dot")
        .data(data) // Use your actual data here
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x) // Concise arrow function
        .attr("cy", (d) => d.y)
        .attr("r", 3)
        .style("fill", "red");

    return svg.node();
}
