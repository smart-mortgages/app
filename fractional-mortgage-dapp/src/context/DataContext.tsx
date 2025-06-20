import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { MortgageData, CustomerData } from '../types/api';

interface DataContextType {
  mortgages: MortgageData[];
  customers: CustomerData[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [mortgages, setMortgages] = useState<MortgageData[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get the API base URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch mortgages data
      const mortgagesResponse = await fetch(`${API_BASE_URL}/mortgages`);
      if (!mortgagesResponse.ok) {
        throw new Error(`Failed to fetch mortgages: ${mortgagesResponse.statusText}`);
      }
      const mortgagesData: MortgageData[] = await mortgagesResponse.json();
      
      // Fetch customers data
      const customersResponse = await fetch(`${API_BASE_URL}/customers`);
      if (!customersResponse.ok) {
        throw new Error(`Failed to fetch customers: ${customersResponse.statusText}`);
      }
      const customersData: CustomerData[] = await customersResponse.json();
      
      // Update state
      setMortgages(mortgagesData);

      for (const customer of customersData) {
        // Ensure mortgages array is initialized
        if (!customer.mortgages) {
          customer.mortgages = [];
        }
        
        const matchingMortgage = mortgagesData.find(
          mortgage => mortgage.personalIdNumber === customer.personalIdNumber
        );
        
        if (matchingMortgage) {
          customer.mortgages.push(matchingMortgage);
        }
      }
      setCustomers(customersData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Function to manually refresh data
  const refreshData = async () => {
    await fetchData();
  };

  const value = {
    mortgages,
    customers,
    loading,
    error,
    refreshData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
