// No React import needed
import { BarChart3, Wallet, ArrowRight, Plus, Bitcoin } from 'lucide-react';
import AccountBalanceChart from '../components/dashboard/AccountBalanceChart';
import MortgageInfo from '../components/dashboard/MortgageInfo.tsx';

const Dashboard = () => {
  // Mock data for the dashboard
  // No longer using tabs or crypto view
  
  const financialData = {
    accounts: {
      balance: 86.07,
      currency: '€',
      transactions: [
        { id: 1, name: 'FlexiFondy', amount: -0.16, time: 'Yesterday, 11:50', icon: '🇪🇺' },
        { id: 2, name: 'BILLA', amount: -0.84, time: 'Yesterday, 11:50', icon: '🔴' }
      ]
    },
    investments: {
      totalValue: 93694.99,
      currency: '€',
      assets: [
        { name: 'BTC', value: 91490, change: 0.05, currency: '€', icon: '₿' },
        { name: 'ETH', value: 2204.99, change: 0.05, currency: '€', icon: 'Ξ' }
      ],
      transactions: [
        { 
          id: 1, 
          type: 'BTC → EUR', 
          cryptoAmount: -0.0017, 
          fiatAmount: 155.83, 
          date: '27.11.2024', 
          time: '20:45',
          icon: '₿'
        }
      ]
    },
    mortgages: {
      totalDebt: 250000,
      currency: '€',
      monthlyPayment: 876.54,
      interestRate: 2.75,
      remainingYears: 27.5
    },
    netWorth: {
      value: -156305.01, // accounts + investments - mortgages
      currency: '€'
    }
  };

  const renderMainView = () => (
    <>
      <div className="bg-gradient-to-b from-purple-900 to-purple-950 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
            <img src="https://via.placeholder.com/32" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-3">
            <button className="px-3 py-2 rounded-lg bg-white text-purple-900 hover:bg-gray-100 flex items-center shadow-md">
              <BarChart3 className="w-5 h-5 text-purple-900" />
              <span className="ml-2 text-sm font-medium">Stats</span>
            </button>
            <button className="px-3 py-2 rounded-lg bg-white text-purple-900 hover:bg-gray-100 flex items-center shadow-md">
              <Wallet className="w-5 h-5 text-purple-900" />
              <span className="ml-2 text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          {/* Dominant account balance */}
          <div className="mb-4">
            <div className="text-sm text-gray-300 mb-1">Personal · EUR</div>
            <div className="text-4xl font-bold">
              {financialData.accounts.balance.toFixed(2)} {financialData.accounts.currency}
            </div>
          </div>
          
          {/* Investment and Net Worth in a row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-300">Investments</div>
              <div className="text-xl font-semibold">
                {financialData.investments.totalValue.toLocaleString()} {financialData.investments.currency}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-300">Net Worth</div>
              <div className="text-xl font-semibold">
                {financialData.netWorth.value.toLocaleString()} {financialData.netWorth.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Common action buttons */}
      <div className="p-4 flex justify-around mb-4">
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
            <Plus className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs">Add money</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
            <ArrowRight className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs">Transfer</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
            <Bitcoin className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs">Crypto</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
            <Wallet className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-xs">Mortgages</span>
        </button>
      </div>
      
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <AccountBalanceChart />
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <MortgageInfo mortgageData={financialData.mortgages} />
        </div>
      </div>
      
      {/* Transactions section */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Recent Transactions</h3>
          </div>
          <div className="divide-y">
            {financialData.accounts.transactions.map(transaction => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-lg">{transaction.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="text-xs text-gray-500">{transaction.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div>{transaction.amount} €</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full p-3 text-center text-purple-600 font-medium">
            Show all transactions
          </button>
        </div>
      </div>
      
      {/* Bottom navigation bar removed as it was non-functional */}
    </>
  );

  // Crypto view removed as requested

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {renderMainView()}
    </div>
  );
};

export default Dashboard;
