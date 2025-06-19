pragma solidity ^0.8.28;

import "./Customer.sol";
import "./SmartMortgage.sol";

contract SmartMortgageManager {
    mapping(string => Customer) private customers;
    string[] private customerKeys;
    mapping(string => SmartMortgage) private mortgages;
    string[] private mortgageKeys;

    function saveCustomer(CustomerData memory customerData) public {
        if (address(customers[customerData.documentNumber]) == address(0)) {
            customerKeys.push(customerData.documentNumber);
            Customer customer = new Customer();
            customer.setData(customerData);
            customers[customerData.documentNumber] = customer;
        } else {
            customers[customerData.documentNumber].setData(customerData);
        }
    }

    function saveSmartMortgage(
        string memory customerDocumentNumber,
        SmartMortgageData memory mortgageData,
        SmartMortgageRules memory mortgageRules
    ) public {
        Customer customer = customers[customerDocumentNumber];
        require(address(customer) != address(0), "Customer does not exist");

        if (address(mortgages[mortgageData.loanAgreementNumber]) == address(0)) {
            mortgageKeys.push(mortgageData.loanAgreementNumber);
            SmartMortgage mortgage = new SmartMortgage(customer);
            mortgage.setData(mortgageData);
            mortgage.setRules(mortgageRules);
            mortgages[mortgageData.loanAgreementNumber] = mortgage;
        } else {
            mortgages[mortgageData.loanAgreementNumber].setData(mortgageData);
            mortgages[mortgageData.loanAgreementNumber].setRules(mortgageRules);
        }
    }

    function getAllCustomers() public view returns (Customer[] memory) {
        Customer[] memory result = new Customer[](customerKeys.length);
        for (uint i = 0; i < customerKeys.length; i++) {
            result[i] = customers[customerKeys[i]];
        }
        return result;
    }

    function getAllSmartMortgages() public view returns (SmartMortgage[] memory) {
        SmartMortgage[] memory result = new SmartMortgage[](mortgageKeys.length);
        for (uint i = 0; i < mortgageKeys.length; i++) {
            result[i] = mortgages[mortgageKeys[i]];
        }
        return result;
    }
}
