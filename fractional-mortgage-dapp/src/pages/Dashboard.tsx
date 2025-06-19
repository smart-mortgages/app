import { useState } from 'react';
import { BarChart3, Wallet, ArrowRight, ArrowLeft, Plus, Bitcoin } from 'lucide-react';
import AccountBalanceChart from '../components/dashboard/AccountBalanceChart';
import MortgageInfo from '../components/dashboard/MortgageInfo.tsx';

const Dashboard = () => {
  // Mock data for the dashboard
  // No longer using tabs since we're displaying all financial info at once
  const [currentView, setCurrentView] = useState<'main' | 'crypto'>('main');
  
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
          <div className="flex space-x-2">
            <button className="p-2 rounded-full">
              <BarChart3 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full">
              <Wallet className="w-5 h-5" />
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
        <button className="flex flex-col items-center" onClick={() => setCurrentView('crypto')}>
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

  const renderCryptoView = () => (
    <>
      <div className="bg-black text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setCurrentView('main')} className="flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full">
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-300 mb-1">Crypto Balance</div>
          <div className="text-4xl font-bold mb-2">0 €</div>
        </div>
        
        <div className="flex justify-around">
          <button className="flex-1 py-2 text-center rounded-lg">
            Trading
          </button>
          <button className="flex-1 py-2 text-center rounded-lg">
            Receive
          </button>
          <button className="flex-1 py-2 text-center rounded-lg">
            Send
          </button>
          <button className="flex-1 py-2 text-center rounded-lg">
            More
          </button>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-4">
        {financialData.investments.assets.map(asset => (
          <div key={asset.name} className="bg-black rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">{asset.icon}</span>
                <span>{asset.name}</span>
              </div>
              <span className={`text-xs ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {asset.change > 0 ? '+' : ''}{asset.change}%
              </span>
            </div>
            <div className="text-xl font-bold">{asset.value.toLocaleString()} {asset.currency}</div>
            <div className="h-10 mt-2">
              <div className="w-full h-full bg-green-900 rounded-md overflow-hidden">
                <div className="h-full w-3/4 bg-green-500" style={{ clipPath: 'polygon(0 50%, 10% 40%, 20% 60%, 30% 30%, 40% 70%, 50% 40%, 60% 50%, 70% 30%, 80% 60%, 90% 20%, 100% 40%, 100% 100%, 0 100%)' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 mb-6">
        <div className="bg-black text-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-medium">Transactions</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {financialData.investments.transactions.map(transaction => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <span className="text-lg">{transaction.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-xs text-gray-500">{transaction.date}, {transaction.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div>{transaction.cryptoAmount} BTC</div>
                  <div className="text-green-500">+{transaction.fiatAmount} €</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom navigation bar removed as it was non-functional */}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {currentView === 'main' ? renderMainView() : renderCryptoView()}
    </div>
  );
};

export default Dashboard;
