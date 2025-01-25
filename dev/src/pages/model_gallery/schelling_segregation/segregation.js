import * as d3 from "d3";


export default function SegregationModel(container, options = {}) {

    const width = 350;
    const height = 350;
    const size = 32;
    const cellSize = width / size;

    let grid = [];
    const red = '#c63121';
    const blue = '#01799e';
    const green = '#97deaa';
    const empty = '#FFFFFF';
    const colors = [red, blue, green];

    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    function initializeGrid() {
        grid = [];
        const vacancyRate = document.getElementById('vacancy').value / 100;
        const agentRate = (1 - vacancyRate) / 3; // Equal distribution for three agent types
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                const rand = Math.random();
                if (rand < vacancyRate) {
                    grid[i][j] = empty;
                } else if (rand < vacancyRate + agentRate) {
                    grid[i][j] = red;
                } else if (rand < vacancyRate + 2 * agentRate) {
                    grid[i][j] = blue;
                } else {
                    grid[i][j] = green;
                }
            }
        }
        drawGrid();
        updateIndices();
    }

    function drawGrid() {
        svg.selectAll("rect")
            .data(grid.flat())
            .join("rect")
            .attr("x", (d, i) => (i % size) * cellSize)
            .attr("y", (d, i) => Math.floor(i / size) * cellSize)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", d => d)
            .attr("stroke", "#FFF") // Add border color
            .attr("stroke-width", 1) // Border thickness
            .attr("class", "cell");
    }

    function countNeighbors(x, y, color) {
        let count = 0;
        let total = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const nx = (x + i + size) % size;
                const ny = (y + j + size) % size;
                if (grid[nx][ny] !== empty) {
                    total++;
                    if (grid[nx][ny] === color) {
                        count++;
                    }
                }
            }
        }
        return total === 0 ? 0 : count / total;
    }

    function moveAgent(x, y) {
        const color = grid[x][y];
        let emptySpaces = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === empty) {
                    emptySpaces.push([i, j]);
                }
            }
        }

        // Shuffle empty spaces
        for (let i = emptySpaces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [emptySpaces[i], emptySpaces[j]] = [emptySpaces[j], emptySpaces[i]];
        }

        const threshold = document.getElementById('threshold').value / 100;
        for (let [i, j] of emptySpaces) {
            const neighborRatio = countNeighbors(i, j, color);
            if (neighborRatio >= threshold) {
                grid[i][j] = color;
                grid[x][y] = empty;
                animateMove(x, y, i, j, color);
                return true;
            }
        }
        return false;
    }


    function animateMove(fromX, fromY, toX, toY, color) {
        const fromCell = svg.select(`rect[x="${fromX * cellSize}"][y="${fromY * cellSize}"]`);
        const toCell = svg.select(`rect[x="${toX * cellSize}"][y="${toY * cellSize}"]`);

        fromCell.transition()
            .duration(100)
            .attr("fill", empty);

        toCell.transition()
            .duration(100)
            .attr("fill", color);
    }


    function getRandomAgents() {
        let agents = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] !== empty) {
                    agents.push([i, j]);
                }
            }
        }
        // Shuffle the agents array
        for (let i = agents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [agents[i], agents[j]] = [agents[j], agents[i]];
        }
        return agents;
    }


    async function runModel() {
        const threshold = document.getElementById('threshold').value / 100;
        let moved = false;
        let maxIterations = size * size; // Set a maximum number of iterations
        let iterations = 0;

        while (iterations < maxIterations) {
            moved = false;
            const agents = getRandomAgents();

            for (let [i, j] of agents) {
                const color = grid[i][j];
                const neighborRatio = countNeighbors(i, j, color);
                if (neighborRatio < threshold) {
                    if (moveAgent(i, j)) {
                        moved = true;
                        await new Promise(resolve => setTimeout(resolve, 10));
                        updateIndices();
                        break;
                    }
                }
            }

            if (!moved) {
                break; // If no agent moved, end the simulation
            }

            iterations++;
        }

        if (iterations === maxIterations) {
            console.log("Max iterations reached. Simulation stopped.");
        }
    }


    function calculateUnhappinessIndex() {
        let unhappyAgents = 0;
        let totalAgents = 0;
        const threshold = document.getElementById('threshold').value / 100;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === empty) continue;
                totalAgents++;
                const color = grid[i][j];
                const neighborRatio = countNeighbors(i, j, color);
                if (neighborRatio < threshold) {
                    unhappyAgents++;
                }
            }
        }

        return (unhappyAgents / totalAgents) * 100;
    }

    function calculateDissimilarityIndex() {
        let totalAgents = {}; // Store total counts for each group
        let dissimilarity = 0;
        let neighborhoods = [];

        // Initialize total counts for each group
        for (let group of colors) {
            totalAgents[group] = 0;
        }

        // First pass: Count the total number of agents for each group and store neighborhood data
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === empty) continue;

                let groupCounts = {}; // Initialize local group counts for this neighborhood

                // Initialize local group counts
                for (let group of colors) {
                    groupCounts[group] = 0;
                }

                // Loop over the 3x3 neighborhood around the current cell
                let localAgentCount = 0;
                for (let ni = Math.max(0, i - 1); ni <= Math.min(size - 1, i + 1); ni++) {
                    for (let nj = Math.max(0, j - 1); nj <= Math.min(size - 1, j + 1); nj++) {
                        if (grid[ni][nj] !== empty) {
                            const neighborColor = grid[ni][nj];
                            groupCounts[neighborColor]++;
                            totalAgents[neighborColor]++;
                            localAgentCount++;
                        }
                    }
                }

                // Only add neighborhoods that have at least one other agent (exclude neighborhoods of only vacant cells)
                if (localAgentCount > 0) {
                    neighborhoods.push({ groupCounts, localAgentCount });
                }
            }
        }

        // Second pass: Calculate dissimilarity and unhappiness based on neighborhood data
        const totalPopulation = Object.values(totalAgents).reduce((a, b) => a + b, 0);

        // Iterate through each neighborhood
        for (let { groupCounts, localAgentCount } of neighborhoods) {
            for (let group of colors) {
                const localProportion = groupCounts[group] / localAgentCount;
                const globalProportion = totalAgents[group] / totalPopulation;

                // Accumulate the dissimilarity value
                dissimilarity += Math.abs(localProportion - globalProportion);
            }
        }

        // Normalize the dissimilarity value by dividing by 2
        return dissimilarity / (2 * neighborhoods.length);
    }

    function calculateUnhappiness(i, j) {
        const agentColor = grid[i][j]; // Get the agent's color (group)
        if (agentColor === empty) return 0; // No unhappiness for vacant cells

        let sameGroupCount = 0;       // Count of neighbors from the same group
        let differentGroupCount = 0;  // Count of neighbors from different groups
        let localAgentCount = 0;      // Total number of non-vacant neighbors

        // Loop over the 3x3 neighborhood around the current cell
        for (let ni = Math.max(0, i - 1); ni <= Math.min(size - 1, i + 1); ni++) {
            for (let nj = Math.max(0, j - 1); nj <= Math.min(size - 1, j + 1); nj++) {
                if (ni === i && nj === j) continue; // Skip the current agent's own cell
                if (grid[ni][nj] !== empty) { // Only consider non-vacant neighbors
                    const neighborColor = grid[ni][nj];
                    localAgentCount++;
                    if (neighborColor === agentColor) {
                        sameGroupCount++; // Increment if the neighbor is from the same group
                    } else {
                        differentGroupCount++; // Increment if the neighbor is from a different group
                    }
                }
            }
        }

        // If there are no local neighbors (all surrounding cells are empty), no unhappiness
        if (localAgentCount === 0) return 0;

        // Calculate the proportion of similar agents in the neighborhood
        const proportionSimilar = sameGroupCount / localAgentCount;

        // Unhappiness is inversely proportional to how many similar agents there are
        const unhappiness = 1 - proportionSimilar; // More different neighbors means more unhappiness

        return unhappiness;
    }

    function makeMoveDecision(i, j, threshold = 0.5) {
        const unhappiness = calculateUnhappiness(i, j);

        // Agent decides to move if unhappiness exceeds the threshold
        return unhappiness > threshold;
    }

    function updateIndices() {
        const unhappinessIndex = calculateUnhappinessIndex();
        const dissimilarityIndex = calculateDissimilarityIndex();
        // const giniIndex = calculateGiniCoefficient();
        document.getElementById('unhappiness-value').textContent = unhappinessIndex.toFixed(1);
        document.getElementById('dissimilarity-value').textContent = dissimilarityIndex.toFixed(2);
        // document.getElementById('gini-value').textContent = giniIndex.toFixed(2);
    }

    // Initialize the grid on page load
    initializeGrid();


    // Expose public methods
    return {
        initializeGrid,
        runModel,
        resetGrid: initializeGrid,
    };


}

