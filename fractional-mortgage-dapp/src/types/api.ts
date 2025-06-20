// API data types for mortgage and customer data

export interface MortgageData {
  data: {
    loanAgreementNumber: string;
    mortgageIssueDate: string;
    mortgageMaturityDate: string;
    mortgageBalanceEUR: string;
    monthlyMortgagePaymentEUR: string;
    paymentDiscipline: string;
    guarantor: string;
    lastDataUpdateDate: string;
    note: string;
  };
  rules: {
    checkAccount: boolean;
    checkBalance: boolean;
    checkTxCount: boolean;
  };
  personalIdNumber: string;
  interestRate: string;
}

export interface CustomerData {
  data: {
    loanAgreementNumber: string;
    mortgageIssueDate: string;
    mortgageMaturityDate: string;
    mortgageBalanceEUR: string;
    monthlyMortgagePaymentEUR: string;
    paymentDiscipline: string;
    guarantor: string;
    lastDataUpdateDate: string;
    note: string;
  };
  rules: {
    checkAccount: boolean;
    checkBalance: boolean;
    checkTxCount: boolean;
  };
  personalIdNumber: string;
  interestRate: string;
  mortgages: MortgageData[];
}

// Combined data type that pairs mortgage with customer data
export interface MortgageCustomerPair {
  mortgage: MortgageData;
  customer: CustomerData | null;
}
