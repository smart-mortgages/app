import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import type { Condition, ConditionWithProperties } from '../../types/admin';
import PropertyInput from './PropertyInput';
import { validatePropertyValue } from '../../utils/propertyValidation';

interface ConditionPropertiesEditorProps {
  condition: Condition;
  conditionWithProperties?: ConditionWithProperties;
  onPropertiesChange: (conditionId: string, properties: Record<string, any>) => void;
}

const ConditionPropertiesEditor: React.FC<ConditionPropertiesEditorProps> = ({
  condition,
  conditionWithProperties,
  onPropertiesChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [propertyValues, setPropertyValues] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Initialize property values from conditionWithProperties or default values
  useEffect(() => {
    if (condition.properties) {
      const initialValues: Record<string, any> = {};
      
      // If we have saved property values, use those
      if (conditionWithProperties?.properties) {
        condition.properties.forEach(prop => {
          initialValues[prop.key] = conditionWithProperties.properties[prop.key] !== undefined 
            ? conditionWithProperties.properties[prop.key] 
            : prop.value;
        });
      } 
      // Otherwise use default values from condition properties
      else {
        condition.properties.forEach(prop => {
          initialValues[prop.key] = prop.value;
        });
      }
      
      setPropertyValues(initialValues);
    }
  }, [condition, conditionWithProperties]);

  // Validate all properties on initialization
  useEffect(() => {
    if (condition.properties) {
      const errors: Record<string, string> = {};
      
      condition.properties.forEach(prop => {
        const value = propertyValues[prop.key];
        if (value !== undefined) {
          const validation = validatePropertyValue(prop, value);
          if (!validation.isValid && validation.errorMessage) {
            errors[prop.key] = validation.errorMessage;
          }
        }
      });
      
      setValidationErrors(errors);
    }
  }, [condition.properties, propertyValues]);

  // Handle property value change
  const handlePropertyChange = (key: string, value: any) => {
    const updatedValues = {
      ...propertyValues,
      [key]: value
    };
    
    // Validate the changed property
    const property = condition.properties?.find(p => p.key === key);
    if (property) {
      const validation = validatePropertyValue(property, value);
      
      // Update validation errors
      setValidationErrors(prev => {
        const updated = { ...prev };
        if (!validation.isValid && validation.errorMessage) {
          updated[key] = validation.errorMessage;
        } else {
          delete updated[key];
        }
        return updated;
      });
    }
    
    setPropertyValues(updatedValues);
    onPropertiesChange(condition.id, updatedValues);
  };

  // If condition has no properties, don't render anything
  if (!condition.properties || condition.properties.length === 0) {
    return null;
  }

  // Check if there are any validation errors
  const hasErrors = Object.keys(validationErrors).length > 0;

  return (
    <div className="mt-2 border-t border-[#404040] pt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-sm text-[#a0a0a0] hover:text-[#f5f5f5] py-1"
      >
        <div className="flex items-center">
          <span>Condition Properties</span>
          {hasErrors && (
            <div className="ml-2 flex items-center text-red-500" title="Some properties have validation errors">
              <AlertCircle className="w-4 h-4" />
              <span className="ml-1 text-xs">{Object.keys(validationErrors).length}</span>
            </div>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2 pl-2 border-l-2 border-[#404040]">
          {condition.properties.map(property => (
            <PropertyInput
              key={property.key}
              property={property}
              value={propertyValues[property.key]}
              onChange={handlePropertyChange}
            />
          ))}
          
          {hasErrors && (
            <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-xs text-red-400">
              <div className="flex items-center mb-1">
                <AlertCircle className="w-3 h-3 mr-1" />
                <span>Please fix the following errors:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1">
                {Object.entries(validationErrors).map(([key, message]) => (
                  <li key={key}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConditionPropertiesEditor;
