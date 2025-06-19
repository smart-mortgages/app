import type { Property } from '../types/admin';

/**
 * Validates a property value based on its type and constraints
 * @param property The property definition
 * @param value The value to validate
 * @returns An object with isValid flag and optional error message
 */
export const validatePropertyValue = (
  property: Property,
  value: any
): { isValid: boolean; errorMessage?: string } => {
  switch (property.type) {
    case 'boolean':
      return { isValid: typeof value === 'boolean' };
      
    case 'percentage':
      if (typeof value !== 'number') {
        return { isValid: false, errorMessage: 'Value must be a number' };
      }
      if (value < 0 || value > 100) {
        return { isValid: false, errorMessage: 'Percentage must be between 0 and 100' };
      }
      return { isValid: true };
      
    case 'enum':
      if (!property.options || !Array.isArray(property.options)) {
        return { isValid: false, errorMessage: 'Property has no valid options defined' };
      }
      if (!property.options.includes(value)) {
        return { 
          isValid: false, 
          errorMessage: `Value must be one of: ${property.options.join(', ')}` 
        };
      }
      return { isValid: true };
      
    case 'range':
      if (typeof value !== 'number') {
        return { isValid: false, errorMessage: 'Value must be a number' };
      }
      const min = property.min !== undefined ? property.min : -Infinity;
      const max = property.max !== undefined ? property.max : Infinity;
      
      if (value < min || value > max) {
        return { 
          isValid: false, 
          errorMessage: `Value must be between ${min} and ${max}` 
        };
      }
      return { isValid: true };
      
    case 'number':
      if (typeof value !== 'number') {
        return { isValid: false, errorMessage: 'Value must be a number' };
      }
      const minValue = property.min !== undefined ? property.min : -Infinity;
      const maxValue = property.max !== undefined ? property.max : Infinity;
      
      if (value < minValue || value > maxValue) {
        let errorMessage = 'Value is out of range';
        if (property.min !== undefined && property.max !== undefined) {
          errorMessage = `Value must be between ${property.min} and ${property.max}`;
        } else if (property.min !== undefined) {
          errorMessage = `Value must be at least ${property.min}`;
        } else if (property.max !== undefined) {
          errorMessage = `Value must be at most ${property.max}`;
        }
        return { isValid: false, errorMessage };
      }
      return { isValid: true };
      
    default:
      return { isValid: true };
  }
};

/**
 * Gets the default value for a property based on its type
 * @param property The property definition
 * @returns The default value for the property
 */
export const getDefaultPropertyValue = (property: Property): any => {
  // If the property already has a value defined, use that
  if (property.value !== undefined) {
    return property.value;
  }
  
  // Otherwise, provide sensible defaults based on type
  switch (property.type) {
    case 'boolean':
      return false;
    case 'percentage':
      return 0;
    case 'enum':
      return property.options && property.options.length > 0 
        ? property.options[0] 
        : '';
    case 'range':
    case 'number':
      return property.min !== undefined ? property.min : 0;
    default:
      return null;
  }
};

/**
 * Formats a property value for display based on its type
 * @param property The property definition
 * @param value The value to format
 * @returns The formatted value as a string
 */
export const formatPropertyValue = (property: Property, value: any): string => {
  if (value === undefined || value === null) {
    return 'Not set';
  }
  
  switch (property.type) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'percentage':
      return `${value}%`;
    case 'enum':
      return String(value);
    case 'range':
    case 'number':
      return String(value);
    default:
      return String(value);
  }
};
