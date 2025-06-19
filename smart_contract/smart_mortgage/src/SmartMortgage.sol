pragma solidity ^0.8.28;

import "./Customer.sol";

struct SmartMortgageData {
    string loanAgreementNumber;
    string mortgageIssueDate;
    string mortgageMaturityDate;
    uint256 mortgageBalanceEUR;
    uint256 monthlyMortgagePaymentEUR;
    string paymentDiscipline;
    string guarantor;
    string lastDataUpdateDate;
    string note;
}

struct SmartMortgageRules {
    bool checkAge;
}

contract SmartMortgage {
    Customer public immutable customer;
    SmartMortgageData private data;
    SmartMortgageRules private rules;

    constructor(Customer _customer) {
        customer = _customer;
    }

    function getData() public view returns (SmartMortgageData memory) {
        return data;
    }

    function setData(SmartMortgageData memory _data) public {
        data = _data;
    }

    function getRules() public view returns (SmartMortgageRules memory) {
        return rules;
    }

    function setRules(SmartMortgageRules memory _rules) public {
        rules = _rules;
    }
}
