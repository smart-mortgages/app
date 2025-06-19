import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountBalanceChart from '../components/dashboard/AccountBalanceChart';

const AccountBalanceDetail = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-20">
      <div className="px-4 max-w-lg mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-[#d2b48c] mb-6 hover:text-[#e6d2b5] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040] mb-6">
          <div className="p-6 border-b border-[#404040]">
            <h1 className="text-2xl font-semibold text-[#e6d2b5]">Account Balance Details</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <AccountBalanceChart />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-[#d2b48c] mb-2">Balance History</h2>
                <p className="text-[#f5f5f5]">
                  Detailed view of your account balance changes over time. This chart shows your daily balance fluctuations, 
                  helping you track spending patterns and income deposits.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-[#d2b48c] mb-2">Analysis</h2>
                <p className="text-[#f5f5f5]">
                  Your account has maintained a healthy average balance this month. There was a notable increase on the 15th 
                  due to your salary deposit, and several smaller withdrawals throughout the month for regular expenses.
                </p>
              </div>
              
              <div className="bg-[#333333] p-4 rounded-lg border border-[#404040]">
                <h3 className="text-[#e6d2b5] font-medium mb-2">Recommendations</h3>
                <ul className="text-[#f5f5f5] space-y-2 list-disc pl-5">
                  <li>Consider setting up automatic transfers to your savings account</li>
                  <li>Review your recurring subscriptions to identify potential savings</li>
                  <li>Your spending pattern suggests you could increase your investment contributions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalanceDetail;
