import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MortgageInfo from '../components/dashboard/MortgageInfo';

interface MortgageDetailProps {
  mortgageData?: {
    totalDebt: number;
    currency: string;
    monthlyPayment: number;
    interestRate: number;
    remainingYears: number;
  };
}

const MortgageDetail = ({ mortgageData }: MortgageDetailProps) => {
  const navigate = useNavigate();
  
  // Default mortgage data if none is provided
  const defaultMortgageData = {
    totalDebt: 250000,
    currency: '€',
    monthlyPayment: 876.54,
    interestRate: 2.75,
    remainingYears: 27.5
  };
  
  const data = mortgageData || defaultMortgageData;
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-[#d2b48c] mb-6 hover:text-[#e6d2b5] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="bg-[#262626] rounded-xl shadow-md overflow-hidden border border-[#404040] mb-6">
          <div className="p-6 border-b border-[#404040]">
            <h1 className="text-2xl font-semibold text-[#e6d2b5]">Mortgage Details</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <MortgageInfo mortgageData={data} />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-[#d2b48c] mb-2">Payment Schedule</h2>
                <div className="bg-[#333333] rounded-lg p-4 border border-[#404040]">
                  <div className="flex justify-between items-center mb-4 text-[#e6d2b5] font-medium">
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Principal</span>
                    <span>Interest</span>
                    <span>Remaining</span>
                  </div>
                  <div className="space-y-3 text-[#f5f5f5]">
                    {[1, 2, 3, 4, 5].map((month) => (
                      <div key={month} className="flex justify-between items-center">
                        <span>07/{month}/2025</span>
                        <span>{data.currency}{data.monthlyPayment.toFixed(2)}</span>
                        <span>{data.currency}{(data.monthlyPayment * 0.65).toFixed(2)}</span>
                        <span>{data.currency}{(data.monthlyPayment * 0.35).toFixed(2)}</span>
                        <span>{data.currency}{(data.totalDebt - (month * data.monthlyPayment * 0.65)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-[#d2b48c] mb-2">Mortgage Analysis</h2>
                <p className="text-[#f5f5f5]">
                  Your mortgage has a competitive interest rate of {data.interestRate}%. Based on current market conditions, 
                  you could potentially refinance to get a rate of around 2.5%, which would save you approximately 
                  {data.currency}{((data.monthlyPayment * 12 * data.remainingYears) * 0.05).toFixed(2)} over the life of your loan.
                </p>
              </div>
              
              <div className="bg-[#333333] p-4 rounded-lg border border-[#404040]">
                <h3 className="text-[#e6d2b5] font-medium mb-2">Recommendations</h3>
                <ul className="text-[#f5f5f5] space-y-2 list-disc pl-5">
                  <li>Consider making additional principal payments to reduce your loan term</li>
                  <li>Explore refinancing options to potentially lower your interest rate</li>
                  <li>Set up automatic payments to ensure you never miss a payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageDetail;
