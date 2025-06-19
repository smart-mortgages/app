import React from 'react';

const SimpleAccountChart: React.FC = () => {
  // Sample data points for a simple chart
  const dataPoints = [5, 8, 12, 10, 15, 18, 14, 20, 17, 22];
  const maxValue = Math.max(...dataPoints);
  
  return (
    <div className="w-full h-24">
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Line chart */}
        <polyline
          points={dataPoints.map((point, index) => 
            `${index * 10},${40 - (point / maxValue) * 35}`
          ).join(' ')}
          fill="none"
          stroke="#d2b48c"
          strokeWidth="2"
        />
        
        {/* Area under the line */}
        <polygon
          points={`0,40 ${dataPoints.map((point, index) => 
            `${index * 10},${40 - (point / maxValue) * 35}`
          ).join(' ')} 90,40`}
          fill="url(#accountGradient)"
          opacity="0.3"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="accountGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d2b48c" />
            <stop offset="100%" stopColor="#d2b48c" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SimpleAccountChart;
