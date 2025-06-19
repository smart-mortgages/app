import { ArrowRight, Home, Users, FileText, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Navigation items for the sidebar
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'mortgages', label: 'Mortgages', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
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
