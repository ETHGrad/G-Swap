pragma solidity ^0.5.0;

import "./Token.sol";

contract Swap {
    string public name = "GRD-ETH swap instant exchange";    
    Token public token;

    constructor(Token _token) public {
      token = _token;
    }
}
