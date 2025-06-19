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
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <Home className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-medium">Mortgage</h3>
        </div>
        <button className="text-gray-400">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="text-gray-500 text-sm mb-1">Total debt</div>
        <div className="text-2xl font-bold">
          {mortgageData.totalDebt.toLocaleString()} {mortgageData.currency}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-gray-500 text-xs">Monthly payment</div>
          <div className="font-medium">
            {mortgageData.monthlyPayment.toFixed(2)} {mortgageData.currency}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Interest rate</div>
          <div className="font-medium">
            {mortgageData.interestRate}%
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Remaining term</div>
          <div className="font-medium">
            {Math.floor(mortgageData.remainingYears)} years {Math.round((mortgageData.remainingYears % 1) * 12)} months
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm">Next payment due</div>
          <div className="text-sm font-medium">July 1, 2025</div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-purple-600 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MortgageInfo;
