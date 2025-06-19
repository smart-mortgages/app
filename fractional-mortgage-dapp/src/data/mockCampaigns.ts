import type { Campaign } from '../types/admin';

// Mock campaign data
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Summer Special',
    description: 'Special summer discount for first-time homebuyers with 15% off on interest rates for the first year.',
    discountPercentage: 15,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    clients: [
      { id: 'c1', name: 'John Smith', email: 'john@example.com', applied: true },
      { id: 'c2', name: 'Jane Doe', email: 'jane@example.com', applied: true },
      { id: 'c3', name: 'Robert Johnson', email: 'robert@example.com', applied: false },
      { id: 'c4', name: 'Emily Wilson', email: 'emily@example.com', applied: true },
    ],
    targetClients: 10,
    status: 'active',
    mortgageType: 'Fixed Rate',
    conditions: ['cond-001', 'cond-007', 'cond-012']
  },
  {
    id: 'camp-002',
    name: 'Refinance Boost',
    description: 'Special offer for clients refinancing their mortgage from other banks with 10% discount on closing costs.',
    discountPercentage: 10,
    startDate: '2025-05-15',
    endDate: '2025-09-15',
    clients: [
      { id: 'c5', name: 'Michael Brown', email: 'michael@example.com', applied: true },
      { id: 'c6', name: 'Sarah Davis', email: 'sarah@example.com', applied: false },
    ],
    targetClients: 15,
    status: 'pending',
    mortgageType: 'Variable Rate',
    conditions: ['cond-016', 'cond-004', 'cond-014']
  },
  {
    id: 'camp-003',
    name: 'Veteran Appreciation',
    description: 'Special mortgage rates and 20% discount on processing fees for military veterans.',
    discountPercentage: 20,
    startDate: '2025-05-01',
    endDate: '2025-12-31',
    clients: [
      { id: 'c7', name: 'David Wilson', email: 'david@example.com', applied: true },
      { id: 'c8', name: 'Lisa Johnson', email: 'lisa@example.com', applied: true },
      { id: 'c9', name: 'Thomas Anderson', email: 'thomas@example.com', applied: false },
      { id: 'c10', name: 'Patricia Moore', email: 'patricia@example.com', applied: true },
      { id: 'c11', name: 'Richard Taylor', email: 'richard@example.com', applied: false },
      { id: 'c12', name: 'Jennifer Martin', email: 'jennifer@example.com', applied: true },
    ],
    targetClients: 12,
    status: 'active',
    mortgageType: 'Fixed Rate',
    conditions: ['cond-005', 'cond-008', 'cond-015']
  }
];
