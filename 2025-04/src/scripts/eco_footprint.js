import * as d3 from "d3";

export function EcoChart(container, data_path) {
    // d3.select(selector).selectAll("*").remove();

    // Define margins and dimensions
    const margin = { top: 10, right: 30, bottom: 80, left: 90 };
    const width = 950 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;

    // Select the container and append a div for the chart
    const chartContainer = d3.select(container);
    const chart = chartContainer.append("div")
        .attr("id", "chart-container")
        .style("display", "flex")
        .style("flex-direction", "row")
        .style("align-items", "center");

    // Append SVG to the chart container
    const svg = chart.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load data from CSV
    d3.csv(data_path).then(data => {
        if (!data || data.length === 0) {
            console.error("Data is empty or could not be loaded from:", data_path);
            return;
        }
        // Parse data
        data.forEach(d => {
            d.Country = d.Country;
            d.Region = d.Region;
            d.SDGi = +d.SDGi;
            d.HDI = +d.HDI;
            d['Life Expectancy'] = +d['Life Expectancy'];
            d['Per Capita GDP'] = +d['Per Capita GDP'];
            d['Income Group'] = +d['Income Group'];
            d['Population (millions)'] = +d['Population (millions)'];
            d['Number of Earths required'] = +d['Number of Earths required'];
        });

        // Define scales
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.HDI))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d['Number of Earths required']))
            .range([height, 0]);

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // X axis title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 60)
            .style("text-anchor", "middle")
            .text("Human Development Index");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Y axis title
        svg.append("text")
            .attr("transform", `translate(${-60}, ${height / 2}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .text("Number of Earths");

        // Define color scale for regions
        const color = d3.scaleOrdinal()
            .domain([
                "Africa",
                "EU-27",
                "Other Europe",
                "Middle East/Central Asia",
                "Asia-Pacific",
                "North America",
                "Central America/Caribbean",
                "South America",
            ])
            .range([
                "darkgoldenrod",
                "blue",
                "tan",
                "darkolivegreen",
                "crimson",
                "blueviolet",
                "fuchsia",
                "purple",
            ]);

        let selectedRegion = null;

        // Tooltip setup
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("border-radius", "5px");

        // Tooltip functions
        const showTooltip = (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);

            tooltip.html(`
                <table>
                    <tr><td>Country</td><td><strong>${d.Country}</strong></td></tr>
                    <tr><td>Region</td><td><strong>${d.Region}</strong></td></tr>
                    <tr><td>Earths required</td><td><strong>${d['Number of Earths required']}</strong></td></tr>
                    <tr><td>SDG</td><td><strong>${d.SDGi.toFixed(2)}</strong></td></tr>
                    <tr><td>HDI</td><td><strong>${d.HDI.toFixed(2)}</strong></td></tr>
                    <tr><td>Life Expectancy</td><td><strong>${d['Life Exectancy'].toFixed(2)}</strong></td></tr>
                    <tr><td>GDP pc.</td><td><strong>$ ${d['Per Capita GDP'].toFixed(0)}</strong></td></tr>
                </table>
            `)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("z-index", 10); 
        };

        const hideTooltip = () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        };

        // Highlight and selection functions
        const highlight = (event, d) => {
            const region = d.Region || d;
            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("fill", dot => dot.Region === region ? color(region) : "grey")
                .attr("r", dot => dot.Region === region ? 7 : 3);
        };

        const doNotHighlight = () => {
            if (!selectedRegion) {
                d3.selectAll(".dot")
                    .transition()
                    .duration(200)
                    .style("fill", d => color(d.Region))
                    .attr("r", 4);
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
        svg.append("line")
            .attr("id", "ref-line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", y(1))
            .attr("y2", y(1))
            // .style("stroke", "rgb(0, 68, 11)")
            .attr("stroke-width", 2.5)
            .attr("stroke-dasharray", "3 3");

        svg.append("text")
            .attr("id", "bio-label")
            .attr("x", 10)
            .attr("y", y(1) - 10)
            .text("World Biocapacity");

        svg.append("line")
            .attr("id", "ref-line")
            .attr("x1", x(0.7))
            .attr("x2", x(0.7))
            .attr("y1", y(8.5))
            .attr("y2", y(0.1))
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "3 3");

        svg.append("text")
            .attr("id", "ref-label")
            .attr("x", x(0.71))
            .attr("y", y(8.2))
            .text("High");

        svg.append("line")
            .attr("id", "ref-line")
            .attr("x1", x(0.8))
            .attr("x2", x(0.8))
            .attr("y1", y(8.5))
            .attr("y2", y(0.1))
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "3 3");

        svg.append("text")
            .attr("id", "ref-label")
            .attr("x", x(0.81)) 
            .attr("y", y(8.2)) 
            .selectAll("tspan")
            .data(["Very high", "human", "development"]) // Data for each line
            .enter()
            .append("tspan")
            .attr("x", x(0.81)) 
            .attr("dy", (d, i) => i === 0 ? 0 : 20) 
            .text(d => d); 

        // Add SDG quadrant
        svg.append("rect")
            .attr("id", "sdg-quadrant")
            .attr("x", x(0.7))
            .attr("y", y(1))
            .attr("width", x(0.26))
            .attr("height", 54)
            .style("opacity", 0.3);

        svg.append("text")
            .attr("id", "bio-label")
            .attr("x", x(0.71))
            .attr("y", y(0.54))
            .selectAll("tspan")
            .data(["Global Sustainable", "Development Quadrant"])
            .enter().append("tspan")
            .attr("x", x(0.71))
            .attr("dy", (d, i) => i * 20)
            .text(d => d);

        // Add dots
        svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", d => `dot ${d.Region.replace(/\s+/g, '')}`)
            .attr("cx", d => x(d.HDI))
            .attr("cy", d => y(d['Number of Earths required']))
            .attr("r", 4)
            .style("fill", d => color(d.Region))
            .on("mouseover", showTooltip)
            .on("mouseout", hideTooltip)
            .on("click", toggleSelection);

        // Add legend
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(50, 30)`);

        color.domain().forEach((region, i) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${i * 28})`);

            legendRow.append("circle")
                .attr("r", 7)
                .attr("fill", color(region));

            legendRow.append("text")
                .attr("x", 15)
                .attr("y", 5)
                .style("font-size", "14px")
                .text(region);

            legendRow.on("mouseover", (event) => highlight(event, region))
                .on("mouseleave", doNotHighlight)
                .on("click", (event) => toggleSelection(event, region))
                .style("cursor", "pointer");
            
            d3.select('svg')
                .append('style')
                .text(` #rect-container {
            fill: #f0f0f1;
        }

        #ref-label {
            fill: rgb(69, 68, 68);
            font-size: 14px;
        }

        #ref-line {
            stroke: rgb(142, 138, 138);
        }

        #sdg-quadrant {
            fill: dimgray;
        }

        #bio-label {
            font-size: 16px;
            fill: rgb(0, 68, 11);
        }

        #sdg-quadrant-text {
            font-size: 16px;
            fill: rgb(0, 68, 11);
        }

        @media (prefers-color-scheme: dark) {
            #sdg-quadrant {
                fill: white;
            }

            #logo {
                filter: invert(100%);
            }

            body {
                background-color: rgb(17 24 39);
                color: rgb(229 231 235);
            }

            #container {
                background-color: rgb(17 24 39);
            }

            #chart-container {
                background-color: rgb(17 24 39);
            }

            #svg-container {
                background-color: rgb(17 24 39);
            }

            #g-container {
                background-color: rgb(17 24 39);
            }

            #rect-container {
                fill: rgb(17 24 39);
            }

            text {
                fill: #fff;
            }

            #ref-label {
                fill: darkgray;
            }

            #ref-line {
                stroke: darkgray;
            }
        }

        #heading {
            font-size: 30px;
            font-family: "Literata", sans-serif;
            margin-bottom: 0px;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        #subheader {
            font-size: 20px;
            font-family: sans-serif;
            margin-bottom: 0px;
            position: absolute;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
        }

        #chart-container {
            display: flex;
            align-items: flex-start;
            margin-top: 10px;
        }

        .tooltip {
            font-size: 12px;
            font-weight: normal;
            position: absolute;
            padding: 10px;
            text-align: left;
            background: rgba(0, 0, 0, 0.805);
            border: 0.5px solid #cccccc71;
            border-radius: 5px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            color: black;
        }

        .tooltip td {
            padding: 1.7px 5px;
        }

        text {
            font-size: 18px;
            font-weight: 400;
            font-family: sans-serif;
        }

        /* New style for Select All option */
        #select-all-container {
            margin-bottom: 10px;
            font-weight: bold;
        }`)
        });
    
    }).catch(error => {
        console.error("Error loading the CSV file:", error);
    });
}