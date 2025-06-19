pragma solidity ^0.8.28;

struct CustomerData {
    string firstName;
    string lastName;
    string personalIdNumber;
    string dateOfBirth;
    string _address;
    string phoneNumber;
    string email;
    string documentType;
    string documentNumber;
    string accountNumber;
    string accountCurrency;
    uint256 transactionCount;
    string iban;
    string accountOpeningDate;
    string accountStatus;
    int256 accountBalanceEUR;
    uint256 monthlyIncomeEUR;
    uint256 standingOrdersCount;
    string lastDataUpdateDate;
}

contract Customer {
    CustomerData private data;

    function getData() public view returns (CustomerData memory) {
        return data;
    }

    function setData(CustomerData memory _data) public {
        data = _data;
    }
}
