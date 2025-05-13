import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useEcoChart } from './useEcoChart';
import styles from './eco_styles.module.css';

const EcoChart = ({ csvPath }) => {
    const chartRef = useRef(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use custom hook
    useEcoChart(chartRef, data);

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
                    'Per Capita GDP in $': +d['Per Capita GDP in $'],
                    'Income Group': d['Income Group'],
                    'Population (millions)': +d['Population (millions)'],
                    'Number of Earths required': +d['Number of Earths required']
                }));
                // Country, Region, Population(millions), Income Group, HDI, Life Exectancy, Per Capita GDP in $, SDGi, Number of Earths required, Data Quality
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
        <div
            ref={chartRef}
            className={styles.chartContainer}
        />
    );
};

export default EcoChart;