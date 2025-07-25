import * as d3 from 'd3';
import { useEffect } from 'react';

export const useEcoChart = (containerRef, data, xVariable, yVariable) => {
  useEffect(() => {
    if (!data || !containerRef.current) return;

    // Define margins and dimensions
    const margin = { top: 10, right: 30, bottom: 80, left: 90 };
    const width = 950 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;

    // Clear previous content
    const container = d3.select(containerRef.current);
    container.selectAll('*').remove();

    // Append a div for the chart layout
    const chart = container
      .append('div')
      .attr('id', 'chart-container')
      .style('display', 'flex')
      .style('flex-direction', 'row')
      .style('align-items', 'center');

    // Append SVG to the chart container
    const svg = chart
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Update your scales to use the selected variables
    const xAxis = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d[xVariable]))
      .range([0, width]);

    const yAxis = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d[yVariable]))
      .range([height, 0]);

    // Add X axis
    // svg.append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(x));

    // Add X axis
    svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`).call(xAxis);

    // X axis title - now dynamic
    svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height + 60)
      .style('text-anchor', 'middle')
      .text(xVariable);

    // Add Y axis
    svg.append('g').attr('class', 'y-axis').call(yAxis);

    // Y axis title - now dynamic
    svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', `translate(${-60}, ${height / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yVariable);

    // Define color scale for regions
    const color = d3
      .scaleOrdinal()
      .domain([
        'Africa',
        'EU-27',
        'Other Europe',
        'Middle East/Central Asia',
        'Asia-Pacific',
        'North America',
        'Central America/Caribbean',
        'South America',
      ])
      .range([
        'darkgoldenrod',
        'blue',
        'tan',
        'darkolivegreen',
        'crimson',
        'blueviolet',
        'fuchsia',
        'purple',
      ]);

    let selectedRegion = null;

    // Tooltip setup
    const tooltip = container
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid #ccc')
      .style('padding', '10px')
      .style('border-radius', '5px');

    // Tooltip functions
    // Tooltip functions
    const showTooltip = (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);

      tooltip
        .html(
          `
        <table>
          <tr><td>Country</td><td><strong>${d.Country}</strong></td></tr>
          <tr><td>Region</td><td><strong>${d.Region}</strong></td></tr>
          <tr><td>${yVariable}</td><td><strong>${d[yVariable].toFixed(2)}</strong></td></tr>
          <tr><td>${xVariable}</td><td><strong>${xVariable === 'Income Group' ? d[xVariable] : d[xVariable].toFixed(2)}</strong></td></tr>
          ${xVariable !== 'SDGi' ? `<tr><td>SDG</td><td><strong>${d.SDGi.toFixed(2)}</strong></td></tr>` : ''}
          ${xVariable !== 'Life Expectancy' ? `<tr><td>Life Expectancy</td><td><strong>${d['Life Expectancy'].toFixed(2)}</strong></td></tr>` : ''}
          ${xVariable !== 'Per Capita GDP' ? `<tr><td>GDP pc.</td><td><strong>$ ${d['Per Capita GDP'].toFixed(0)}</strong></td></tr>` : ''}
        </table>
      `,
        )
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 28}px`)
        .style('z-index', 10);
    };

    const hideTooltip = () => {
      tooltip.transition().duration(500).style('opacity', 0);
    };

    // Highlight and selection functions
    const highlight = (event, d) => {
      const region = d.Region || d;
      d3.selectAll('.dot')
        .transition()
        .duration(200)
        .style('fill', dot => (dot.Region === region ? color(region) : 'grey'))
        .attr('r', dot => (dot.Region === region ? 7 : 3));
    };

    const doNotHighlight = () => {
      if (!selectedRegion) {
        d3.selectAll('.dot')
          .transition()
          .duration(200)
          .style('fill', d => color(d.Region))
          .attr('r', 4);
      }
    };

    const toggleSelection = (event, d) => {
      const region = d.Region || d;
      if (selectedRegion === region) {
        selectedRegion = null;
        doNotHighlight();
      } else {
        selectedRegion = region;
        highlight(event, d);
      }
    };

    // Add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', d => `dot ${d.Region.replace(/\s+/g, '')}`)
      .attr('cx', d => xAxis(d[xVariable]))
      .attr('cy', d => yAxis(d[yVariable]))
      .attr('r', 4)
      .style('fill', d => color(d.Region))
      .on('mouseover', showTooltip)
      .on('mouseout', hideTooltip)
      .on('click', toggleSelection);

    // Add legend
    const legend = svg.append('g').attr('class', 'legend').attr('transform', `translate(50, 30)`);

    color.domain().forEach((region, i) => {
      const legendRow = legend.append('g').attr('transform', `translate(0, ${i * 28})`);

      legendRow.append('circle').attr('r', 7).attr('fill', color(region));

      legendRow.append('text').attr('x', 15).attr('y', 5).style('font-size', '14px').text(region);

      legendRow
        .on('mouseover', event => highlight(event, region))
        .on('mouseleave', doNotHighlight)
        .on('click', event => toggleSelection(event, region))
        .style('cursor', 'pointer');
    });

    return () => {
      // Cleanup
      container.selectAll('*').remove();
    };
  }, [data, containerRef, xVariable, yVariable]);
};
