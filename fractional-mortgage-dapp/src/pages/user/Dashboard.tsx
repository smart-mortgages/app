// No React import needed
import { BarChart3, Wallet, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SimpleAccountChart from '../../components/dashboard/SimpleAccountChart';
import SimpleMortgageChart from '../../components/dashboard/SimpleMortgageChart';

const Dashboard = () => {
  const navigate = useNavigate();
  // Mock data for the dashboard
  // No longer using tabs or crypto view
  
  const financialData = {
    accounts: {
      balance: 3245.67,
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
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 bg-[#d2b48c] text-[#f5f5f5] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Admin</span>
            </button>
            <button className="flex items-center space-x-2 bg-[#d2b48c] text-[#f5f5f5] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md">
              <BarChart3 className="w-5 h-5" />
              <span>Stats</span>
            </button>
            <button className="flex items-center space-x-2 bg-[#d2b48c] text-[#f5f5f5] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md">
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
      
      {/* Two tiles per row layout */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Balance Chart Tile - Clickable */}
          <div 
            className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040] cursor-pointer hover:border-[#d2b48c] transition-colors group"
            onClick={() => navigate('/account-balance')}
          >
            <div className="p-4 border-b border-[#404040] flex justify-between items-center">
              <h3 className="font-medium text-[#e6d2b5]">Account Balance</h3>
              <ArrowRight className="w-5 h-5 text-[#d2b48c] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <SimpleAccountChart />
            </div>
          </div>
          
          {/* Mortgage Information Tile - Clickable */}
          <div 
            className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040] cursor-pointer hover:border-[#d2b48c] transition-colors group"
            onClick={() => navigate('/mortgage')}
          >
            <div className="p-4 border-b border-[#404040] flex justify-between items-center">
              <h3 className="font-medium text-[#e6d2b5]">Mortgage</h3>
              <ArrowRight className="w-5 h-5 text-[#d2b48c] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <SimpleMortgageChart />
            </div>
          </div>
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
          <button className="w-full p-3 text-center text-[#e6d2b5] font-medium">
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
