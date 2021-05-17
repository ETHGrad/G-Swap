pragma solidity ^0.5.0;

import "./Token.sol";

contract Swap {
    string public name = "GRD-ETH swap instant exchange";    
    Token public token;
    uint public rate = 100;
    
    event tokensPurchased(
      address account,
      address token, 
      uint amount,
      uint rate
    );
    
    event tokensSold(
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
      emit tokensPurchased(msg.sender, address(token), tokenamount, rate);
    }

    function sellTokens(uint _amount) public {
      //user cant sell more tokens than they have
      require(token.balanceOf(msg.sender) >= _amount);

      //calculate the amount of ether to readeam
      uint etherAmount = _amount / rate;

      require(address(this).balance == etherAmount);

      //perform sale
      token.transferFrom(msg.sender, address(this), _amount);
      msg.sender.transfer(etherAmount);

      emit tokensSold(msg.sender, address(token), _amount, rate);
    }
}
