pragma solidity ^0.8.28;

import "./Customer.sol";

struct SmartMortgageData {
    string loanAgreementNumber;
    string mortgageIssueDate;
    string mortgageMaturityDate;
    int256 mortgageBalanceEUR;
    uint256 monthlyMortgagePaymentEUR;
    string paymentDiscipline;
    string guarantor;
    string lastDataUpdateDate;
    string note;
}

struct SmartMortgageRules {
    bool checkAccount;
    bool checkBalance;
    bool checkTxCount;
}

contract SmartMortgage {
    address public customer;
    SmartMortgageData private data;
    SmartMortgageRules private rules;

    constructor(address _customer) {
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

    function getCustomerPersonalIdNumber() public view returns (string memory) {
        Customer c = Customer(customer);
        return c.getData().personalIdNumber;
    }

    function getInterestRate() public view returns (uint256) {
        Customer c = Customer(customer);
        uint256 interestRate = 440;

        if (rules.checkAccount) {
            if (keccak256(bytes(c.getData().accountCurrency)) == keccak256(bytes("EUR"))) {
                interestRate -= 20;
            }
        }
        if (rules.checkBalance) {
            if (c.getData().accountBalanceEUR >= 600) {
                interestRate -= 20;
            }
        }
        if (rules.checkTxCount) {
            if (c.getData().transactionCount >= 5) {
                interestRate -= 20;
            }
        }
        return interestRate;
    }
}
