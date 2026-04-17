import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import './happy.css';
import { useHappyChart } from './useHappyChart';

const HappyChart = ({ csvPath }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const path = csvPath?.replace(/<!--.*?-->/g, '').trim() || '/data/happy_sdg_hdi_co2_clean.csv';
    
    d3.csv(path, d => ({
      Country: d.Country,
      Year: +d.Year,
      SDGi: +d.SDGi,
      HDI: +d.HDI,
      'CO₂ pc': +d['CO₂ pc'],
      'Happy Score': +d['Happy Score'],
    })).then(setData).catch(err => {
      console.error('Failed to load:', err);
      setError(err.message);
    }).finally(() => setLoading(false));
  }, [csvPath]);

  useHappyChart(chartRef, data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div ref={chartRef} />;
};

export default HappyChart;
