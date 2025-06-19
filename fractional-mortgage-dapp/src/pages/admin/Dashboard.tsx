// src/pages/admin/Dashboard.tsx
import { Home, Users, Settings, Tag } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Import types
import type { Campaign, Condition, NavItem, ConditionWithProperties } from '../../types/admin';

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
  // State management
  const [activeSection, setActiveSection] = useState('campaigns');
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [campaignConditions, setCampaignConditions] = useState<string[]>([]);
  const [draggedCondition, setDraggedCondition] = useState<Condition | null>(null);
  
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

  // Save campaign conditions
  const handleSaveCampaignConditions = (conditionsWithProperties?: ConditionWithProperties[]) => {
    if (!editingCampaign) return;
    
    const updatedCampaigns = campaigns.map(camp => {
      if (camp.id === editingCampaign.id) {
        return {
          ...camp,
          conditions: campaignConditions,
          conditionsWithProperties: conditionsWithProperties || camp.conditionsWithProperties
        };
      }
      return camp;
    });
    
    setCampaigns(updatedCampaigns);
    setSelectedCampaign({
      ...editingCampaign,
      conditions: campaignConditions,
      conditionsWithProperties: conditionsWithProperties || editingCampaign.conditionsWithProperties
    });
    setEditingCampaign(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCampaign(null);
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
        if (editingCampaign) {
          return (
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
          );
        }
        
        return (
          <div className="flex h-full">
            <CampaignSidebar
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
              getCampaignStatusColor={getCampaignStatusColor}
              getCampaignProgress={getCampaignProgress}
            />
            <div className="flex-1">
              <CampaignDetails
                selectedCampaign={selectedCampaign}
                getCampaignStatusColor={getCampaignStatusColor}
                getCampaignProgress={getCampaignProgress}
                handleEditCampaign={handleEditCampaign}
                getConditionById={getConditionById}
              />
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;