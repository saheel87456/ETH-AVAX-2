// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public goldLoanAmount;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event GoldLoanRequested(uint256 amount);
    event GoldLoanRepaid(uint256 amount);
    event GoldLoanForgiven();

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function requestGoldLoan(uint256 _loanAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(goldLoanAmount == 0, "You already have an outstanding gold loan");
        goldLoanAmount = _loanAmount;
        emit GoldLoanRequested(_loanAmount);
    }

    function payBackGoldLoan(uint256 _repaymentAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(goldLoanAmount > 0, "No outstanding gold loan to repay");
        goldLoanAmount -= _repaymentAmount;
        emit GoldLoanRepaid(_repaymentAmount);
    }

    function getGoldLoanAmount() public view returns(uint256) {
        return goldLoanAmount;
    }

    function forgiveGoldLoan() public {
        require(msg.sender == owner, "You are not the owner of this account");
        goldLoanAmount = 0;
        emit GoldLoanForgiven();
    }

    function modifyGoldLoan(uint256 _newLoanAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        goldLoanAmount = _newLoanAmount;
        emit GoldLoanRequested(_newLoanAmount);
    }
}
