import * as d3 from 'd3';
import { useEffect } from 'react';

export const useHappyChart = (containerRef, data, onUpdateChartReady) => {
  useEffect(() => {
    if (!data || !containerRef.current) return;

    // Define margins and dimensions
    const margin = { top: 40, right: 30, bottom: 90, left: 90 };
    const width = 950 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;

    // Clear previous content
    const container = d3.select(containerRef.current);
    container.selectAll('*').remove();

    // Create chart container
    const chart = container
      .append('div')
      .attr('id', 'chart-container')
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('align-items', 'center');

    // Create SVG
    const svg = chart
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // Create main group
    const g = svg
      .append('g')
      .attr('id', 'g-container')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Background rectangle
    g.append('rect')
      .attr('id', 'rect-container')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

    // Scales
    const gni = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d['GNI pc PPP$']))
      .range([5, 40]);

    const happyScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d['Happy Score']))
      .range([0, width]);

    const co2Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d['CO₂ pc']))
      .range([height, 0]);

    function createColorScale(data) {
      return d3
        .scaleSequential()
        .domain(d3.extent(data, d => d.HALE))
        .interpolator(d3.interpolateGnBu);
    }

    const color = createColorScale(data);

    // X-Axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(happyScale).ticks(10, ',f').tickSize(7).tickPadding(15))
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px');

    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 60)
      .style('font-size', '20px')
      .attr('font-family', 'sans-serif')
      .style('text-anchor', 'middle')
      .text('Happiness Score');

    // Y-Axis
    g.append('g')
      .call(d3.axisLeft(co2Scale).ticks(10, ',f').tickSize(7).tickPadding(10))
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px');

    g.append('text')
      .attr('transform', `translate(${-60}, ${height / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-family', 'sans-serif')
      .text('CO₂ per capita')
      .style('font-size', '20px');

    // LEGEND
    const legendValues = [1000, 25000, 50000, 75000, 150000];
    const legendTitle = 'GNI pc PPP$';

    // Parameters to control the position of the entire legend
    const xLegend = 190;
    const yLegend = 340;

    // Create a container for the entire legend
    const gni_legend = svg.append('g').attr('transform', `translate(${xLegend}, ${yLegend})`); // Move the whole legend

    // Add legend title
    gni_legend
      .append('text')
      .attr('x', -50) // Relative to the group's xLegend
      .attr('y', -100) // Relative to the group's yLegend
      .text(legendTitle)
      .style('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'sans-serif');

    // Add circles to the legend
    gni_legend
      .selectAll('legend-circle')
      .data(legendValues)
      .join('circle')
      .attr('cx', 0) // Relative to the group's xLegend
      .attr('cy', d => -gni(d))
      .attr('r', d => gni(d))
      .style('fill', 'none');

    // Add labels to the legend
    gni_legend
      .selectAll('legend-label')
      .data(legendValues)
      .join('text')
      .attr('x', (d, i) => 50 + i * 4) // Adjust label x position relative to the circles
      .attr('y', (d, i) => -2 - i * 17) // Align labels with circles
      .text(d => d)
      .attr('alignment-baseline', 'middle');

    // COLOR LEGEND
    const colorLegend = svg
      .append('g')
      .attr('transform', `translate(${margin.left + 50}, ${margin.top + height / 7})`);

    const colorScale = d3.scaleSequential(d3.interpolateGnBu).domain(d3.extent(data, d => d.HALE));

    const legendWidth = 250;
    const legendHeight = 20;

    const legendScale = d3.scaleLinear().domain(colorScale.domain()).range([0, legendWidth]);

    // Modify the axis to remove end ticks
    const legendAxis = d3
      .axisBottom(legendScale)
      .ticks(5)
      .tickSize(6)
      .tickFormat((d, i, nodes) => {
        return d3.format('.0f')(d);
      });

    // Append and style the axis
    const axisGroup = colorLegend
      .append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis);

    // Remove the domain line
    axisGroup.select('.domain').remove();

    // Style the ticks
    axisGroup.selectAll('.tick line').attr('stroke', 'none');

    const legendGradient = colorLegend
      .append('defs')
      .append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    legendGradient
      .selectAll('stop')
      .data(
        colorScale.ticks().map((t, i, n) => ({
          offset: `${(100 * i) / (n.length - 1)}%`,
          color: colorScale(t),
        })),
      )
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Draw the gradient rectangle for the legend
    colorLegend
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#legend-gradient)');

    // Add label for the legend
    colorLegend
      .append('text')
      .attr('transform', `translate(${legendWidth / 2}, ${legendHeight - 30})`)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Healthy life expectancy (HALE)');

    // Add a horizontal reference line
    const yValue = 2; // The y value where you want the reference line
    g.append('line')
      .attr('id', 'ref-line')
      .attr('x1', '0%') // Starting x position of the line
      .attr('x2', '87%') // Ending x position of the line (span full width)
      .attr('y1', co2Scale(yValue)) // y position for both y1 and y2 (in data coordinates)
      .attr('y2', co2Scale(yValue)) // Same y position to make the line horizontal
      .attr('stroke-width', 3) // Line thickness
      .attr('stroke-dasharray', '4 4'); // Optional dashed line

    // Add text label above the line
    g.append('text')
      .attr('id', 'ref-label')
      .attr('x', 10) // Center text horizontally or adjust as needed
      .attr('y', co2Scale(yValue) - 10) // Position text slightly above the line
      .style('font-weight', 'bold')
      .style('font-size', '16px')
      .text('Sustainable CO2 pc.'); // Text content

    // Tooltip
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

    function showTooltip(event, d) {
      tooltip.transition().duration(200).style('opacity', 0.9);

      tooltip
        .html(
          `
                <table>
                    <tr><td>Country:</td><td><strong>${d.Country}</strong></td></tr>
                    <tr><td>Year:</td><td><strong>${d.Year}</strong></td></tr>
                    <tr><td>Happiness:</td><td><strong>${d['Happy Score'].toFixed(2)}</strong></td></tr>
                    <tr><td>CO₂ pc:</td><td><strong>${d['CO₂ pc'].toFixed(2)}</strong></td></tr>
                    <tr><td>HALE:</td><td><strong>${d.HALE.toFixed(2)}</strong></td></tr>
                    <tr><td>GNI pc PPP$:</td><td><strong>${d['GNI pc PPP$'].toFixed(0)}</strong></td></tr>
                </table>
            `,
        )
        .attr('class', 'tooltip')
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px');
    }

    function hideTooltip() {
      tooltip.transition().duration(500).style('opacity', 0);
    }

    // Function to update the chart based on the selected year
    function updateChart(selectedYear) {
      const filteredData = data.filter(d => +d.Year === selectedYear);
      // if (filteredData.length === 0) return;

      // Remove existing subtitle if it exists
      d3.select('#selected-year').remove();

      // Add new subtitle
      g.append('text')
        .attr('id', 'selected-year')
        .attr('x', width / 2)
        .attr('y', -25)
        .attr('text-anchor', 'middle')
        // .style("font-weight", "bold")
        // .style("font-size", "36px")
        .text(`Wealth, health, CO2 pp. and happiness in ${selectedYear}`);

      // Bind data to circles
      const circles = g.selectAll('circle').data(filteredData, d => d?.Country || Math.random()); // Use 'Country' as the key for data join

      // Remove old circles
      circles
        .exit()
        .transition() // Transition out exiting circles before removing
        .duration(1000)
        .attr('r', 0) // Shrink the radius to 0
        .remove(); // Remove old circles from the DOM

      // Create new circles for entering data
      const enteringCircles = circles
        .enter()
        .append('circle')
        .attr('r', 0) // Start with radius 0 for entering circles
        .attr('cx', d => happyScale(d['Happy Score'])) // Position based on new data
        .attr('cy', d => co2Scale(d['CO₂ pc']))
        .style('fill', d => color(d.HALE))
        .style('stroke', 'lightgrey')
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip)
        .transition() // Transition the entering circles
        .duration(1000)
        .attr('r', d => gni(d['GNI pc PPP$'])); // Transition to the new radius

      // Update existing circles
      circles
        .merge(enteringCircles) // Merge both entering and updating selection
        .transition() // Transition the updated circles
        .duration(1000)
        .attr('r', d => gni(d['GNI pc PPP$'])) // Update the radius
        .attr('cx', d => happyScale(d['Happy Score'])) // Update x position
        .attr('cy', d => co2Scale(d['CO₂ pc'])); // Update y position
    }

    // Initialize with 2019 data
    onUpdateChartReady(() => updateChart);

    // Cleanup
    return () => {
      container.selectAll('*').remove();
    };
  }, [data, containerRef, onUpdateChartReady]);
};
