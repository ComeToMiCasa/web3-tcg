// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function mint(address add, uint256 numTokens) external returns (bool);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
}


contract TCGtoken is IERC20 {

    string public constant name = "TCGtoken";
    string public constant symbol = "TCGT";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


    constructor() {
        balances[msg.sender] = totalSupply_;
    }
    
    function totalSupply() public override view returns (uint256) {
        return totalSupply_;
    }

    function mint(address add, uint256 numTokens) public override returns (bool) {
        balances[add] = balances[add] + numTokens * 10 ** decimals;
        return true;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 _numTokens) public override returns (bool) {
        uint256 numTokens = _numTokens * 10 ** decimals;
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function transferFrom(address owner, address buyer, uint256 _numTokens) public override returns (bool) {
        uint256 numTokens = _numTokens * 10 ** decimals;
        require(numTokens <= balances[owner]);
        balances[owner] = balances[owner]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
