import { LineChart, ArrowUp, ArrowDown } from 'lucide-react';

interface BalanceDataPoint {
  date: string;
  balance: number;
}

const AccountBalanceChart = () => {
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
  
  // Calculate percentage change from previous month
  const currentBalance = balanceValues[balanceValues.length - 1];
  const previousBalance = balanceValues[balanceValues.length - 2];
  const percentageChange = ((currentBalance - previousBalance) / previousBalance) * 100;
  const isIncreasing = percentageChange >= 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-[#e6d2b5]">Account Balance History</h3>
        <div className="flex items-center text-sm text-[#d2b48c]">
          <span className="mr-1">Last 30 days</span>
          <LineChart className="w-4 h-4" />
        </div>
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-2xl font-bold text-[#f5f5f5]">
            €{currentBalance.toFixed(2)}
          </div>
          <div className="flex items-center mt-1">
            <span className={`flex items-center ${isIncreasing ? 'text-green-400' : 'text-red-400'}`}>
              {isIncreasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
            <span className="text-[#a0a0a0] text-xs ml-2">since last week</span>
          </div>
        </div>
      </div>

      {/* Detailed chart visualization */}
      <div className="h-64 w-full relative">
        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line 
              key={i}
              x1="0" 
              y1={i * 10} 
              x2="100" 
              y2={i * 10} 
              stroke="#404040" 
              strokeWidth="0.2" 
              strokeDasharray="1,1"
            />
          ))}
          
          {/* Line chart */}
          <polyline
            points={balanceValues.map((balance, index) => {
              const x = (index / (balanceValues.length - 1)) * 100;
              const y = 40 - ((balance - effectiveMin) / (effectiveMax - effectiveMin)) * 35;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#d2b48c"
            strokeWidth="0.5"
          />
          
          {/* Area under the line */}
          <polygon
            points={`0,40 ${balanceValues.map((balance, index) => {
              const x = (index / (balanceValues.length - 1)) * 100;
              const y = 40 - ((balance - effectiveMin) / (effectiveMax - effectiveMin)) * 35;
              return `${x},${y}`;
            }).join(' ')} 100,40`}
            fill="url(#accountGradient)"
            opacity="0.2"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="accountGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d2b48c" />
              <stop offset="100%" stopColor="#d2b48c" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Date labels */}
        <div className="flex justify-between mt-2 text-xs text-[#a0a0a0]">
          {mockBalanceData.filter((_, i) => i % 2 === 0).map((data) => (
            <div key={data.date}>{data.date}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountBalanceChart;
