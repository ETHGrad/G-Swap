const Token = artifacts.require("Token")
const Swap = artifacts.require("Swap")
require('chai')
  .use(require('chai-as-promised'))
  .should()


function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract("Swap", ([deployer, investor]) => {

  let token, swap
  before(async () => {
    token = await Token.new()
    swap = await Swap.new(token.address)
    await token.transfer(swap.address, tokens('1000000'))
  })


  describe('token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, "ETHGrad")
    })
  })

  describe('swap deployment', async () => {
    it('contract has a name', async () => {
      const name = await swap.name()
      assert.equal(name, "GRD-ETH swap instant exchange")
    })
    it("contract has tokens", async () => {
      let balance = await token.balanceOf(swap.address)
      assert.equal(balance.toString(),tokens('1000000'))
    })
  })

  describe('buyTokens()', async () => {
      
    let result
    before(async () => {
      result = await swap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('allows user to purchase tokens at a fixed price', async () => {
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100')) 
    })
  })

})
