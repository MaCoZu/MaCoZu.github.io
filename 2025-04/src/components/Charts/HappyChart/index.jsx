import * as d3 from 'd3';
import { useHappyChart } from './useHappyChart';
import { useEffect, useRef, useState } from 'react';
import './happy.css';

const HappyChart = ({ csvPath }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateChart, setUpdateChart] = useState(() => () => {});
  const [selectedYear, setSelectedYear] = useState(null);

  useHappyChart(chartRef, data, setUpdateChart); // pass updateChart setter

  useEffect(() => {
    async function loadData() {
      try {
        const csvData = await d3.csv(csvPath, d => {
          return {
            Country: d.Country,
            Year: +d.Year,
            SDGi: +d.SDGi,
            HALE: +d.HALE,
            'CO₂ pc': +d['CO₂ pc'],
            'Happy Score': +d['Happy Score'],
            'GNI pc PPP$': +d['GNI pc PPP$'],
          };
        });
        setData(csvData);
      } catch (err) {
        console.error('Failed to load CSV:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [csvPath]);

  useEffect(() => {
    if (data && updateChart) {
      updateChart(2019);
    }
  }, [data, updateChart]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  const years = [...new Set(data.map(d => d.Year))].sort((a, b) => a - b);

  const handleClick = year => {
    setSelectedYear(year);
    updateChart(year);
  };

  return (
    <div className="flex gap-8">
      <div ref={chartRef} className="flex-1" />
      <div className="mt-10 flex flex-col gap-2">
        {years.map(year => (
          <button
            key={year}
            onClick={() => handleClick(year)}
            className={`year-button ${selectedYear === year ? 'active' : ''}`}
            disabled={!updateChart}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HappyChart;
