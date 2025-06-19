import { ArrowRight, Home, Users, FileText, Settings, ChevronRight, Tag, Percent, Target, CheckCircle, AlertCircle, X, ArrowLeft, Plus, GripVertical, CreditCard, Clock, Shield, Home as HomeIcon, Building, AlertTriangle, Repeat, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Condition interface definition
interface Condition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

// Campaign interface definition
interface Client {
  id: string;
  name: string;
  email: string;
  applied: boolean;
}

interface Campaign {
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

// Mock condition data organized by categories
const mockConditions: { [category: string]: Condition[] } = {
  "Account Activity": [
    {
      id: "cond-001",
      name: "Regular Income",
      description: "Regular income deposits to the account (minimum amount and frequency)",
      category: "Account Activity",
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "cond-002",
      name: "Transaction Volume",
      description: "Minimum number of transactions per month (card payments, transfers)",
      category: "Account Activity",
      icon: <CreditCard className="w-4 h-4" />
    },
    {
      id: "cond-003",
      name: "Account Loyalty",
      description: "Length of account holding at the bank (minimum years)",
      category: "Account Activity",
      icon: <Clock className="w-4 h-4" />
    },
  ],
  "Insurance": [
    {
      id: "cond-004",
      name: "Loan Repayment Insurance",
      description: "Client has active loan repayment insurance",
      category: "Insurance",
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: "cond-005",
      name: "Life Insurance",
      description: "Client has active life insurance policy",
      category: "Insurance",
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: "cond-006",
      name: "Household Insurance",
      description: "Client has active household insurance policy",
      category: "Insurance",
      icon: <Shield className="w-4 h-4" />
    },
  ],
  "Mortgage Parameters": [
    {
      id: "cond-007",
      name: "LTV Ratio",
      description: "Loan-to-Value ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: <HomeIcon className="w-4 h-4" />
    },
    {
      id: "cond-008",
      name: "DSTI Ratio",
      description: "Debt Service-to-Income ratio below specified threshold",
      category: "Mortgage Parameters",
      icon: <HomeIcon className="w-4 h-4" />
    },
    {
      id: "cond-009",
      name: "Purpose-Specific Loan",
      description: "Mortgage is purpose-specific rather than non-purpose-specific",
      category: "Mortgage Parameters",
      icon: <HomeIcon className="w-4 h-4" />
    },
    {
      id: "cond-010",
      name: "Multiple Applicants",
      description: "Mortgage has multiple applicants (e.g., married couple)",
      category: "Mortgage Parameters",
      icon: <Users className="w-4 h-4" />
    },
  ],
  "Property & Collateral": [
    {
      id: "cond-011",
      name: "Property Type",
      description: "Specific property type (apartment, house, land)",
      category: "Property & Collateral",
      icon: <Building className="w-4 h-4" />
    },
    {
      id: "cond-012",
      name: "Energy Performance",
      description: "Property has high energy performance rating (class A/B)",
      category: "Property & Collateral",
      icon: <Leaf className="w-4 h-4" />
    },
    {
      id: "cond-013",
      name: "Collateral Value",
      description: "Property has sufficient collateral value",
      category: "Property & Collateral",
      icon: <Building className="w-4 h-4" />
    },
  ],
  "Payment History": [
    {
      id: "cond-014",
      name: "Clean Repayment History",
      description: "Client has no issues with past repayments",
      category: "Payment History",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "cond-015",
      name: "No Delinquencies",
      description: "Client has no payment delinquencies in the past",
      category: "Payment History",
      icon: <AlertTriangle className="w-4 h-4" />
    },
  ],
  "Special Conditions": [
    {
      id: "cond-016",
      name: "Refinancing",
      description: "Mortgage refinancing from another bank",
      category: "Special Conditions",
      icon: <Repeat className="w-4 h-4" />
    },
    {
      id: "cond-017",
      name: "Green Mortgage",
      description: "Mortgage for eco-friendly housing",
      category: "Special Conditions",
      icon: <Leaf className="w-4 h-4" />
    },
  ],
};

// Mock campaign data
const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Summer Special',
    description: 'Special summer discount for first-time homebuyers with 15% off on interest rates for the first year.',
    discountPercentage: 15,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    clients: [
      { id: 'c1', name: 'John Doe', email: 'john@example.com', applied: true },
      { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', applied: true },
      { id: 'c3', name: 'Robert Johnson', email: 'robert@example.com', applied: false },
      { id: 'c4', name: 'Emily Wilson', email: 'emily@example.com', applied: true },
    ],
    targetClients: 10,
    status: 'active',
    mortgageType: 'Fixed Rate',
    conditions: ['cond-007', 'cond-014', 'cond-003']
  },
  {
    id: 'camp-002',
    name: 'Refinance Boost',
    description: 'Refinancing campaign offering 10% discount on closing costs for existing homeowners looking to refinance.',
    discountPercentage: 10,
    startDate: '2025-07-15',
    endDate: '2025-10-15',
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
      { id: 'c7', name: 'James Wilson', email: 'james@example.com', applied: true },
      { id: 'c8', name: 'Patricia Moore', email: 'patricia@example.com', applied: true },
      { id: 'c9', name: 'Richard Taylor', email: 'richard@example.com', applied: true },
      { id: 'c10', name: 'Linda Anderson', email: 'linda@example.com', applied: true },
      { id: 'c11', name: 'Thomas White', email: 'thomas@example.com', applied: false },
      { id: 'c12', name: 'Jennifer Martin', email: 'jennifer@example.com', applied: true },
    ],
    targetClients: 12,
    status: 'active',
    mortgageType: 'Fixed Rate',
    conditions: ['cond-005', 'cond-008', 'cond-015']
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('campaigns');
  // Use state for campaigns to allow updates to persist
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(campaigns[0]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [draggedCondition, setDraggedCondition] = useState<Condition | null>(null);
  const [campaignConditions, setCampaignConditions] = useState<string[]>([]);

  // Navigation items for the sidebar
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Tag className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'mortgages', label: 'Mortgages', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Start editing campaign
  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignConditions([...campaign.conditions]);
  };

  // Save campaign conditions
  const handleSaveCampaignConditions = () => {
    if (!editingCampaign) return;
    
    // Update the campaign with new conditions
    const updatedCampaigns = campaigns.map(camp => {
      if (camp.id === editingCampaign.id) {
        return { ...camp, conditions: campaignConditions };
      }
      return camp;
    });
    
    // Update campaigns state to persist changes
    setCampaigns(updatedCampaigns);
    
    // Find the updated campaign
    const updatedCampaign = updatedCampaigns.find(c => c.id === editingCampaign.id);
    
    // Update selected campaign if it was the one being edited
    if (updatedCampaign) {
      setSelectedCampaign(updatedCampaign);
    }
    
    // Exit edit mode
    setEditingCampaign(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setCampaignConditions([]);
  };

  // Handle drag start
  const handleDragStart = (condition: Condition) => {
    setDraggedCondition(condition);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedCondition && !campaignConditions.includes(draggedCondition.id)) {
      setCampaignConditions([...campaignConditions, draggedCondition.id]);
    }
    setDraggedCondition(null);
  };

  // Remove condition from campaign
  const handleRemoveCondition = (conditionId: string) => {
    setCampaignConditions(campaignConditions.filter(id => id !== conditionId));
  };

  // Get condition by ID
  const getConditionById = (conditionId: string): Condition | undefined => {
    for (const category in mockConditions) {
      const condition = mockConditions[category].find(c => c.id === conditionId);
      if (condition) return condition;
    }
    return undefined;
  };

  // Get campaign status color
  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  // Get campaign progress percentage
  const getCampaignProgress = (campaign: Campaign) => {
    const appliedClients = campaign.clients.filter(client => client.applied).length;
    return Math.round((appliedClients / campaign.targetClients) * 100);
  };

  // Render campaign sidebar
  const renderCampaignSidebar = () => {
    return (
      <div className="w-64 h-full bg-[#2a2a2a] border-r border-[#404040] overflow-y-auto">
        <div className="p-4 border-b border-[#404040]">
          <h3 className="text-lg font-medium text-[#e6d2b5]">Campaigns</h3>
          <p className="text-xs text-[#a0a0a0] mt-1">Manage discount campaigns</p>
        </div>
        <div className="py-2">
          {campaigns.map(campaign => (
            <button
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={`w-full text-left px-4 py-3 border-l-4 ${selectedCampaign?.id === campaign.id ? 'border-[#d2b48c] bg-[#333333]' : 'border-transparent hover:bg-[#303030]'}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#f5f5f5]">{campaign.name}</span>
                <span className={`text-xs ${getCampaignStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
              <div className="mt-1 flex items-center text-xs text-[#a0a0a0]">
                <Percent className="w-3 h-3 mr-1" />
                <span>{campaign.discountPercentage}% discount</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#a0a0a0]">
                    <Target className="w-3 h-3 inline mr-1" />
                    Progress
                  </span>
                  <span className="text-[#f5f5f5]">
                    {campaign.clients.filter(c => c.applied).length}/{campaign.targetClients}
                  </span>
                </div>
                <div className="w-full bg-[#404040] rounded-full h-1.5">
                  <div 
                    className="bg-[#d2b48c] h-1.5 rounded-full" 
                    style={{ width: `${getCampaignProgress(campaign)}%` }}
                  ></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render campaign edit view
  const renderCampaignEditView = () => {
    if (!editingCampaign) return null;

    return (
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#262626] p-4 border-b border-[#404040] flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleCancelEdit}
              className="mr-3 p-2 rounded-full hover:bg-[#333333]"
            >
              <ArrowLeft className="w-5 h-5 text-[#f5f5f5]" />
            </button>
            <div>
              <h2 className="text-lg font-medium text-[#e6d2b5]">Edit Campaign Conditions</h2>
              <p className="text-sm text-[#a0a0a0]">{editingCampaign.name}</p>
            </div>
          </div>
          <button 
            onClick={handleSaveCampaignConditions}
            className="px-4 py-2 bg-[#d2b48c] text-[#f5f5f5] rounded-lg hover:bg-[#c19a6b] transition-colors text-sm font-medium"
          >
            Save Changes
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Available conditions */}
          <div className="w-1/2 border-r border-[#404040] overflow-y-auto p-4">
            <h3 className="text-md font-medium text-[#e6d2b5] mb-4">Available Conditions</h3>
            <p className="text-sm text-[#a0a0a0] mb-4">Drag conditions to apply them to this campaign</p>
            
            {Object.keys(mockConditions).map(category => (
              <div key={category} className="mb-6">
                <h4 className="text-sm font-medium text-[#f5f5f5] mb-2">{category}</h4>
                <div className="space-y-2">
                  {mockConditions[category].map(condition => (
                    <div 
                      key={condition.id}
                      draggable
                      onDragStart={() => handleDragStart(condition)}
                      className={`flex items-center p-3 bg-[#333333] rounded-lg border border-[#404040] cursor-grab hover:border-[#d2b48c] transition-colors ${
                        campaignConditions.includes(condition.id) ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="p-1.5 rounded-full bg-[#404040] mr-3">
                        {condition.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#f5f5f5]">{condition.name}</p>
                        <p className="text-xs text-[#a0a0a0]">{condition.description}</p>
                      </div>
                      <GripVertical className="w-4 h-4 text-[#a0a0a0]" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected conditions */}
          <div 
            className="w-1/2 p-4 overflow-y-auto"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h3 className="text-md font-medium text-[#e6d2b5] mb-4">Campaign Conditions</h3>
            <p className="text-sm text-[#a0a0a0] mb-4">Drop conditions here to apply them to this campaign</p>
            
            {campaignConditions.length === 0 ? (
              <div className="border-2 border-dashed border-[#404040] rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#333333] mb-3">
                  <Plus className="w-6 h-6 text-[#a0a0a0]" />
                </div>
                <p className="text-[#a0a0a0]">Drag conditions here to apply them to this campaign</p>
              </div>
            ) : (
              <div className="space-y-2 min-h-[200px]">
                {campaignConditions.map(conditionId => {
                  const condition = getConditionById(conditionId);
                  if (!condition) return null;
                  
                  return (
                    <div 
                      key={condition.id}
                      className="flex items-center p-3 bg-[#333333] rounded-lg border border-[#d2b48c]">
                      <div className="p-1.5 rounded-full bg-[#404040] mr-3">
                        {condition.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#f5f5f5]">{condition.name}</p>
                        <p className="text-xs text-[#a0a0a0]">{condition.description}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveCondition(condition.id)}
                        className="p-1 rounded-full hover:bg-[#404040]">
                        <X className="w-4 h-4 text-[#f5f5f5]" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render campaign details
  const renderCampaignDetails = () => {
    if (!selectedCampaign) {
      return (
        <div className="p-6 text-center">
          <p className="text-[#a0a0a0]">Select a campaign to view details</p>
        </div>
      );
    }

    const appliedClients = selectedCampaign.clients.filter(client => client.applied);
    const progress = getCampaignProgress(selectedCampaign);

    return (
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#e6d2b5]">{selectedCampaign.name}</h2>
            <div className="flex items-center mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCampaignStatusColor(selectedCampaign.status)} bg-opacity-10 bg-current`}>
                {selectedCampaign.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                 selectedCampaign.status === 'pending' ? <AlertCircle className="w-3 h-3 mr-1" /> : 
                 <CheckCircle className="w-3 h-3 mr-1" />}
                {selectedCampaign.status.charAt(0).toUpperCase() + selectedCampaign.status.slice(1)}
              </span>
              <span className="text-[#a0a0a0] text-sm ml-3">
                {selectedCampaign.mortgageType}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEditCampaign(selectedCampaign)}
              className="px-4 py-2 bg-[#333333] text-[#f5f5f5] rounded-lg hover:bg-[#404040] transition-colors text-sm">
              Edit Campaign
            </button>
            <button className="px-4 py-2 bg-[#d2b48c] text-[#f5f5f5] rounded-lg hover:bg-[#c19a6b] transition-colors text-sm font-medium">
              Add Clients
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#262626] p-4 rounded-lg border border-[#404040]">
            <h4 className="text-sm font-medium text-[#a0a0a0] mb-1">Discount</h4>
            <p className="text-2xl font-bold text-[#f5f5f5]">{selectedCampaign.discountPercentage}%</p>
          </div>
          <div className="bg-[#262626] p-4 rounded-lg border border-[#404040]">
            <h4 className="text-sm font-medium text-[#a0a0a0] mb-1">Duration</h4>
            <p className="text-sm text-[#f5f5f5]">
              {new Date(selectedCampaign.startDate).toLocaleDateString()} - {new Date(selectedCampaign.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-[#262626] p-4 rounded-lg border border-[#404040]">
            <h4 className="text-sm font-medium text-[#a0a0a0] mb-1">Target Progress</h4>
            <div className="flex items-center">
              <div className="flex-1 mr-4">
                <div className="w-full bg-[#404040] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-[#d2b48c]'}`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-[#f5f5f5] font-medium">{appliedClients.length}/{selectedCampaign.targetClients}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#e6d2b5] mb-2">Description</h3>
          <p className="text-[#f5f5f5] bg-[#262626] p-4 rounded-lg border border-[#404040]">
            {selectedCampaign.description}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-[#e6d2b5]">Conditions</h3>
            <span className="text-sm text-[#a0a0a0]">{selectedCampaign.conditions.length} applied</span>
          </div>
          <div className="bg-[#262626] p-4 rounded-lg border border-[#404040]">
            {selectedCampaign.conditions.length === 0 ? (
              <p className="text-[#a0a0a0] text-center py-2">No conditions applied to this campaign</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedCampaign.conditions.map(conditionId => {
                  const condition = getConditionById(conditionId);
                  if (!condition) return null;
                  
                  return (
                    <div key={condition.id} className="flex items-center p-2 bg-[#333333] rounded-lg">
                      <div className="p-1 rounded-full bg-[#404040] mr-2">
                        {condition.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#f5f5f5]">{condition.name}</p>
                        <p className="text-xs text-[#a0a0a0]">{condition.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#e6d2b5]">Client List</h3>
            <span className="text-sm text-[#a0a0a0]">{selectedCampaign.clients.length} total</span>
          </div>
          <div className="bg-[#262626] rounded-lg border border-[#404040] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#333333] text-left">
                  <th className="px-4 py-3 text-sm font-medium text-[#a0a0a0]">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#a0a0a0]">Email</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#a0a0a0]">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-[#a0a0a0]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#404040]">
                {selectedCampaign.clients.map(client => (
                  <tr key={client.id} className="hover:bg-[#2a2a2a]">
                    <td className="px-4 py-3 text-[#f5f5f5]">{client.name}</td>
                    <td className="px-4 py-3 text-[#f5f5f5]">{client.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.applied ? 'bg-green-900 bg-opacity-20 text-green-400' : 'bg-yellow-900 bg-opacity-20 text-yellow-400'}`}>
                        {client.applied ? 'Applied' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-[#d2b48c] hover:text-[#c19a6b] text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on active section
  const renderContent = () => {
    // If editing a campaign, show the edit view
    if (editingCampaign) {
      return renderCampaignEditView();
    }
    
    switch (activeSection) {
      case 'campaigns':
        return (
          <div className="flex h-full">
            {renderCampaignSidebar()}
            <div className="flex-1 overflow-y-auto">
              {renderCampaignDetails()}
            </div>
          </div>
        );
      case 'overview':
        return (
          <div className="bg-[#262626] rounded-xl shadow-md p-8 border border-[#404040]">
            <h3 className="text-xl font-medium text-[#d2b48c] mb-4">System Overview</h3>
            <p className="text-[#f5f5f5] mb-6">Welcome to the admin dashboard overview.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#333333] p-6 rounded-lg border border-[#404040]">
                <h4 className="text-[#e6d2b5] font-medium mb-2">Active Users</h4>
                <p className="text-3xl font-bold text-[#f5f5f5]">128</p>
              </div>
              <div className="bg-[#333333] p-6 rounded-lg border border-[#404040]">
                <h4 className="text-[#e6d2b5] font-medium mb-2">Active Mortgages</h4>
                <p className="text-3xl font-bold text-[#f5f5f5]">45</p>
              </div>
              <div className="bg-[#333333] p-6 rounded-lg border border-[#404040]">
                <h4 className="text-[#e6d2b5] font-medium mb-2">Total Value</h4>
                <p className="text-3xl font-bold text-[#f5f5f5]">$12.4M</p>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-[#262626] rounded-xl shadow-md p-8 border border-[#404040]">
            <h3 className="text-xl font-medium text-[#d2b48c] mb-4">User Management</h3>
            <p className="text-[#f5f5f5] mb-6">Manage system users and permissions.</p>
            <p className="text-[#a0a0a0]">User management features will be implemented here.</p>
          </div>
        );
      case 'mortgages':
        return (
          <div className="bg-[#262626] rounded-xl shadow-md p-8 border border-[#404040]">
            <h3 className="text-xl font-medium text-[#d2b48c] mb-4">Mortgage Management</h3>
            <p className="text-[#f5f5f5] mb-6">Review and manage mortgage contracts.</p>
            <p className="text-[#a0a0a0]">Mortgage management features will be implemented here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-[#262626] rounded-xl shadow-md p-8 border border-[#404040]">
            <h3 className="text-xl font-medium text-[#d2b48c] mb-4">System Settings</h3>
            <p className="text-[#f5f5f5] mb-6">Configure system parameters and options.</p>
            <p className="text-[#a0a0a0]">Settings features will be implemented here.</p>
          </div>
        );
      default:
        return (
          <div className="bg-[#262626] rounded-xl shadow-md p-8 border border-[#404040] text-center">
            <h3 className="text-xl font-medium text-[#d2b48c] mb-4">Select a Section</h3>
            <p className="text-[#f5f5f5]">Please select a section from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Left Sidebar Navigation */}
      <div className="w-64 h-full bg-[#262626] border-r border-[#404040] flex flex-col">
        <div className="p-4 border-b border-[#404040]">
          <h2 className="text-xl font-bold text-[#e6d2b5]">Admin Panel</h2>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeSection === item.id ? 'bg-[#333333] text-[#e6d2b5]' : 'text-[#f5f5f5] hover:bg-[#2a2a2a]'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom section with user dashboard link */}
        <div className="p-4 border-t border-[#404040]">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center space-x-2 bg-[#d2b48c] text-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md"
          >
            <span>User Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#262626] to-[#333333] p-6 border-b border-[#d2b48c]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#e6d2b5]">Admin Dashboard</h1>
              <p className="text-sm text-[#f5f5f5] opacity-80">System Management</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
