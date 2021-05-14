pragma solidity ^0.5.0;

import "./Token.sol";

contract Swap {
    string public name = "GRD-ETH swap instant exchange";    
    Token public token;
    uint public rate = 100;
    
    event tokenPurchased(
      address account,
      address token, 
      uint amount,
      uint rate
    );

    constructor(Token _token) public {
      token = _token;
    }

    function buyTokens() public payable {
      uint tokenamount = msg.value * rate;
      require(token.balanceOf(address(this)) >= tokenamount);
      token.transfer(msg.sender, tokenamount);

      emit tokenPurchased(msg.sender, address(token), tokenamount, rate);
    }
}
