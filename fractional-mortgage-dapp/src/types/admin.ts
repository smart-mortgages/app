import type { ReactNode } from 'react';

export type PropertyType = 'boolean' | 'percentage' | 'enum' | 'range' | 'number';

export interface Property {
  key: string;
  type: PropertyType;
  description: string;
  value: any; // The current value of the property
  // Additional fields based on type
  options?: string[]; // For enum type
  min?: number; // For range and number types
  max?: number; // For range and number types
  step?: number; // For percentage, range, and number types
  isMinConstraint?: boolean; // For number type (true = min, false = max)
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: ReactNode;
  properties?: Property[]; // Properties for this condition
}

export interface Client {
  id: string;
  name: string;
  email: string;
  applied: boolean;
  personalIdNumber?: string;
  loanAgreementNumber?: string;
}

export interface ConditionWithProperties {
  conditionId: string;
  properties: Record<string, any>; // Property key-value pairs
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  clients: Client[];
  potentialClients?: Client[]; // Potential clients from API data
  targetClients: number;
  status: 'active' | 'pending' | 'completed';
  mortgageType: string;
  conditions: string[]; // Array of condition IDs (for backward compatibility)
  conditionsWithProperties?: ConditionWithProperties[]; // New field for conditions with property values
}

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}
