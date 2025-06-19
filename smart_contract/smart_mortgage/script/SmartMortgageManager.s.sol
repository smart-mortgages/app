// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import "../src/SmartMortgageManager.sol";

contract SmartMortgageManagerScript is Script {
    SmartMortgageManager public manager;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        manager = new SmartMortgageManager();

        SmartMortgageRules memory mortgageRules = SmartMortgageRules({
            checkAccount: true,
            checkBalance: true,
            checkTxCount: true
        });

        // Customer 1: Jan Novak
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
            mortgageBalanceEUR: - 98039,
            monthlyMortgagePaymentEUR: 490,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: "VIP klient"
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 2: Petra Svobodova
        customerData = CustomerData({
            firstName: "Petra",
            lastName: "Svobodova",
            personalIdNumber: "925521/5678",
            dateOfBirth: "21/05/1992",
            _address: "Brno, Ulice 2",
            phoneNumber: "603234567",
            email: "petra.svobodova@email.cz",
            documentType: "OP",
            documentNumber: "234567890",
            accountNumber: "987654321/0100",
            accountCurrency: "CZK",
            transactionCount: 5,
            iban: "CZ120100000000987654321",
            accountOpeningDate: "22/06/2015",
            accountStatus: "Aktivni",
            accountBalanceEUR: 4727,
            monthlyIncomeEUR: 2490,
            standingOrdersCount: 5,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2022-0543",
            mortgageIssueDate: "15/08/2022",
            mortgageMaturityDate: "15/08/2042",
            mortgageBalanceEUR: - 123529,
            monthlyMortgagePaymentEUR: 617,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ano",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 3: Tomas Dvorak  
        customerData = CustomerData({
            firstName: "Tomas",
            lastName: "Dvorak",
            personalIdNumber: "881102/9012",
            dateOfBirth: "2/11/1988",
            _address: "Ostrava, Ulice 3",
            phoneNumber: "604345678",
            email: "tomas.dvorak@email.cz",
            documentType: "OP",
            documentNumber: "345678901",
            accountNumber: "234567890/0300",
            accountCurrency: "AUD",
            transactionCount: 20,
            iban: "CZ030300000000234567890",
            accountOpeningDate: "14/09/2012",
            accountStatus: "Aktivni",
            accountBalanceEUR: 1796,
            monthlyIncomeEUR: 1607,
            standingOrdersCount: 2,
            lastDataUpdateDate: "15/05/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2020-0987",
            mortgageIssueDate: "10/02/2020",
            mortgageMaturityDate: "10/02/2040",
            mortgageBalanceEUR: - 70588,
            monthlyMortgagePaymentEUR: 352,
            paymentDiscipline: "Po splatnosti",
            guarantor: "Ne",
            lastDataUpdateDate: "15/05/2025",
            note: "Upominka"
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 4: Eva Cerna
        customerData = CustomerData({
            firstName: "Eva",
            lastName: "Cerna",
            personalIdNumber: "956211/3456",
            dateOfBirth: "11/06/1995",
            _address: "Plzen, Ulice 4",
            phoneNumber: "605456789",
            email: "eva.cerna@email.cz",
            documentType: "OP",
            documentNumber: "456789012",
            accountNumber: "876543210/0600",
            accountCurrency: "EUR",
            transactionCount: 0,
            iban: "CZ060600000000876543210",
            accountOpeningDate: "30/01/2019",
            accountStatus: "Aktivni",
            accountBalanceEUR: 8239,
            monthlyIncomeEUR: 2941,
            standingOrdersCount: 4,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2023-0234",
            mortgageIssueDate: "20/03/2023",
            mortgageMaturityDate: "20/03/2043",
            mortgageBalanceEUR: - 164705,
            monthlyMortgagePaymentEUR: 823,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 5: Martin Prochazka
        customerData = CustomerData({
            firstName: "Martin",
            lastName: "Prochazka",
            personalIdNumber: "820325/7890",
            dateOfBirth: "25/03/1982",
            _address: "Liberec, Ulice 5",
            phoneNumber: "606567890",
            email: "martin.prochazka@email.cz",
            documentType: "OP",
            documentNumber: "567890123",
            accountNumber: "345678901/2700",
            accountCurrency: "EUR",
            transactionCount: 12,
            iban: "CZ272700000000345678901",
            accountOpeningDate: "18/08/2007",
            accountStatus: "Aktivni",
            accountBalanceEUR: 3515,
            monthlyIncomeEUR: 1901,
            standingOrdersCount: 1,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2019-1122",
            mortgageIssueDate: "5/06/2019",
            mortgageMaturityDate: "5/06/2039",
            mortgageBalanceEUR: - 37254,
            monthlyMortgagePaymentEUR: 186,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 6: Lucie Kucerova
        customerData = CustomerData({
            firstName: "Lucie",
            lastName: "Kucerova",
            personalIdNumber: "905918/2345",
            dateOfBirth: "18/09/1990",
            _address: "Hradec Kralove, Ulice 6",
            phoneNumber: "607678901",
            email: "lucie.kucerova@email.cz",
            documentType: "OP",
            documentNumber: "678901234",
            accountNumber: "765432109/5500",
            accountCurrency: "EUR",
            transactionCount: 3,
            iban: "CZ555500000000765432109",
            accountOpeningDate: "7/05/2016",
            accountStatus: "Aktivni",
            accountBalanceEUR: 5894,
            monthlyIncomeEUR: 2196,
            standingOrdersCount: 2,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2021-7654",
            mortgageIssueDate: "12/11/2021",
            mortgageMaturityDate: "12/11/2041",
            mortgageBalanceEUR: - 116862,
            monthlyMortgagePaymentEUR: 584,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 7: Pavel Vesely
        customerData = CustomerData({
            firstName: "Pavel",
            lastName: "Vesely",
            personalIdNumber: "860808/6789",
            dateOfBirth: "8/08/1986",
            _address: "Olomouc, Ulice 7",
            phoneNumber: "608789012",
            email: "pavel.vesely@email.cz",
            documentType: "OP",
            documentNumber: "789012345",
            accountNumber: "456789012/0800",
            accountCurrency: "CZK",
            transactionCount: 300,
            iban: "CZ080800000000456789012",
            accountOpeningDate: "3/12/2011",
            accountStatus: "Aktivni",
            accountBalanceEUR: 2431,
            monthlyIncomeEUR: 1725,
            standingOrdersCount: 3,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2022-3344",
            mortgageIssueDate: "18/09/2022",
            mortgageMaturityDate: "18/09/2042",
            mortgageBalanceEUR: - 137254,
            monthlyMortgagePaymentEUR: 686,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ano",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 8: Veronika Horakova  
        customerData = CustomerData({
            firstName: "Veronika",
            lastName: "Horakova",
            personalIdNumber: "935403/1230",
            dateOfBirth: "3/04/1993",
            _address: "Zlin, Ulice 8",
            phoneNumber: "609890123",
            email: "veronika.horakova@email.cz",
            documentType: "OP",
            documentNumber: "890123456",
            accountNumber: "654321098/0100",
            accountCurrency: "BTC",
            transactionCount: 666,
            iban: "CZ010100000000654321098",
            accountOpeningDate: "16/07/2018",
            accountStatus: "Aktivni",
            accountBalanceEUR: 12352,
            monthlyIncomeEUR: 2666,
            standingOrdersCount: 6,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2023-9988",
            mortgageIssueDate: "1/02/2023",
            mortgageMaturityDate: "1/02/2043",
            mortgageBalanceEUR: - 200000,
            monthlyMortgagePaymentEUR: 1000,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: "VIP klient"
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 9: Jiri Nemec
        customerData = CustomerData({
            firstName: "Jiri",
            lastName: "Nemec",
            personalIdNumber: "801230/4567",
            dateOfBirth: "30/12/1980",
            _address: "Pardubice, Ulice 9",
            phoneNumber: "602901234",
            email: "jiri.nemec@email.cz",
            documentType: "OP",
            documentNumber: "901234567",
            accountNumber: "567890123/0300",
            accountCurrency: "EUR",
            transactionCount: 13,
            iban: "CZ030300000000567890123",
            accountOpeningDate: "12/11/2005",
            accountStatus: "Aktivni",
            accountBalanceEUR: 741,
            monthlyIncomeEUR: 1490,
            standingOrdersCount: 1,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2018-5566",
            mortgageIssueDate: "27/05/2018",
            mortgageMaturityDate: "27/05/2038",
            mortgageBalanceEUR: - 29411,
            monthlyMortgagePaymentEUR: 147,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        // Customer 10: Katerina Markova
        customerData = CustomerData({
            firstName: "Katerina",
            lastName: "Markova",
            personalIdNumber: "916005/8901",
            dateOfBirth: "5/06/1991",
            _address: "Ceske Budejovice, Ulice 10",
            phoneNumber: "603012345",
            email: "katerina.markova@email.cz",
            documentType: "OP",
            documentNumber: "12345678",
            accountNumber: "543210987/0600",
            accountCurrency: "EUR",
            transactionCount: 7,
            iban: "CZ060600000000543210987",
            accountOpeningDate: "25/04/2017",
            accountStatus: "Aktivni",
            accountBalanceEUR: 3753,
            monthlyIncomeEUR: 2098,
            standingOrdersCount: 2,
            lastDataUpdateDate: "1/06/2025"
        });
        mortgageData = SmartMortgageData({
            loanAgreementNumber: "H-2020-2211",
            mortgageIssueDate: "10/10/2020",
            mortgageMaturityDate: "10/10/2040",
            mortgageBalanceEUR: - 82352,
            monthlyMortgagePaymentEUR: 411,
            paymentDiscipline: "Bezproblemova",
            guarantor: "Ne",
            lastDataUpdateDate: "1/06/2025",
            note: ""
        });
        manager.saveCustomer(customerData);
        manager.saveSmartMortgage(customerData.personalIdNumber, mortgageData, mortgageRules);

        console.log("Smart mortgage manager deployed at:", address(manager));

        vm.stopBroadcast();
    }
}