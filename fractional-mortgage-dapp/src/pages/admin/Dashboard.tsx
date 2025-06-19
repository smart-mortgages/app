import { ArrowRight, Home, Users, FileText, Settings, ChevronRight, Tag, Percent, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
}

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
    mortgageType: 'Fixed Rate'
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
    mortgageType: 'Variable Rate'
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
    mortgageType: 'Fixed Rate'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(mockCampaigns[0]);

  // Navigation items for the sidebar
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Tag className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'mortgages', label: 'Mortgages', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

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
          {mockCampaigns.map(campaign => (
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
            <button className="px-4 py-2 bg-[#333333] text-[#f5f5f5] rounded-lg hover:bg-[#404040] transition-colors text-sm">
              Edit Campaign
            </button>
            <button className="px-4 py-2 bg-[#d2b48c] text-[#1a1a1a] rounded-lg hover:bg-[#c19a6b] transition-colors text-sm font-medium">
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
