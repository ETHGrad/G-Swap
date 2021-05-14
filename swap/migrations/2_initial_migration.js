const Token = artifacts.require("Token");

const Swap = artifacts.require("Swap");

module.exports = async function(deployer) {
  //deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // deploy Swap
  await deployer.deploy(Swap, token.address)
  const swap = await Swap.deployed()


  // transfer all tokens to Swap
  await token.transfer(swap.address, "1000000000000000000000000")
};
