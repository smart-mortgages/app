import React from 'react';

interface MortgageData {
  month: string;
  mortgageBalance: number;
  housePrice: number;
}

const SimpleMortgageChart: React.FC = () => {
  // Initial mortgage amount
  const initialMortgage = 250000;
  
  // Mock mortgage data for the last 6 months
  // Showing decreasing mortgage balance and fluctuating house prices
  const mortgageData: MortgageData[] = [
    { month: '01/25', mortgageBalance: 230000, housePrice: 275000 },
    { month: '02/25', mortgageBalance: 229500, housePrice: 276200 },
    { month: '03/25', mortgageBalance: 229000, housePrice: 278500 },
    { month: '04/25', mortgageBalance: 228500, housePrice: 279800 },
    { month: '05/25', mortgageBalance: 228000, housePrice: 285500 },
    { month: '06/25', mortgageBalance: 227500, housePrice: 289000 },
  ];
  
  // Calculate the equity difference (house price - mortgage balance)
  const equityDifferences = mortgageData.map(data => ({
    month: data.month,
    difference: data.housePrice - data.mortgageBalance
  }));
  
  // Find the maximum values for scaling
  const maxMortgage = Math.max(...mortgageData.map(d => d.mortgageBalance));
  const maxHousePrice = Math.max(...mortgageData.map(d => d.housePrice));
  const maxValue = Math.max(maxMortgage, maxHousePrice);
  
  // Calculate the current equity difference (latest data point)
  const currentEquity = equityDifferences[equityDifferences.length - 1].difference;
  const currentEquityPercentage = (currentEquity / mortgageData[mortgageData.length - 1].housePrice) * 100;
  
  return (
    <div className="w-full h-24 relative">
      {/* Current equity indicator */}
      <div className="absolute top-0 right-0 text-xs text-[#e6d2b5] font-medium">
        Equity: €{currentEquity.toLocaleString()} ({currentEquityPercentage.toFixed(1)}%)
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Area chart showing the difference */}
        <polygon
          points={`
            ${mortgageData.map((data, index) => {
              const x = (index / (mortgageData.length - 1)) * 100;
              // Scale mortgage balance to viewBox - moved lower by adjusting the multiplier from 35 to 30
              const y = 40 - ((data.mortgageBalance / maxValue) * 30);
              return `${x},${y}`;
            }).join(' ')}
            ${mortgageData.slice().reverse().map((data, index) => {
              const reverseIndex = mortgageData.length - 1 - index;
              const x = (reverseIndex / (mortgageData.length - 1)) * 100;
              // Scale house price to viewBox - moved lower by adjusting the multiplier from 35 to 30
              const y = 40 - ((data.housePrice / maxValue) * 30);
              return `${x},${y}`;
            }).join(' ')}
          `}
          fill="url(#equityGradient)"
          opacity="0.7"
        />
        
        {/* House price trend line - more distinct color */}
        <polyline
          points={mortgageData.map((data, index) => {
            const x = (index / (mortgageData.length - 1)) * 100;
            const y = 40 - ((data.housePrice / maxValue) * 30);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#bf8c4c"
          strokeWidth="1.5"
        />
        
        {/* Mortgage balance trend line - more distinct color */}
        <polyline
          points={mortgageData.map((data, index) => {
            const x = (index / (mortgageData.length - 1)) * 100;
            const y = 40 - ((data.mortgageBalance / maxValue) * 30);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#2e7d32"
          strokeWidth="1.5"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4caf50" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4caf50" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Legend - positioned at the bottom with increased padding */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <div className="w-3 h-1 bg-[#2e7d32] mr-1"></div>
          <span className="text-[#a0a0a0]">Mortgage</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-[#bf8c4c] mr-1"></div>
          <span className="text-[#a0a0a0]">House Price</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleMortgageChart;
