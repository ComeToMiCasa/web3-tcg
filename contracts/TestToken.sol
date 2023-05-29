pragma solidity ^0.8.0;

import "../node_modules/@OpenZeppelin/contracts/token/ERC20/ERC20.sol";

contract Test is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Test", "TERC") {
        _mint(0x1Dc3E4966a3A0Da1C5aD0De427564745a9890B9D, initialSupply);
        _mint(0x1Dc3E4966a3A0Da1C5aD0De427564745a9890B9D, initialSupply);
        _mint(0x1Dc3E4966a3A0Da1C5aD0De427564745a9890B9D, initialSupply);
        _transfer(0x1Dc3E4966a3A0Da1C5aD0De427564745a9890B9D, 0x9820b61617E79A86278445f190852C75bEac30F5, initialSupply);
    }
}