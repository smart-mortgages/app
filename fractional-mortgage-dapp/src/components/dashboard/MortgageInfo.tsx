import { Home, ChevronRight } from 'lucide-react';

interface MortgageData {
  totalDebt: number;
  currency: string;
  monthlyPayment: number;
  interestRate: number;
  remainingYears: number;
}

interface MortgageInfoProps {
  mortgageData: MortgageData;
}

const MortgageInfo = ({ mortgageData }: MortgageInfoProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#d2b48c20] flex items-center justify-center mr-3">
            <Home className="w-5 h-5 text-[#d2b48c]" />
          </div>
          <h3 className="font-medium text-[#e6d2b5]">Mortgage</h3>
        </div>
        <button className="text-[#a0a0a0]">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="text-[#a0a0a0] text-sm mb-1">Total debt</div>
        <div className="text-2xl font-bold text-[#f5f5f5]">
          {mortgageData.totalDebt.toLocaleString()} {mortgageData.currency}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-[#a0a0a0] text-xs">Monthly payment</div>
          <div className="font-medium text-[#f5f5f5]">
            {mortgageData.monthlyPayment.toFixed(2)} {mortgageData.currency}
          </div>
        </div>
        <div>
          <div className="text-[#a0a0a0] text-xs">Interest rate</div>
          <div className="font-medium text-[#f5f5f5]">
            {mortgageData.interestRate}%
          </div>
        </div>
        <div>
          <div className="text-[#a0a0a0] text-xs">Remaining term</div>
          <div className="font-medium text-[#f5f5f5]">
            {Math.floor(mortgageData.remainingYears)} years {Math.round((mortgageData.remainingYears % 1) * 12)} months
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#404040]">
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#a0a0a0]">Next payment due</div>
          <div className="text-sm font-medium text-[#e6d2b5]">July 1, 2025</div>
        </div>
        <div className="w-full h-2 bg-[#333333] rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-[#d2b48c] rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MortgageInfo;
