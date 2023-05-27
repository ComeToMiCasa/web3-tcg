// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract userDB {

    mapping(address => mapping(string => uint16)) public userInventory;

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
        address fromWallet,
        address toWallet,
        string memory cardID,
        uint16 amount
    ) external 
    {
        updateCard(fromWallet, cardID, amount, false);
        updateCard(toWallet, cardID, amount, true);
    }
}
