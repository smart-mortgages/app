import { CreditCard, Clock, Shield, Home as HomeIcon, Users, Building, Leaf, AlertTriangle, Repeat } from 'lucide-react';
import React from 'react';
import type { Condition } from '../types/admin';

// Mock condition data organized by categories
export const mockConditions: { [category: string]: Condition[] } = {
  "Account Activity": [
    {
      id: "cond-001",
      name: "Regular Income",
      description: "Regular income deposits to the account (minimum amount and frequency)",
      category: "Account Activity",
      icon: React.createElement(CreditCard, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minAmount",
          type: "number",
          description: "Minimum monthly income amount",
          value: 2500,
          isMinConstraint: true,
          step: 100
        },
        {
          key: "frequency",
          type: "enum",
          description: "Required deposit frequency",
          value: "monthly",
          options: ["weekly", "biweekly", "monthly"]
        },
        {
          key: "consecutiveMonths",
          type: "number",
          description: "Number of consecutive months required",
          value: 3,
          min: 1,
          max: 24,
          isMinConstraint: true
        }
      ]
    },
    {
      id: "cond-002",
      name: "Transaction Volume",
      description: "Minimum number of transactions per month (card payments, transfers)",
      category: "Account Activity",
      icon: React.createElement(CreditCard, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minTransactions",
          type: "number",
          description: "Minimum number of transactions per month",
          value: 10,
          min: 1,
          max: 100,
          isMinConstraint: true
        },
        {
          key: "includeCardPayments",
          type: "boolean",
          description: "Include card payments in transaction count",
          value: true
        },
        {
          key: "includeTransfers",
          type: "boolean",
          description: "Include transfers in transaction count",
          value: true
        },
        {
          key: "minAmount",
          type: "number",
          description: "Minimum amount per transaction",
          value: 50,
          isMinConstraint: true,
          step: 10
        }
      ]
    },
    {
      id: "cond-003",
      name: "Account Loyalty",
      description: "Length of account holding at the bank (minimum years)",
      category: "Account Activity",
      icon: React.createElement(Clock, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minYears",
          type: "number",
          description: "Minimum years as account holder",
          value: 2,
          min: 1,
          max: 20,
          isMinConstraint: true
        },
        {
          key: "activeAccount",
          type: "boolean",
          description: "Account must be active (regular transactions)",
          value: true
        },
        {
          key: "loyaltyTier",
          type: "enum",
          description: "Required loyalty tier",
          value: "standard",
          options: ["standard", "silver", "gold", "platinum"]
        }
      ]
    },
  ],
  "Insurance": [
    {
      id: "cond-004",
      name: "Loan Repayment Insurance",
      description: "Client has active loan repayment insurance",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      properties: [
        {
          key: "hasInsurance",
          type: "boolean",
          description: "Client has active loan repayment insurance",
          value: true
        },
        {
          key: "coveragePercentage",
          type: "percentage",
          description: "Minimum coverage percentage of loan amount",
          value: 100,
          min: 50,
          max: 100,
          step: 5
        },
        {
          key: "minCoveragePeriod",
          type: "number",
          description: "Minimum coverage period in months",
          value: 12,
          min: 6,
          max: 60,
          isMinConstraint: true
        }
      ]
    },
    {
      id: "cond-005",
      name: "Life Insurance",
      description: "Client has active life insurance policy",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      properties: [
        {
          key: "hasInsurance",
          type: "boolean",
          description: "Client has active life insurance policy",
          value: true
        },
        {
          key: "coverageAmount",
          type: "number",
          description: "Minimum coverage amount",
          value: 100000,
          min: 50000,
          max: 1000000,
          step: 10000,
          isMinConstraint: true
        },
        {
          key: "coverageType",
          type: "enum",
          description: "Type of life insurance coverage",
          value: "term",
          options: ["term", "whole", "universal", "any"]
        }
      ]
    },
    {
      id: "cond-006",
      name: "Household Insurance",
      description: "Client has active household insurance policy",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" }),
      properties: [
        {
          key: "hasInsurance",
          type: "boolean",
          description: "Client has active household insurance policy",
          value: true
        },
        {
          key: "coveragePercentage",
          type: "percentage",
          description: "Minimum coverage percentage of property value",
          value: 80,
          min: 50,
          max: 100,
          step: 5
        },
        {
          key: "includesLiability",
          type: "boolean",
          description: "Policy includes liability coverage",
          value: true
        },
        {
          key: "coverageTypes",
          type: "enum",
          description: "Required coverage types",
          value: "standard",
          options: ["standard", "premium", "comprehensive"]
        }
      ]
    },
  ],
  "Mortgage Parameters": [
    {
      id: "cond-007",
      name: "LTV Ratio",
      description: "Loan-to-Value ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" }),
      properties: [
        {
          key: "maxLtvRatio",
          type: "percentage",
          description: "Maximum Loan-to-Value ratio allowed",
          value: 80,
          min: 50,
          max: 95,
          step: 5,
          isMinConstraint: false
        },
        {
          key: "applyToFirstTimeBuyers",
          type: "boolean",
          description: "Apply this condition to first-time buyers",
          value: true
        },
        {
          key: "applyToRefinance",
          type: "boolean",
          description: "Apply this condition to refinance mortgages",
          value: true
        }
      ]
    },
    {
      id: "cond-008",
      name: "DSTI Ratio",
      description: "Debt Service-to-Income ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" }),
      properties: [
        {
          key: "maxDstiRatio",
          type: "percentage",
          description: "Maximum Debt Service-to-Income ratio allowed",
          value: 40,
          min: 20,
          max: 60,
          step: 5,
          isMinConstraint: false
        },
        {
          key: "includeOtherLoans",
          type: "boolean",
          description: "Include other loans in DSTI calculation",
          value: true
        },
        {
          key: "stressTestRate",
          type: "number",
          description: "Interest rate for stress testing DSTI",
          value: 6,
          min: 3,
          max: 10,
          step: 0.5
        }
      ]
    },
    {
      id: "cond-009",
      name: "Purpose-Specific Loan",
      description: "Mortgage is purpose-specific rather than non-purpose-specific",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" }),
      properties: [
        {
          key: "purposeType",
          type: "enum",
          description: "Specific purpose of the mortgage",
          value: "primary_residence",
          options: ["primary_residence", "secondary_residence", "investment", "renovation"]
        },
        {
          key: "requireDocumentation",
          type: "boolean",
          description: "Require documentation proving purpose",
          value: true
        },
        {
          key: "maxLoanAmount",
          type: "number",
          description: "Maximum loan amount for this purpose",
          value: 500000,
          min: 100000,
          max: 2000000,
          step: 50000,
          isMinConstraint: false
        }
      ]
    },
    {
      id: "cond-010",
      name: "Multiple Applicants",
      description: "Mortgage has multiple applicants (e.g., married couple)",
      category: "Mortgage Parameters",
      icon: React.createElement(Users, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minApplicants",
          type: "number",
          description: "Minimum number of applicants",
          value: 2,
          min: 2,
          max: 4,
          isMinConstraint: true
        },
        {
          key: "relationshipType",
          type: "enum",
          description: "Required relationship between applicants",
          value: "any",
          options: ["married", "family", "any"]
        },
        {
          key: "allMustQualify",
          type: "boolean",
          description: "All applicants must meet credit requirements",
          value: true
        }
      ]
    },
  ],
  "Property & Collateral": [
    {
      id: "cond-011",
      name: "Property Type",
      description: "Specific property type (apartment, house, land)",
      category: "Property & Collateral",
      icon: React.createElement(Building, { className: "w-4 h-4" }),
      properties: [
        {
          key: "allowedTypes",
          type: "enum",
          description: "Allowed property types",
          value: "any",
          options: ["apartment", "house", "land", "commercial", "any"]
        },
        {
          key: "minSize",
          type: "number",
          description: "Minimum property size in square meters",
          value: 40,
          min: 20,
          max: 1000,
          step: 10,
          isMinConstraint: true
        },
        {
          key: "newConstruction",
          type: "boolean",
          description: "Property must be new construction",
          value: false
        }
      ]
    },
    {
      id: "cond-012",
      name: "Energy Performance",
      description: "Property has high energy performance rating (class A/B)",
      category: "Property & Collateral",
      icon: React.createElement(Leaf, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minEnergyClass",
          type: "enum",
          description: "Minimum energy performance class required",
          value: "B",
          options: ["A+", "A", "B", "C", "D"]
        },
        {
          key: "requiresCertificate",
          type: "boolean",
          description: "Requires official energy performance certificate",
          value: true
        },
        {
          key: "bonusDiscountPercentage",
          type: "percentage",
          description: "Additional discount for A+ or A rated properties",
          value: 5,
          min: 0,
          max: 10,
          step: 1
        }
      ]
    },
    {
      id: "cond-013",
      name: "Collateral Value",
      description: "Property has sufficient collateral value",
      category: "Property & Collateral",
      icon: React.createElement(Building, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minCollateralValue",
          type: "number",
          description: "Minimum collateral value required",
          value: 100000,
          min: 50000,
          max: 2000000,
          step: 50000,
          isMinConstraint: true
        },
        {
          key: "collateralToLoanRatio",
          type: "percentage",
          description: "Minimum ratio of collateral to loan amount",
          value: 120,
          min: 100,
          max: 200,
          step: 5
        },
        {
          key: "requiresAppraisal",
          type: "boolean",
          description: "Requires professional appraisal of collateral",
          value: true
        },
        {
          key: "acceptsAdditionalCollateral",
          type: "boolean",
          description: "Accepts additional assets as collateral",
          value: false
        }
      ]
    },
  ],
  "Payment History": [
    {
      id: "cond-014",
      name: "Repayment History",
      description: "Client has good repayment history",
      category: "Payment History",
      icon: React.createElement(Clock, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minMonthsHistory",
          type: "number",
          description: "Minimum months of repayment history required",
          value: 12,
          min: 6,
          max: 60,
          isMinConstraint: true
        },
        {
          key: "maxLatePayments",
          type: "number",
          description: "Maximum number of late payments allowed",
          value: 2,
          min: 0,
          max: 10,
          isMinConstraint: false
        },
        {
          key: "considerExternalLoans",
          type: "boolean",
          description: "Consider repayment history from other lenders",
          value: true
        },
        {
          key: "maxDaysLate",
          type: "number",
          description: "Maximum days late for any payment",
          value: 15,
          min: 0,
          max: 90,
          isMinConstraint: false
        }
      ]
    },
    {
      id: "cond-015",
      name: "No Delinquencies",
      description: "Client has no payment delinquencies in the past",
      category: "Payment History",
      icon: React.createElement(AlertTriangle, { className: "w-4 h-4" }),
      properties: [
        {
          key: "lookbackPeriod",
          type: "number",
          description: "Period to look back for delinquencies (months)",
          value: 24,
          min: 12,
          max: 84,
          step: 12
        },
        {
          key: "allowMinorDelinquencies",
          type: "boolean",
          description: "Allow minor delinquencies (less than 30 days)",
          value: false
        },
        {
          key: "includeUtilityBills",
          type: "boolean",
          description: "Include utility bill payment history",
          value: true
        },
        {
          key: "creditScoreThreshold",
          type: "number",
          description: "Minimum credit score required",
          value: 700,
          min: 500,
          max: 850,
          isMinConstraint: true
        }
      ]
    },
  ],
  "Special Conditions": [
    {
      id: "cond-016",
      name: "Refinancing",
      description: "Mortgage refinancing from another bank",
      category: "Special Conditions",
      icon: React.createElement(Repeat, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minExistingLoanAge",
          type: "number",
          description: "Minimum age of existing loan (months)",
          value: 12,
          min: 6,
          max: 60,
          isMinConstraint: true
        },
        {
          key: "minRateImprovement",
          type: "percentage",
          description: "Minimum interest rate improvement required",
          value: 0.5,
          min: 0.1,
          max: 2.0,
          step: 0.1
        },
        {
          key: "noEarlyRepaymentFee",
          type: "boolean",
          description: "No early repayment fee on existing loan",
          value: false
        },
        {
          key: "loanAmountRange",
          type: "range",
          description: "Acceptable loan amount range",
          value: [50000, 1000000],
          min: 10000,
          max: 2000000,
          step: 10000
        }
      ]
    },
    {
      id: "cond-017",
      name: "Green Mortgage",
      description: "Mortgage for eco-friendly housing",
      category: "Special Conditions",
      icon: React.createElement(Leaf, { className: "w-4 h-4" }),
      properties: [
        {
          key: "minEnergyRating",
          type: "enum",
          description: "Minimum energy efficiency rating",
          value: "A",
          options: ["A+", "A", "B"]
        },
        {
          key: "hasRenewableEnergy",
          type: "boolean",
          description: "Property has renewable energy source",
          value: true
        },
        {
          key: "sustainableMaterials",
          type: "boolean",
          description: "Built with sustainable materials",
          value: false
        },
        {
          key: "greenCertification",
          type: "enum",
          description: "Type of green certification",
          value: "any",
          options: ["LEED", "BREEAM", "Passive House", "any"]
        },
        {
          key: "additionalDiscountPercentage",
          type: "percentage",
          description: "Additional discount for green properties",
          value: 5,
          min: 0,
          max: 10,
          step: 1
        }
      ]
    },
  ],
};
