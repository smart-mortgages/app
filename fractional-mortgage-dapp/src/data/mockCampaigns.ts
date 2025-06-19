import type { Campaign, ConditionWithProperties } from '../types/admin';

// Helper function to create typed condition properties (helps TypeScript recognize the type usage)
const createConditionWithProperties = (conditionId: string, properties: Record<string, any>): ConditionWithProperties => ({
  conditionId,
  properties
});

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
    conditions: ['cond-001', 'cond-007', 'cond-012'],
    conditionsWithProperties: [
      createConditionWithProperties('cond-001', {
        minAmount: 3000,
        frequency: 'monthly',
        consecutiveMonths: 6
      }),
      createConditionWithProperties('cond-007', {
        maxLtvRatio: 75,
        applyToFirstTimeBuyers: true,
        applyToRefinance: false
      }),
      createConditionWithProperties('cond-012', {
        minEnergyClass: 'B',
        requiresCertificate: true,
        bonusDiscountPercentage: 2
      })
    ]
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
    conditions: ['cond-016', 'cond-004', 'cond-014'],
    conditionsWithProperties: [
      createConditionWithProperties('cond-016', {
        previousLoanAge: 24,
        minRefinanceAmount: 100000,
        requiresDocumentation: true
      }),
      createConditionWithProperties('cond-004', {
        minLoyaltyMonths: 12,
        primaryAccount: true,
        minimumBalance: 5000
      }),
      createConditionWithProperties('cond-014', {
        minMonthsWithoutDelinquency: 24,
        allowedLatePayments: 0,
        checkCreditHistory: true
      })
    ]
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
    conditions: ['cond-005', 'cond-008', 'cond-015'],
    conditionsWithProperties: [
      createConditionWithProperties('cond-005', {
        hasInsurance: true,
        coveragePercentage: 80,
        minCoveragePeriod: 5
      }),
      createConditionWithProperties('cond-008', {
        maxDstiRatio: 40,
        includeOtherDebts: true,
        stressTestPercentage: 2
      }),
      createConditionWithProperties('cond-015', {
        repaymentHistoryMonths: 24,
        allowedLatePayments: 1,
        requiresProof: true
      })
    ]
  }
];
