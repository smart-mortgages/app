import React, { useState, useEffect } from 'react';
import type { Property } from '../../types/admin';
import { validatePropertyValue } from '../../utils/propertyValidation';

interface PropertyInputProps {
  property: Property;
  value: any;
  onChange: (key: string, value: any) => void;
}

const PropertyInput: React.FC<PropertyInputProps> = ({ property, value, onChange }) => {
  // Use the value from props if provided, otherwise use the default from the property
  const currentValue = value !== undefined ? value : property.value;
  
  // State for validation errors
  const [error, setError] = useState<string | undefined>(undefined);
  
  // Validate value when it changes
  useEffect(() => {
    if (currentValue !== undefined) {
      const validation = validatePropertyValue(property, currentValue);
      setError(validation.isValid ? undefined : validation.errorMessage);
    }
  }, [currentValue, property]);
  
  const handleChange = (newValue: any) => {
    // Validate the new value
    const validation = validatePropertyValue(property, newValue);
    setError(validation.isValid ? undefined : validation.errorMessage);
    
    // Pass the value up even if invalid (parent can decide what to do)
    onChange(property.key, newValue);
  };

  // Common error message component
  const ErrorMessage = () => {
    if (!error) return null;
    return <p className="text-xs text-red-500 mt-1">{error}</p>;
  };

  switch (property.type) {
    case 'boolean':
      return (
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentValue}
              onChange={(e) => handleChange(e.target.checked)}
              className="rounded border-[#404040] bg-[#262626] text-[#d2b48c] focus:ring-[#d2b48c] focus:ring-offset-[#262626]"
            />
            <span className="text-sm text-[#f5f5f5]">{property.description}</span>
          </label>
          <ErrorMessage />
        </div>
      );

    case 'percentage':
      return (
        <div className="mb-3">
          <label className="block text-sm text-[#f5f5f5] mb-1">{property.description}</label>
          <div className="flex items-center">
            <input
              type="range"
              min={property.min || 0}
              max={property.max || 100}
              step={property.step || 1}
              value={currentValue}
              onChange={(e) => handleChange(parseFloat(e.target.value))}
              className={`w-full mr-2 h-2 bg-[#404040] rounded-lg appearance-none cursor-pointer accent-[#d2b48c] ${error ? 'border-red-500' : ''}`}
            />
            <span className="text-sm text-[#f5f5f5] min-w-[40px]">{currentValue}%</span>
          </div>
          <ErrorMessage />
        </div>
      );

    case 'enum':
      return (
        <div className="mb-3">
          <label className="block text-sm text-[#f5f5f5] mb-1">{property.description}</label>
          <select
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full px-3 py-2 bg-[#262626] border ${error ? 'border-red-500' : 'border-[#404040]'} rounded-md text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d2b48c] focus:border-[#d2b48c]`}
          >
            {property.options?.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          <ErrorMessage />
        </div>
      );

    case 'range':
      const [min, max] = Array.isArray(currentValue) ? currentValue : [property.min || 0, property.max || 100];
      return (
        <div className="mb-3">
          <label className="block text-sm text-[#f5f5f5] mb-1">{property.description}</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-[#a0a0a0]">Min</label>
              <input
                type="number"
                min={property.min}
                max={property.max}
                step={property.step || 1}
                value={min}
                onChange={(e) => handleChange([parseFloat(e.target.value), max])}
                className={`w-full px-3 py-2 bg-[#262626] border ${error ? 'border-red-500' : 'border-[#404040]'} rounded-md text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d2b48c] focus:border-[#d2b48c]`}
              />
            </div>
            <div>
              <label className="block text-xs text-[#a0a0a0]">Max</label>
              <input
                type="number"
                min={property.min}
                max={property.max}
                step={property.step || 1}
                value={max}
                onChange={(e) => handleChange([min, parseFloat(e.target.value)])}
                className={`w-full px-3 py-2 bg-[#262626] border ${error ? 'border-red-500' : 'border-[#404040]'} rounded-md text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d2b48c] focus:border-[#d2b48c]`}
              />
            </div>
          </div>
          <ErrorMessage />
        </div>
      );

    case 'number':
      return (
        <div className="mb-3">
          <label className="block text-sm text-[#f5f5f5] mb-1">{property.description}</label>
          <div className="flex items-center">
            <input
              type="number"
              min={property.min}
              max={property.max}
              step={property.step || 1}
              value={currentValue}
              onChange={(e) => handleChange(parseFloat(e.target.value))}
              className={`w-full px-3 py-2 bg-[#262626] border ${error ? 'border-red-500' : 'border-[#404040]'} rounded-md text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d2b48c] focus:border-[#d2b48c]`}
            />
            {property.isMinConstraint !== undefined && (
              <span className="ml-2 text-xs text-[#a0a0a0]">
                {property.isMinConstraint ? 'Min' : 'Max'}
              </span>
            )}
          </div>
          <ErrorMessage />
        </div>
      );

    default:
      return <div>Unsupported property type: {property.type}</div>;
  }
};

export default PropertyInput;
