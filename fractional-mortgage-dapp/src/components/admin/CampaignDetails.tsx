import React, { useState } from 'react';
import { CheckCircle, AlertCircle, UserPlus, Search } from 'lucide-react';
import type { Condition, Campaign, Client } from '../../types/admin';

interface CampaignDetailsProps {
  selectedCampaign: Campaign | null;
  getCampaignStatusColor: (status: string) => string;
  getCampaignProgress: (campaign: Campaign) => number;
  handleEditCampaign: (campaign: Campaign) => void;
  getConditionById: (conditionId: string) => Condition | undefined;
  // New prop for handling client addition
  updateCampaign?: (updatedCampaign: Campaign) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  selectedCampaign,
  getCampaignStatusColor,
  getCampaignProgress,
  handleEditCampaign,
  getConditionById,
  updateCampaign
}) => {
  const [showPotentialClients, setShowPotentialClients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Function to add a potential client to the campaign
  const handleAddClientToCampaign = (client: Client) => {
    if (!selectedCampaign || !updateCampaign) return;
    
    // Create a copy of the selected campaign
    const updatedCampaign = { ...selectedCampaign };
    
    // Add the client to the campaign's clients list
    const newClient = {
      ...client,
      applied: false, // Set initial status as not applied
    };
    
    updatedCampaign.clients = [...updatedCampaign.clients, newClient];
    
    // Remove the client from potential clients
    if (updatedCampaign.potentialClients) {
      updatedCampaign.potentialClients = updatedCampaign.potentialClients.filter(
        potentialClient => potentialClient.id !== client.id
      );
    }
    
    // Update the campaign
    updateCampaign(updatedCampaign);
  };
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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCampaignStatusColor(selectedCampaign.status).replace('text-', 'bg-')}/10 ${getCampaignStatusColor(selectedCampaign.status)}`}>
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
            className="px-4 py-2 bg-[#333333] text-[#f5f5f5] rounded-lg hover:bg-[#404040] transition-colors text-sm"
          >
            Edit Campaign
          </button>
          <button 
            onClick={() => setShowPotentialClients(!showPotentialClients)}
            className="px-4 py-2 bg-[#d2b48c] text-[#f5f5f5] rounded-lg hover:bg-[#c19a6b] transition-colors text-sm font-medium flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {showPotentialClients ? 'Hide Potential Clients' : 'Add Clients'}
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

      {/* Potential Clients Section */}
      {showPotentialClients && selectedCampaign.potentialClients && selectedCampaign.potentialClients.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-[#e6d2b5]">Potential Clients</h3>
            <span className="text-sm text-[#a0a0a0]">{selectedCampaign.potentialClients.length} available</span>
          </div>
          
          <div className="bg-[#262626] rounded-lg border border-[#404040] overflow-hidden">
            <div className="p-3 border-b border-[#404040] flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#333333] border border-[#404040] rounded-md py-2 pl-10 pr-4 text-[#f5f5f5] text-sm focus:outline-none focus:ring-1 focus:ring-[#d2b48c]"
                />
              </div>
            </div>
            
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#333333]">
                  <th className="text-left text-[#a0a0a0] p-3">Loan Agreement #</th>
                  <th className="text-left text-[#a0a0a0] p-3">Personal ID</th>
                  <th className="text-left text-[#a0a0a0] p-3">Name</th>
                  <th className="text-left text-[#a0a0a0] p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedCampaign.potentialClients
                  .filter(client => 
                    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (client.loanAgreementNumber && client.loanAgreementNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (client.personalIdNumber && client.personalIdNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map(client => (
                  <tr key={client.id} className="border-t border-[#404040]">
                    <td className="p-3 text-[#f5f5f5]">{client.loanAgreementNumber || 'N/A'}</td>
                    <td className="p-3 text-[#f5f5f5]">{client.personalIdNumber || 'N/A'}</td>
                    <td className="p-3 text-[#f5f5f5]">{client.name}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleAddClientToCampaign(client)}
                        className="px-2 py-1 bg-[#d2b48c] text-[#1a1a1a] rounded hover:bg-[#c19a6b] transition-colors text-xs font-medium"
                      >
                        Add to Campaign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Current Clients Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-[#e6d2b5]">Current Clients</h3>
          <span className="text-sm text-[#a0a0a0]">{appliedClients.length} applied of {selectedCampaign.clients.length} total</span>
        </div>
        <div className="bg-[#262626] rounded-lg border border-[#404040] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#333333]">
                <th className="text-left text-[#a0a0a0] p-3">Name</th>
                <th className="text-left text-[#a0a0a0] p-3">Email</th>
                <th className="text-left text-[#a0a0a0] p-3">Application Date</th>
                <th className="text-left text-[#a0a0a0] p-3">Eligibility</th>
                <th className="text-left text-[#a0a0a0] p-3">Status</th>
                <th className="text-left text-[#a0a0a0] p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCampaign.clients.map(client => (
                <tr key={client.id} className="border-t border-[#404040]">
                  <td className="p-3 text-[#f5f5f5]">{client.name}</td>
                  <td className="p-3 text-[#f5f5f5]">{client.email}</td>
                  <td className="p-3 text-[#f5f5f5]">{client.applied ? new Date().toLocaleDateString() : '-'}</td>
                  <td className="p-3 text-[#f5f5f5]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                      {client.applied ? 'Eligible' : 'Pending Check'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.applied ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {client.applied ? 'Applied' : 'Not Applied'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="px-2 py-1 bg-[#333333] text-[#f5f5f5] rounded hover:bg-[#404040] transition-colors text-xs">
                      {client.applied ? 'View Details' : 'Send Invitation'}
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

export default CampaignDetails;
