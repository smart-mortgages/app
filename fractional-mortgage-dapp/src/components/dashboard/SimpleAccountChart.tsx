import React from 'react';

interface BalanceDataPoint {
  date: string;
  balance: number;
}

const SimpleAccountChart: React.FC = () => {
  // Mock account balance data over time (30 days)
  const mockBalanceData: BalanceDataPoint[] = [
    { date: '05/20', balance: 3245.67 },
    { date: '05/23', balance: 3012.42 },
    { date: '05/26', balance: 2897.15 },
    { date: '05/29', balance: 2756.89 },
    { date: '06/01', balance: 4532.21 }, // Salary deposit
    { date: '06/04', balance: 4328.76 },
    { date: '06/07', balance: 2925.32 },
    { date: '06/10', balance: 3876.54 },
    { date: '06/13', balance: 3254.21 },
    { date: '06/16', balance: 3421.87 },
    { date: '06/19', balance: 3245.67 } // Current date
  ];
  
  // Extract just the balance values for the chart
  const balanceValues = mockBalanceData.map(item => item.balance);
  const minBalance = Math.min(...balanceValues);
  const maxBalance = Math.max(...balanceValues);
  
  // Calculate the range to create a better visual (don't start from zero)
  const range = maxBalance - minBalance;
  const paddingFactor = 0.1; // Add 10% padding to top and bottom
  const effectiveMin = minBalance - (range * paddingFactor);
  const effectiveMax = maxBalance + (range * paddingFactor);
  const effectiveRange = effectiveMax - effectiveMin;
  
  return (
    <div className="w-full h-24 relative">
      {/* Current balance indicator */}
      <div className="absolute top-0 right-0 text-xs text-[#e6d2b5] font-medium">
        €{balanceValues[balanceValues.length - 1].toFixed(2)}
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Line chart */}
        <polyline
          points={balanceValues.map((balance, index) => {
            const x = (index / (balanceValues.length - 1)) * 100;
            const y = 40 - ((balance - effectiveMin) / effectiveRange) * 35;
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#d2b48c"
          strokeWidth="2"
        />
        
        {/* Area under the line */}
        <polygon
          points={`0,40 ${balanceValues.map((balance, index) => {
            const x = (index / (balanceValues.length - 1)) * 100;
            const y = 40 - ((balance - effectiveMin) / effectiveRange) * 35;
            return `${x},${y}`;
          }).join(' ')} 100,40`}
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
