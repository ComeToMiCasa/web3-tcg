pragma solidity ^0.8.0;

import "@OpenZeppelin/contracts/token/ERC20/ERC20.sol";

contract Test is ERC20 {
    constructor (uint256 initialSupply) public ERC20("Test", "TT") {
        _mint(msg.sender, initialSupply);
    }
}