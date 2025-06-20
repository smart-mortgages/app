// src/pages/admin/Dashboard.tsx
import { Home, Users, Settings, Tag } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import types
import type { Campaign, Condition, NavItem, ConditionWithProperties } from '../../types/admin';
import type { MortgageData, CustomerData } from '../../types/api';

// Import data context
import { useDataContext } from '../../context/DataContext';

// Import components
import SidebarNavigation from '../../components/admin/SidebarNavigation';
import AdminHeader from '../../components/admin/AdminHeader';
import CampaignSidebar from '../../components/admin/CampaignSidebar';
import CampaignDetails from '../../components/admin/CampaignDetails';
import CampaignEditView from '../../components/admin/CampaignEditView';

// Import mock data
import { mockConditions } from '../../data/mockConditions';
import { mockCampaigns } from '../../data/mockCampaigns';

const AdminDashboard = () => {
  // Get data from context
  const { customers, loading, error, refreshData } = useDataContext();
  
  // State management
  const [activeSection, setActiveSection] = useState('campaigns');
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [campaignConditions, setCampaignConditions] = useState<string[]>([]);
  const [draggedCondition, setDraggedCondition] = useState<Condition | null>(null);
  const [mortgageData, setMortgageData] = useState<{customer: CustomerData, mortgage: MortgageData}[]>([]);
  
  // Effect to update mortgage data when API data changes
  useEffect(() => {
    if (customers.length > 0) {
      // Create a flattened array of customers with their mortgages
      const flattenedData = customers.flatMap(customer => 
        customer.mortgages.map(mortgage => ({ customer, mortgage }))
      );
      
      setMortgageData(flattenedData);
      console.log('Mortgage data loaded:', flattenedData);
      
      // Update campaigns with potential clients from mortgage data
      const updatedCampaigns = campaigns.map(campaign => {
        // Create potential clients from mortgage data
        const potentialClients = flattenedData.map((item, index) => {
          // Use actual customer data if available, otherwise generate a fallback name
          const firstName = item.customer.firstName || 'Client';
          const lastName = item.customer.lastName || item.customer.personalIdNumber;
          const email = item.customer.email || `client-${item.customer.personalIdNumber}@example.com`;
          
          return {
            id: `pc-${index}`,
            name: `${firstName} ${lastName}`,
            email: email,
            applied: false,
            personalIdNumber: item.customer.personalIdNumber,
            loanAgreementNumber: item.mortgage.data.loanAgreementNumber
          };
        });
        
        // Add potential clients that aren't already in the campaign
        const existingClientIds = new Set(campaign.clients.map(c => c.id));
        const newClients = potentialClients.filter(pc => !existingClientIds.has(pc.id));
        
        return {
          ...campaign,
          potentialClients: newClients
        };
      });
      
      setCampaigns(updatedCampaigns);
    }
  }, [customers]);

  // Effect to refresh data when component mounts
  useEffect(() => {
    refreshData();
  }, []);

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'campaigns', label: 'Campaigns', icon: <Tag className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'mortgages', label: 'Mortgages', icon: <Home className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Start editing campaign
  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignConditions([...campaign.conditions]);
  };

  // Save campaign conditions and metadata
  const handleSaveCampaignConditions = (
    conditionsWithProperties?: ConditionWithProperties[],
    updatedCampaign?: Campaign
  ) => {
    if (!editingCampaign) return;
    
    // Check if this is a new campaign (not in the current campaigns array)
    const isNewCampaign = !campaigns.some(camp => camp.id === editingCampaign.id);
    
    let updatedCampaigns;
    
    if (isNewCampaign) {
      // This is a new campaign, add it to the campaigns array
      const newCampaign = {
        ...(updatedCampaign || editingCampaign),
        conditions: campaignConditions,
        conditionsWithProperties: conditionsWithProperties || []
      };
      
      updatedCampaigns = [...campaigns, newCampaign];
    } else {
      // This is an existing campaign, update it
      updatedCampaigns = campaigns.map(camp => {
        if (camp.id === editingCampaign.id) {
          // If we have an updated campaign with metadata changes, use that as the base
          const baseUpdate = updatedCampaign || camp;
          
          return {
            ...baseUpdate,
            conditions: campaignConditions,
            conditionsWithProperties: conditionsWithProperties || baseUpdate.conditionsWithProperties
          };
        }
        return camp;
      });
    }
    
    setCampaigns(updatedCampaigns);
    
    // Use the updated campaign as the base for the selected campaign
    const baseForSelected = updatedCampaign || editingCampaign;
    const savedCampaign = {
      ...baseForSelected,
      conditions: campaignConditions,
      conditionsWithProperties: conditionsWithProperties || baseForSelected.conditionsWithProperties
    };
    
    setSelectedCampaign(savedCampaign);
    setEditingCampaign(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setCampaignConditions([]);
  };
  
  // Update campaign (used when adding clients or making other changes)
  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    // Update the campaign in the campaigns array
    const updatedCampaigns = campaigns.map(camp => 
      camp.id === updatedCampaign.id ? updatedCampaign : camp
    );
    
    // Update state
    setCampaigns(updatedCampaigns);
    setSelectedCampaign(updatedCampaign);
  };
  
  // Create new campaign
  const handleCreateNewCampaign = () => {
    // Generate a unique ID for the new campaign
    const newId = `camp-${String(campaigns.length + 1).padStart(3, '0')}`;
    
    // Create a blank campaign template
    const newCampaign: Campaign = {
      id: newId,
      name: 'New Campaign',
      description: 'Campaign description',
      discountPercentage: 10,
      startDate: new Date().toISOString().split('T')[0], // Today's date
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      clients: [],
      targetClients: 10,
      status: 'pending',
      mortgageType: 'Fixed Rate',
      conditions: [],
      conditionsWithProperties: []
    };
    
    // Set as editing campaign
    setEditingCampaign(newCampaign);
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
      case 'active': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'completed': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  // Get campaign progress percentage
  const getCampaignProgress = (campaign: Campaign) => {
    const appliedCount = campaign.clients.filter(client => client.applied).length;
    return Math.round((appliedCount / campaign.targetClients) * 100);
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'campaigns':
        return (
          <div className="flex h-full">
            {/* Campaign Sidebar - Always visible */}
            <CampaignSidebar
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
              getCampaignStatusColor={getCampaignStatusColor}
              getCampaignProgress={getCampaignProgress}
              handleCreateNewCampaign={handleCreateNewCampaign}
            />
            
            {/* Main Content Area */}
            <div className="flex-1">
              {editingCampaign ? (
                <CampaignEditView
                  editingCampaign={editingCampaign}
                  campaignConditions={campaignConditions}
                  mockConditions={mockConditions}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveCampaignConditions={handleSaveCampaignConditions}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  handleRemoveCondition={handleRemoveCondition}
                  getConditionById={getConditionById}
                />
              ) : (
                <CampaignDetails
                  selectedCampaign={selectedCampaign}
                  getCampaignStatusColor={getCampaignStatusColor}
                  getCampaignProgress={getCampaignProgress}
                  handleEditCampaign={handleEditCampaign}
                  getConditionById={getConditionById}
                  updateCampaign={handleUpdateCampaign}
                />
              )}
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
            
            {mortgageData.length > 0 ? (
              <div className="mt-4">
                <h4 className="text-[#e6d2b5] text-lg mb-3">Loaded Mortgages</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-[#f5f5f5]">
                    <thead className="text-xs uppercase bg-[#333333] text-[#d2b48c]">
                      <tr>
                        <th className="px-4 py-3">Loan Agreement #</th>
                        <th className="px-4 py-3">Personal ID</th>
                        <th className="px-4 py-3">Balance (EUR)</th>
                        <th className="px-4 py-3">Monthly Payment</th>
                        <th className="px-4 py-3">Payment Discipline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mortgageData.map((item, index) => (
                        <tr key={index} className="border-b border-[#333333]">
                          <td className="p-3 text-[#f5f5f5]">{item.mortgage.data.loanAgreementNumber}</td>
                          <td className="p-3 text-[#f5f5f5]">{item.customer.personalIdNumber}</td>
                          <td className="p-3 text-[#f5f5f5]">{item.mortgage.data.mortgageBalanceEUR}</td>
                          <td className="p-3 text-[#f5f5f5]">{item.mortgage.data.monthlyMortgagePaymentEUR}</td>
                          <td className="p-3 text-[#f5f5f5]">{item.mortgage.data.paymentDiscipline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-[#a0a0a0]">No mortgage data available.</p>
            )}
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
      <SidebarNavigation
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminHeader 
          title="Admin Dashboard" 
          subtitle="System Management" 
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-[#d2b48c] text-lg">Loading data...</div>
            </div>
          ) : error ? (
            <div className="bg-[#3a1c1c] text-[#f08080] p-4 rounded-md">
              <h3 className="font-medium">Error loading data</h3>
              <p>{error}</p>
              <button 
                onClick={refreshData}
                className="mt-2 px-4 py-2 bg-[#d2b48c] text-[#1a1a1a] rounded hover:bg-[#c0a070] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;