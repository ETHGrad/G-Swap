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

      let swapBalance
      swapBalance = await token.balanceOf(swap.address)
      assert.equal(swapBalance.toString(), tokens('999900'))
      swapBalance = await web3.eth.getBalance(swap.address)
      assert.equal(swapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
      
    })
  })

  describe('buyTokens()', async () => {
      
    let result
    before(async () => {
      await token.approve(swap.address, tokens('100'), { from: investor })
      result = await swap.sellTokens(tokens('100'), { from: investor })
    })

    it('allows user to sell tokens at a fixed price', async () => {
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(),tokens('0'))

      let swapBalance
      swapBalance = await token.balanceOf(swap.address)
      assert.equal(swapBalance.toString(), tokens('1000000'))
      swapBalance = await web3.eth.getBalance(swap.address)
      assert.equal(swapBalance.toString(), web3.utils.toWei('0', 'Ether'))


      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })


})
