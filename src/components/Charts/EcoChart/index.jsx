import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useEcoChart } from './useEcoChart';
import styles from './eco_styles.module.css';

const EcoChart = ({ csvPath }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data loading
  useEffect(() => {
    const path = csvPath?.replace(/<!--.*?-->/g, '').trim() || '/data/footprint_clean_2019.csv';
    
    d3.csv(path, d => ({
      Country: d.Country,
      Region: d.Region,
      SDGi: +d.SDGi,
      HDI: +d.HDI,
      'Life Expectancy': +d['Life Expectancy'],
      'Per Capita GDP in $': +d['Per Capita GDP in $'],
      'Income Group': d['Income Group'],
      'Population (millions)': +d['Population (millions)'],
      'Number of Earths required': +d['Number of Earths required'],
    })).then(setData).catch(err => {
      console.error('Failed to load:', err);
      setError(err.message);
    }).finally(() => setLoading(false));
  }, []);

  // Use custom hook - only after data is loaded
  useEcoChart(chartRef, data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div ref={chartRef} className={styles.chartContainer} />;
};

export default EcoChart;
