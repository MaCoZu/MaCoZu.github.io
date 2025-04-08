import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useEcoChart } from './useEcoChart2';
import styles from './eco_styles2.css';

const EcoChart2 = ({ csvPath }) => {
    const chartRef = useRef(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [xVariable, setXVariable] = useState('HDI');
    const [yVariable, setYVariable] = useState('Number of Earths required');

    // Use custom hook with additional parameters
    useEcoChart(chartRef, data, xVariable, yVariable);

    // Data loading
    useEffect(() => {
        async function loadData() {
            try {
                const csvData = await d3.csv(csvPath, d => ({
                    Country: d.Country,
                    Region: d.Region,
                    SDGi: +d.SDGi,
                    HDI: +d.HDI,
                    'Life Expectancy': +d['Life Expectancy'],
                    'Per Capita GDP': +d['Per Capita GDP'],
                    'Income Group': d['Income Group'],
                    'Population (millions)': +d['Population (millions)'],
                    'Total biocapacity': +d['Total biocapacity'],
                    'Total Ecological Footprint (Production)': +d['Total Ecological Footprint (Production)'],
                    'Total Ecological Footprint (Consumption)': +d['Total Ecological Footprint (Consumption)'],
                    'Ecological (Deficit) or Reserve': +d['Ecological (Deficit) or Reserve'],
                    'Number of Earths required': +d['Number of Earths required'],
                    'Number of Countries required': +d['Number of Countries required'],
                }));
                setData(csvData);
            } catch (err) {
                console.error("Failed to load CSV:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [csvPath]);

    if (loading) return <div>Loading chart data...</div>;
    if (error) return <div>Error loading chart data: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className={styles.chartWrapper}>
            <div
                ref={chartRef}
                className={styles.chartContainer}
            />
            <div className={styles.controlsContainer}>
                <div className={styles.controlGroup}>
                    <label htmlFor="x-axis">X Axis:</label>
                    <select
                        id="x-axis"
                        value={xVariable}
                        onChange={(e) => setXVariable(e.target.value)}
                        className={styles.selectDropdown}
                    >
                        <option value="SDGi">SDGi</option>
                        <option value="HDI">HDI</option>
                        <option value="Life Expectancy">Life Expectancy</option>
                        <option value="Per Capita GDP">Per Capita GDP</option>
                        <option value="Income Group">Income Group</option>
                    </select>
                </div>

                <div className={styles.controlGroup}>
                    <label htmlFor="y-axis">Y Axis:</label>
                    <select
                        id="y-axis"
                        value={yVariable}
                        onChange={(e) => setYVariable(e.target.value)}
                        className={styles.selectDropdown}
                    >
                        <option value="Total biocapacity">Total biocapacity</option>
                        <option value="Total Ecological Footprint (Production)">Total Ecological Footprint (Production)</option>
                        <option value="Total Ecological Footprint (Consumption)">Total Ecological Footprint (Consumption)</option>
                        <option value="Ecological (Deficit) or Reserve">Ecological (Deficit) or Reserve</option>
                        <option value="Number of Earths required">Number of Earths required</option>
                        <option value="Number of Countries required">Number of Countries required</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EcoChart2;