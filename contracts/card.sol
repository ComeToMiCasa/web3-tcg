// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CardDB {

    mapping(address => mapping(string => uint16)) public userInventory;

    // function maketoken(address wallet1, uint16 amount) external {
    //     token.mint(wallet1, amount);
    // }

    // function movetoken(address wallet1, address wallet2, uint16 amount) external{
    //     token.transferFrom(wallet1, wallet2, amount);
    // }

    // function seetoken(address wallet1) external view returns (uint256) {
    //     return token.balanceOf(wallet1);
    // }


    function updateCard(
        address wallet, 
        string memory cardID, 
        uint16 amount, 
        bool isAdd
    ) internal  
    {
        if(isAdd == true) {
            userInventory[wallet][cardID] += amount;
        } else {
            userInventory[wallet][cardID] -= amount;
        }
    }

    function addCard(
        address wallet, 
        string memory cardID, 
        uint16 amount
    ) external 
    {
        updateCard(wallet, cardID, amount, true);
    }

    function handleTrade(
        address seller,
        address buyer,
        string memory cardID,
        uint16 amount
    ) external 
    {
        updateCard(seller, cardID, amount, false);
        updateCard(buyer, cardID, amount, true);
    }

    function getUserDB(
        address wallet,
        string[] memory idList 
    ) external view returns (uint16[] memory) {
        uint16[] memory res = new uint16[](idList.length);

        for(uint16 i = 0; i < idList.length; i++) {
            res[i] = userInventory[wallet][idList[i]];
        }

        return res;
    }
}