import React from 'react';
import { Percent, Target } from 'lucide-react';
import type { Campaign } from '../../types/admin';

interface CampaignSidebarProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign) => void;
  getCampaignStatusColor: (status: string) => string;
  getCampaignProgress: (campaign: Campaign) => number;
}

const CampaignSidebar: React.FC<CampaignSidebarProps> = ({
  campaigns,
  selectedCampaign,
  setSelectedCampaign,
  getCampaignStatusColor,
  getCampaignProgress
}) => {
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

export default CampaignSidebar;
