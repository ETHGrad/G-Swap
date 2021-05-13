const Token = artifacts.require("Token");

const Swap = artifacts.require("Swap");

module.exports = function(deployer) {
  //deploy token
  deployer.deploy(Token);

  // deploy Swap
  // deployer.deploy(Swap)
};
