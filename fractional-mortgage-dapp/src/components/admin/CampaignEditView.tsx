import React, { useState, useEffect } from 'react';
import { ArrowLeft, GripVertical, Plus, X, AlertCircle } from 'lucide-react';
import type { Condition, Campaign, ConditionWithProperties } from '../../types/admin';
import ConditionPropertiesEditor from './ConditionPropertiesEditor';
import { validatePropertyValue } from '../../utils/propertyValidation';

interface CampaignEditViewProps {
  editingCampaign: Campaign;
  campaignConditions: string[];
  mockConditions: { [category: string]: Condition[] };
  handleCancelEdit: () => void;
  handleSaveCampaignConditions: (conditionsWithProperties?: ConditionWithProperties[]) => void;
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
  
  // Initialize state for condition properties
  const [conditionsWithProperties, setConditionsWithProperties] = useState<ConditionWithProperties[]>(
    editingCampaign.conditionsWithProperties || []
  );
  
  // State for tracking validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [isValidating, setIsValidating] = useState(false);

  // Update conditionsWithProperties when campaignConditions changes
  useEffect(() => {
    // Create a map of existing property values
    const existingPropertiesMap = new Map<string, Record<string, any>>();
    conditionsWithProperties.forEach(cwp => {
      existingPropertiesMap.set(cwp.conditionId, cwp.properties);
    });

    // Create updated conditionsWithProperties array
    const updatedConditionsWithProperties = campaignConditions.map(conditionId => {
      // If we already have properties for this condition, use them
      if (existingPropertiesMap.has(conditionId)) {
        return {
          conditionId,
          properties: existingPropertiesMap.get(conditionId) || {}
        };
      }
      
      // Otherwise create a new entry with default values
      const condition = getConditionById(conditionId);
      const defaultProperties: Record<string, any> = {};
      
      if (condition?.properties) {
        condition.properties.forEach(prop => {
          defaultProperties[prop.key] = prop.value;
        });
      }
      
      return {
        conditionId,
        properties: defaultProperties
      };
    });

    setConditionsWithProperties(updatedConditionsWithProperties);
  }, [campaignConditions, getConditionById]);

  // Validate all properties in the campaign
  const validateAllProperties = () => {
    setIsValidating(true);
    const errors: Record<string, string[]> = {};
    
    // Check each condition with properties
    conditionsWithProperties.forEach(cwp => {
      const condition = getConditionById(cwp.conditionId);
      if (!condition || !condition.properties) return;
      
      const conditionErrors: string[] = [];
      
      // Check each property in the condition
      condition.properties.forEach(prop => {
        const value = cwp.properties[prop.key];
        const validation = validatePropertyValue(prop, value);
        
        if (!validation.isValid && validation.errorMessage) {
          conditionErrors.push(`${prop.description}: ${validation.errorMessage}`);
        }
      });
      
      if (conditionErrors.length > 0) {
        errors[cwp.conditionId] = conditionErrors;
      }
    });
    
    setValidationErrors(errors);
    
    // Use setTimeout to ensure the state update completes before returning
    setTimeout(() => {
      setIsValidating(false);
    }, 0);
    
    return Object.keys(errors).length === 0;
  };

  // Handle property changes for a condition
  const handlePropertyChange = (conditionId: string, properties: Record<string, any>) => {
    setConditionsWithProperties(prev => {
      return prev.map(cwp => {
        if (cwp.conditionId === conditionId) {
          return { ...cwp, properties };
        }
        return cwp;
      });
    });
    
    // Clear validation errors for this condition when properties change
    if (validationErrors[conditionId]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[conditionId];
        return updated;
      });
    }
  };

  // Validate on component mount
  useEffect(() => {
    // Only validate if there are conditions with properties
    if (conditionsWithProperties.length > 0) {
      validateAllProperties();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle save with properties
  const handleSave = () => {
    // Validate all properties before saving
    const isValid = validateAllProperties();
    
    if (isValid) {
      handleSaveCampaignConditions(conditionsWithProperties);
    } else {
      // Show a message or scroll to the validation errors
      const errorSummary = document.querySelector('.validation-summary');
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
        <div className="flex items-center">
          {Object.keys(validationErrors).length > 0 && (
            <div className="mr-3 flex items-center text-red-500">
              <AlertCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">{Object.keys(validationErrors).length} condition{Object.keys(validationErrors).length > 1 ? 's' : ''} with errors</span>
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isValidating || Object.keys(validationErrors).length > 0}
            className={`px-4 py-2 ${isValidating || Object.keys(validationErrors).length > 0 ? 'bg-[#666666] cursor-not-allowed' : 'bg-[#d2b48c] hover:bg-[#c19a6b]'} text-[#f5f5f5] rounded-lg transition-colors text-sm font-medium`}
          >
            {isValidating ? 'Validating...' : 'Save Changes'}
          </button>
        </div>
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
          
          {/* Validation Summary */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="validation-summary mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                <h4 className="text-sm font-medium text-red-400">Please fix the following validation errors:</h4>
              </div>
              <div className="space-y-2">
                {Object.entries(validationErrors).map(([conditionId, errors]) => {
                  const condition = getConditionById(conditionId);
                  return (
                    <div key={conditionId} className="pl-2 border-l-2 border-red-800">
                      <p className="text-sm font-medium text-[#f5f5f5]">{condition?.name || 'Unknown Condition'}</p>
                      <ul className="list-disc pl-5 text-xs text-red-400 space-y-1 mt-1">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
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
                    className={`flex flex-col p-3 bg-[#333333] rounded-lg border ${validationErrors[condition.id] ? 'border-red-500' : 'border-[#d2b48c]'}`}
                  >
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-[#404040] mr-3">
                        {condition.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-[#f5f5f5]">{condition.name}</p>
                          {validationErrors[condition.id] && (
                            <div className="ml-2 flex items-center text-red-500" title="This condition has validation errors">
                              <AlertCircle className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[#a0a0a0]">{condition.description}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveCondition(condition.id)}
                        className="p-1 rounded-full hover:bg-[#404040]"
                      >
                        <X className="w-4 h-4 text-[#f5f5f5]" />
                      </button>
                    </div>
                    
                    {/* Property Editor */}
                    {condition.properties && condition.properties.length > 0 && (
                      <ConditionPropertiesEditor
                        condition={condition}
                        conditionWithProperties={conditionsWithProperties.find(cwp => cwp.conditionId === condition.id)}
                        onPropertiesChange={handlePropertyChange}
                      />
                    )}
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
