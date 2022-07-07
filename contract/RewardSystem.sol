// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.7;
pragma experimental ABIEncoderV2;

// we can use default available ownable solidity
// import "@openzeppelin/contracts/access/Ownable.sol"


contract RewardSystem {

    struct transactionData {
        string firstName;
        string lastName;
        string emailAddress;
        string message;
        uint256 weiAmount;
        address sender;
    }
    
    transactionData[] public transcationDetails;
    //add the keyword payable to the state variable 
    address owner;
    
    //set the owner to the msg.sender 
    constructor () public { 
        owner = msg.sender; 
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "This operation only performed by owner");
        _;
    }

    function getOwner() public view returns (address ownerAddr) {
        return owner;
    }
   
    function getOwnerBalance() public view returns (uint256 balance) {
        return owner.balance;
    }

    // event will trigger when someone do transcation.
    event transanctionDone(string, string, string, string, uint256, address);

    function sendReward(string memory _firstName, 
                        string memory _lastName, 
                        string memory _email, 
                        string memory _message, 
                        uint256 _wei) public returns (bool success, string memory err_msg) {

        // check for enough balance is present into sender account
        // we can use msg.sender.balance or address(this).balance
        if (msg.sender.balance > _wei) {
          return (false, "Insufficient fund to transfer");
        }

        // Transfer wei amount to owner
        bool result = transferAmount(_wei);
        
        if (result) {
            // On success store data into local datastore.
            transactionData memory transcation_data;
            transcation_data.firstName = _firstName;
            transcation_data.lastName = _lastName;
            transcation_data.emailAddress = _email;
            transcation_data.message = _message;
            transcation_data.weiAmount = _wei;
            transcation_data.sender = msg.sender;
            emit transanctionDone(_firstName, _lastName, _email, _message, _wei, msg.sender);
            return (true, "Successfully sent ether reward");
        } else {
            return (false, "Transanction failed please do retry...");
        }

    }

    function transferAmount(uint256 amount) public payable onlyOwner returns (bool) {
        // Try can only be used with external function calls and contract creation calls
        // try contract_func_call()  returns (uint v) {
        //     return true;
        // } catch Error(string memory reason) {
        //     // This is executed in case
        //     // revert was called inside getData
        //     // and a reason string was provided.
        //     return false;
        // }
        payable(msg.sender).transfer(amount);
        return true;
    }

    /// reclaim the leftover funds.
    function reclaimLeftOverFund() external onlyOwner {
        payable(msg.sender);
    }

    /// destroy the contract and reclaim the leftover funds.
    function shutdown() external onlyOwner {
        selfdestruct(payable(msg.sender));
    }
}
