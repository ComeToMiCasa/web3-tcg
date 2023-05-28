pragma solidity ^0.8.0;

import "../node_modules/@OpenZeppelin/contracts/token/ERC20/ERC20.sol";

contract Test is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Test", "TERC") {
        _mint(0x93bCA64241f29CF7aF2365B238c6C7a5066C72d7, initialSupply);
    }
}