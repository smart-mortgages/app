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
      icon: React.createElement(CreditCard, { className: "w-4 h-4" })
    },
    {
      id: "cond-002",
      name: "Transaction Volume",
      description: "Minimum number of transactions per month (card payments, transfers)",
      category: "Account Activity",
      icon: React.createElement(CreditCard, { className: "w-4 h-4" })
    },
    {
      id: "cond-003",
      name: "Account Loyalty",
      description: "Length of account holding at the bank (minimum years)",
      category: "Account Activity",
      icon: React.createElement(Clock, { className: "w-4 h-4" })
    },
  ],
  "Insurance": [
    {
      id: "cond-004",
      name: "Loan Repayment Insurance",
      description: "Client has active loan repayment insurance",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" })
    },
    {
      id: "cond-005",
      name: "Life Insurance",
      description: "Client has active life insurance policy",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" })
    },
    {
      id: "cond-006",
      name: "Household Insurance",
      description: "Client has active household insurance policy",
      category: "Insurance",
      icon: React.createElement(Shield, { className: "w-4 h-4" })
    },
  ],
  "Mortgage Parameters": [
    {
      id: "cond-007",
      name: "LTV Ratio",
      description: "Loan-to-Value ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" })
    },
    {
      id: "cond-008",
      name: "DSTI Ratio",
      description: "Debt Service-to-Income ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" })
    },
    {
      id: "cond-009",
      name: "Purpose-Specific Loan",
      description: "Mortgage is purpose-specific rather than non-purpose-specific",
      category: "Mortgage Parameters",
      icon: React.createElement(HomeIcon, { className: "w-4 h-4" })
    },
    {
      id: "cond-010",
      name: "Multiple Applicants",
      description: "Mortgage has multiple applicants (e.g., married couple)",
      category: "Mortgage Parameters",
      icon: React.createElement(Users, { className: "w-4 h-4" })
    },
  ],
  "Property & Collateral": [
    {
      id: "cond-011",
      name: "Property Type",
      description: "Specific property type (apartment, house, land)",
      category: "Property & Collateral",
      icon: React.createElement(Building, { className: "w-4 h-4" })
    },
    {
      id: "cond-012",
      name: "Energy Performance",
      description: "Property has high energy performance rating (class A/B)",
      category: "Property & Collateral",
      icon: React.createElement(Leaf, { className: "w-4 h-4" })
    },
    {
      id: "cond-013",
      name: "Collateral Value",
      description: "Property has sufficient collateral value",
      category: "Property & Collateral",
      icon: React.createElement(Building, { className: "w-4 h-4" })
    },
  ],
  "Payment History": [
    {
      id: "cond-014",
      name: "Repayment History",
      description: "Client has good repayment history",
      category: "Payment History",
      icon: React.createElement(Clock, { className: "w-4 h-4" })
    },
    {
      id: "cond-015",
      name: "No Delinquencies",
      description: "Client has no payment delinquencies in the past",
      category: "Payment History",
      icon: React.createElement(AlertTriangle, { className: "w-4 h-4" })
    },
  ],
  "Special Conditions": [
    {
      id: "cond-016",
      name: "Refinancing",
      description: "Mortgage refinancing from another bank",
      category: "Special Conditions",
      icon: React.createElement(Repeat, { className: "w-4 h-4" })
    },
    {
      id: "cond-017",
      name: "Green Mortgage",
      description: "Mortgage for eco-friendly housing",
      category: "Special Conditions",
      icon: React.createElement(Leaf, { className: "w-4 h-4" })
    },
  ],
};
