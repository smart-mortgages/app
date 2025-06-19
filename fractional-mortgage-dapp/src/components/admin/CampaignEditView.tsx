import React from 'react';
import { ArrowLeft, GripVertical, Plus, X } from 'lucide-react';
import type { Condition, Campaign } from '../../types/admin';

interface CampaignEditViewProps {
  editingCampaign: Campaign;
  campaignConditions: string[];
  mockConditions: { [category: string]: Condition[] };
  handleCancelEdit: () => void;
  handleSaveCampaignConditions: () => void;
  handleDragStart: (condition: Condition) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveCondition: (conditionId: string) => void;
  getConditionById: (conditionId: string) => Condition | undefined;
}

const CampaignEditView: React.FC<CampaignEditViewProps> = ({
  editingCampaign,
  campaignConditions,
  mockConditions,
  handleCancelEdit,
  handleSaveCampaignConditions,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleRemoveCondition,
  getConditionById
}) => {
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
                    className="flex items-center p-3 bg-[#333333] rounded-lg border border-[#d2b48c]"
                  >
                    <div className="p-1.5 rounded-full bg-[#404040] mr-3">
                      {condition.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#f5f5f5]">{condition.name}</p>
                      <p className="text-xs text-[#a0a0a0]">{condition.description}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveCondition(condition.id)}
                      className="p-1 rounded-full hover:bg-[#404040]"
                    >
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

export default CampaignEditView;
