import fs from 'fs';

export const mortgageManagerAddress = process.env.MORTGAGE_MANAGER!;
export const mortgageManagerABI = JSON.parse(fs.readFileSync(__dirname + '/../resources/abi/SmartMortgageManager.json', 'utf8'));

export const customerABI = JSON.parse(fs.readFileSync(__dirname + '/../resources/abi/Customer.json', 'utf8'));
export const smartMortgageABI = JSON.parse(fs.readFileSync(__dirname + '/../resources/abi/SmartMortgage.json', 'utf8'));