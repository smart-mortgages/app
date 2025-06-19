pragma solidity ^0.8.28;

import "./Customer.sol";
import "./SmartMortgage.sol";

contract SmartMortgageManager {
    mapping(string => Customer) private customers;
    string[] private customerKeys;
    mapping(string => SmartMortgage) private mortgages;
    string[] private mortgageKeys;

    function saveCustomer(CustomerData memory customerData) public {
        if (address(customers[customerData.personalIdNumber]) == address(0)) {
            customerKeys.push(customerData.personalIdNumber);
            Customer customer = new Customer();
            customer.setData(customerData);
            customers[customerData.personalIdNumber] = customer;
        } else {
            customers[customerData.personalIdNumber].setData(customerData);
        }
    }

    function saveSmartMortgage(
        string memory customerPersonalIdNumber,
        SmartMortgageData memory mortgageData,
        SmartMortgageRules memory mortgageRules
    ) public {
        Customer customer = customers[customerPersonalIdNumber];
        require(address(customer) != address(0), "Customer does not exist");

        if (address(mortgages[mortgageData.loanAgreementNumber]) == address(0)) {
            mortgageKeys.push(mortgageData.loanAgreementNumber);
            SmartMortgage mortgage = new SmartMortgage(address(customer));
            mortgage.setData(mortgageData);
            mortgage.setRules(mortgageRules);
            mortgages[mortgageData.loanAgreementNumber] = mortgage;
        } else {
            mortgages[mortgageData.loanAgreementNumber].setData(mortgageData);
            mortgages[mortgageData.loanAgreementNumber].setRules(mortgageRules);
        }
    }

    function getAllCustomers() public view returns (address[] memory) {
        address[] memory result = new address[](customerKeys.length);
        for (uint i = 0; i < customerKeys.length; i++) {
            result[i] = address(customers[customerKeys[i]]);
        }
        return result;
    }

    function getAllSmartMortgages() public view returns (address[] memory) {
        address[] memory result = new address[](mortgageKeys.length);
        for (uint i = 0; i < mortgageKeys.length; i++) {
            result[i] = address(mortgages[mortgageKeys[i]]);
        }
        return result;
    }
}
