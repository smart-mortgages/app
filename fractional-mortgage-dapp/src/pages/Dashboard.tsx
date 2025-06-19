// No React import needed
import { BarChart3, Wallet } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-[#262626] to-[#333333] p-6 rounded-b-3xl shadow-lg border-b border-[#d2b48c]">
        <div className="flex justify-end mb-6">
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-[#d2b48c] text-[#262626] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md">
              <BarChart3 className="w-5 h-5" />
              <span>Stats</span>
            </button>
            <button className="flex items-center space-x-2 bg-[#d2b48c] text-[#262626] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md">
              <Wallet className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          {/* Centered account balance */}
          <div className="text-center">
            <p className="text-sm text-[#f5f5f5] opacity-80 mb-1">Account Balance</p>
            <div className="flex justify-center">
              <span className="text-5xl font-bold text-[#e6d2b5]">{financialData.accounts.currency}{financialData.accounts.balance}</span>
            </div>
          </div>
          
          {/* Financial metrics grid */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-[#262626] rounded-xl shadow-md p-5 border border-[#404040] text-center">
              <h3 className="text-sm font-medium text-[#d2b48c] mb-2">Investments</h3>
              <p className="text-2xl font-semibold text-[#f5f5f5]">
                {financialData.investments.currency}{financialData.investments.totalValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#262626] rounded-xl shadow-md p-5 border border-[#404040] text-center">
              <h3 className="text-sm font-medium text-[#d2b48c] mb-2">Net Worth</h3>
              <p className="text-2xl font-semibold text-[#f5f5f5]">
                {financialData.accounts.currency}{financialData.netWorth.value.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons removed as requested */}
      
      <div className="px-4 mb-6">
        <div className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040]">
          <div className="p-4 border-b border-[#404040]">
            <h3 className="font-medium text-[#e6d2b5] text-center">Account Balance Chart</h3>
          </div>
          <div className="p-4">
            <AccountBalanceChart />
          </div>
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040]">
          <div className="p-4 border-b border-[#404040]">
            <h3 className="font-medium text-[#e6d2b5]">Mortgage Information</h3>
          </div>
          <MortgageInfo mortgageData={financialData.mortgages} />
        </div>
      </div>
      
      {/* Transactions section */}
      <div className="px-4 mb-6">
        <div className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040]">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#e6d2b5]">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-[#404040]">
            {financialData.accounts.transactions.map(transaction => (
              <div key={transaction.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center mr-3 border border-[#404040]">
                    <span className="text-lg">{transaction.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#f5f5f5]">{transaction.name}</p>
                    <p className="text-xs text-[#a0a0a0]">{transaction.time}</p>
                  </div>
                </div>
                <span className={`font-medium ${transaction.amount >= 0 ? 'text-[#d2b48c]' : 'text-[#ff6b6b]'}`}>
                  {transaction.amount >= 0 ? '+' : ''}{transaction.amount} {financialData.accounts.currency}
                </span>
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
    <div className="min-h-screen bg-[#1a1a1a] pb-20">
      {renderMainView()}
    </div>
  );
};

export default Dashboard;
