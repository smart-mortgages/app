import React from 'react';

interface MortgagePayment {
  month: string;
  principal: number;
  interest: number;
  total: number;
}

const SimpleMortgageChart: React.FC = () => {
  // Mock mortgage payment data for the last 6 months
  const mortgagePayments: MortgagePayment[] = [
    { month: '01/25', principal: 420.76, interest: 226.56, total: 647.32 },
    { month: '02/25', principal: 422.65, interest: 224.67, total: 647.32 },
    { month: '03/25', principal: 424.55, interest: 222.77, total: 647.32 },
    { month: '04/25', principal: 426.46, interest: 220.86, total: 647.32 },
    { month: '05/25', principal: 428.38, interest: 218.94, total: 647.32 },
    { month: '06/25', principal: 430.31, interest: 217.01, total: 647.32 },
  ];
  
  // Use the total payment amount for scaling the chart
  const maxValue = 647.32; // Total payment amount
  
  return (
    <div className="w-full h-24 relative">
      {/* Current payment indicator */}
      <div className="absolute top-0 right-0 text-xs text-[#e6d2b5] font-medium">
        €{maxValue.toFixed(2)}/mo
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Stacked bar chart */}
        {mortgagePayments.map((payment, index) => {
          const x = (index / (mortgagePayments.length - 1)) * 100;
          const barWidth = 10;
          const xPos = x - barWidth/2;
          
          // Calculate heights based on the viewBox
          const principalHeight = (payment.principal / maxValue) * 35;
          const interestHeight = (payment.interest / maxValue) * 35;
          const interestY = 40 - interestHeight;
          const principalY = interestY - principalHeight;
          
          return (
            <g key={index}>
              {/* Interest portion (top) */}
              <rect 
                x={xPos}
                y={interestY}
                width={barWidth}
                height={interestHeight}
                fill="#a58a68"
                opacity="0.7"
              />
              
              {/* Principal portion (bottom) */}
              <rect 
                x={xPos}
                y={principalY}
                width={barWidth}
                height={principalHeight}
                fill="#d2b48c"
                opacity="0.9"
              />
            </g>
          );
        })}
        
        {/* Trend line showing principal growth */}
        <polyline
          points={mortgagePayments.map((payment, index) => {
            const x = (index / (mortgagePayments.length - 1)) * 100;
            const y = 40 - ((payment.principal / maxValue) * 35);
            return `${x},${y}`;
          }).join(' ')}
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
