import * as d3 from 'd3';
import { useEffect } from 'react';

function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    text: isDark 
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-dark').trim() || '#EDEAF6'
      : getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#4F2B3B',
    heading: isDark
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-dark').trim() || '#E2CAD5'
      : getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#422432',
    link: isDark
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-dark').trim() || '#E2CAD5'
      : getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#422432',
    bg: isDark
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg-dark').trim() || '#0F121E'
      : getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() || '#EDEAF6',
  };
}

export const useEcoChart = (containerRef, data) => {
  useEffect(() => {
    if (!data || !containerRef.current) return;

    const colors = getThemeColors();

    // Define margins and dimensions
    const margin = { top: 10, right: 30, bottom: 80, left: 90 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

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

    // Define scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.HDI))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d['Number of Earths required']))
      .range([height, 0]);

    // Add X axis
    const xAxis = svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    xAxis.selectAll('text').attr('fill', colors.text).attr('opacity', 0.6);
    xAxis.select('.domain').attr('stroke', colors.text).attr('opacity', 0.6);

    // X axis title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 60)
      .attr('fill', colors.heading).attr('opacity', 0.6)
      .style('text-anchor', 'middle')
      .text('Human Development Index');

    // Add Y axis
    const yAxis = svg.append('g').call(d3.axisLeft(y));
    yAxis.selectAll('text').attr('fill', colors.text).attr('opacity', 0.6);
    yAxis.select('.domain').attr('stroke', colors.text).attr('opacity', 0.6);

    // Y axis title
    svg
      .append('text')
      .attr('transform', `translate(${-60}, ${height / 2}) rotate(-90)`)
      .attr('fill', colors.heading).attr('opacity', 0.6)
      .attr('text-anchor', 'middle')
      .text('Number of Earths');

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
      .style('background', colors.bg)
      .style('border', `1px solid ${colors.text}`)
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('color', colors.text);

    // Tooltip functions
    const showTooltip = (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);

      tooltip
        .html(
          `
        <table class="custom-table"">
          <tr>
                <td>Country</td>
                <td style="width: 30px;"></td>
                <td style="padding: 2px 0;"><strong>${d.Country}</strong></td>
            </tr>
            <tr>
                <td>Region</td>
                <td style="width: 30px;"></td>
                <td style="padding: 2px 0;"><strong>${d.Region}</strong></td>
            </tr>
            <tr>
                <td class="tight-lines">Earths<br>required</td>
                <td style="width: 30px;"></td>
                <td><strong>${d['Number of Earths required']}</strong></td>
            </tr>
            <tr>
                <td>SDG</td>
                <td style="width: 30px;"></td>
                <td><strong>${d.SDGi.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td>HDI</td>
                <td style="width: 30px;"></td>
                <td><strong>${d.HDI.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td class="tight-lines">Life<br>Expectancy</td>
                <td style="width: 30px;"></td>
                <td><strong>${d['Life Expectancy'].toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td>GDP pc.</td>
                <td style="width: 30px;"></td>
                <td><strong>$ ${d['Per Capita GDP in $'].toFixed(0)}</strong></td>
            </tr>
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

    // Add reference lines and labels
    svg
      .append('line')
      .attr('class', 'refLine')
      .attr('stroke', colors.text)
      .attr('stroke-width', '2px')
      .attr('stroke-dasharray', '3, 3')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(1))
      .attr('y2', y(1))
      .attr('opacity', 0.6)
      .attr('stroke-dasharray', '3 3');

    svg
      .append('text')
      .attr('id', 'bio-label')
      .attr('fill', colors.text)
      .attr('opacity', 0.6)
      .attr('x', 10)
      .attr('y', y(1) - 10)
      .text('World Biocapacity');

    svg
      .append('line')
      .attr('class', 'refLine')
      .attr('stroke', colors.text)
      .attr('stroke-width', '2px')
      .attr('stroke-dasharray', '3, 3')
      .attr('x1', x(0.7))
      .attr('x2', x(0.7))
      .attr('y1', y(8.5))
      .attr('y2', y(0.0))
      .attr('stroke-width', 2)
      .attr('opacity', 0.6)
      .attr('stroke-dasharray', '3 3');

    svg.append('text')
      .attr('class', 'ref-label')
      .attr('fill', colors.text).attr('opacity', 0.6)
      .attr('x', x(0.71))
      .attr('y', y(6.5))
      .text('High HD');

    svg
      .append('line')
      .attr('class', 'refLine')
      .attr('stroke', colors.text).attr('opacity', 0.6)
      .attr('stroke-width', '2px')
      .attr('stroke-dasharray', '3, 3')
      .attr('x1', x(0.8))
      .attr('x2', x(0.8))
      .attr('y1', y(8.5))
      .attr('y2', y(1))
      .attr('stroke-width', 2)
      .attr('opacity', 0.6)
      .attr('stroke-dasharray', '3 3');

    svg
      .append('text')
      .attr('class', 'ref-label')
      .attr('fill', colors.text).attr('opacity', 0.6)
      .attr('x', x(0.81))
      .attr('y', y(6.5))
      .selectAll('tspan')
      .data(['Very high HD']) // Data for each line
      .enter()
      .append('tspan')
      .attr('x', x(0.81))
      .attr('dy', (d, i) => (i === 0 ? 0 : 20))
      .text(d => d);

    // Add SDG quadrant
    svg
      .append('rect')
      .attr('id', 'sdg-quadrant')
      .attr('x', x(0.7))
      .attr('y', y(1))
      .attr('width', x(0.26))
      .attr('height', y(0.0) - y(1))
      .style('opacity', 0.15)
      .attr('fill', colors.text);

    svg
      .append('text')
      .attr('id', 'bio-label')
      .attr('fill', colors.text)
      .attr('opacity', 0.6)
      .attr('x', x(0.71))
      .attr('y', y(0.54))
      .selectAll('tspan')
      .data(['Global Sustainable', 'Development Quadrant'])
      .enter()
      .append('tspan')
      .attr('x', x(0.73))
      .attr('dy', (d, i) => i * 20)
      .text(d => d);

    // Add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', d => `dot ${d.Region.replace(/\s+/g, '')}`)
      .attr('cx', d => x(d.HDI))
      .attr('cy', d => y(d['Number of Earths required']))
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

      legendRow.append('text').attr('x', 15).attr('y', 5).attr('fill', colors.text).style('font-size', '14px').text(region);

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
  }, [data, containerRef]);
};
