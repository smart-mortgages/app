import React from 'react';

const SimpleMortgageChart: React.FC = () => {
  // Sample data points for a simple mortgage chart (decreasing over time)
  const dataPoints = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21];
  const maxValue = 30; // Fixed max for better visualization
  
  return (
    <div className="w-full h-24">
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Bar chart for mortgage */}
        {dataPoints.map((point, index) => (
          <rect
            key={index}
            x={index * 10}
            y={40 - (point / maxValue) * 35}
            width="6"
            height={(point / maxValue) * 35}
            fill="#d2b48c"
            opacity="0.8"
          />
        ))}
        
        {/* Dotted line showing trend */}
        <polyline
          points={dataPoints.map((point, index) => 
            `${index * 10 + 3},${40 - (point / maxValue) * 35}`
          ).join(' ')}
          fill="none"
          stroke="#e6d2b5"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      </svg>
    </div>
  );
};

export default SimpleMortgageChart;
