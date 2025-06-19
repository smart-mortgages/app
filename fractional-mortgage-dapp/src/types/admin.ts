import type { ReactNode } from 'react';

export interface Condition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: ReactNode;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  applied: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  clients: Client[];
  targetClients: number;
  status: 'active' | 'pending' | 'completed';
  mortgageType: string;
  conditions: string[]; // Array of condition IDs
}

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}
