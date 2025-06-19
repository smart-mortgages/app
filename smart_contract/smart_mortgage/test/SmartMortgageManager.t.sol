// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "../src/SmartMortgageManager.sol";
import "../src/Customer.sol";
import {Test, console} from "forge-std/Test.sol";

contract SmartMortgageManagerTest is Test {
    SmartMortgageManager public manager;

    function setUp() public {
        manager = new SmartMortgageManager();
    }

    function test_creation() public {
        CustomerData memory customerData = CustomerData({
            firstName: "Jan",
            lastName: "Novak",
            personalIdNumber: "850115/1234",
            dateOfBirth: "15/01/1985",
            _address: "Praha 4, Ulice 1",
            phoneNumber: "602123456",
            email: "jan.novak@email.cz",
            documentType: "OP",
            documentNumber: "123456789",
            accountNumber: "123456789/0800",
            accountCurrency: "EUR",
            transactionCount: 15,
            iban: "CZ650800000000123456789",
            accountOpeningDate: "10/03/2010",
            accountStatus: "Aktivni",
            accountBalanceEUR: 2949,
            monthlyIncomeEUR: 2039,
            standingOrdersCount: 3,
            lastDataUpdateDate: "1/06/2025"
        });

        SmartMortgageData memory mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2021-0112",
            mortgageIssueDate: "1/04/2021",
            mortgageMaturityDate: "1/04/2041",
            mortgageBalanceEUR: 98039,
            monthlyMortgagePaymentEUR: 490,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: "VIP klient"
        });

        SmartMortgageRules memory mortgageRules = SmartMortgageRules({checkAge: true});

        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.documentNumber, mortgageData, mortgageRules);
    }
}
