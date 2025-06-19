import { LineChart, ArrowUp, ArrowDown } from 'lucide-react';

const AccountBalanceChart = () => {
  // Mock data for the chart
  const chartData = {
    currentBalance: 86.07,
    previousBalance: 92.45,
    currency: '€',
    percentageChange: -6.9,
    chartPoints: [
      { month: 'Jan', value: 120 },
      { month: 'Feb', value: 110 },
      { month: 'Mar', value: 130 },
      { month: 'Apr', value: 105 },
      { month: 'May', value: 95 },
      { month: 'Jun', value: 86 }
    ]
  };

  // Calculate if the balance has increased or decreased
  const isIncreasing = chartData.percentageChange >= 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Account Balance</h3>
        <button className="text-purple-600 flex items-center text-sm">
          <span className="mr-1">6 months</span>
          <LineChart className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="text-2xl font-bold">
            {chartData.currentBalance.toFixed(2)} {chartData.currency}
          </div>
          <div className="flex items-center">
            <span className={`flex items-center ${isIncreasing ? 'text-green-500' : 'text-red-500'}`}>
              {isIncreasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(chartData.percentageChange).toFixed(1)}%
            </span>
            <span className="text-gray-500 text-xs ml-2">since last month</span>
          </div>
        </div>
      </div>

      {/* Simple chart visualization */}
      <div className="h-24 w-full mt-4 flex items-end">
        {chartData.chartPoints.map((point, index) => (
          <div key={point.month} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-2 rounded-t-sm ${index === chartData.chartPoints.length - 1 ? 'bg-purple-600' : 'bg-gray-300'}`} 
              style={{ height: `${(point.value / 130) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">{point.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountBalanceChart;
