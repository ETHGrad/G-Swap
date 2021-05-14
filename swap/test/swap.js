const Token = artifacts.require("Token")
const Swap = artifacts.require("Swap")
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("Swap", (accounts) => {
  describe('swap deployment', async () => {
    it('contract has a name', async () => {
      let swap = await Swap.new()
      const name = await swap.name()
      assert.equal(name, "GRD-ETH swap instant exchange")
    })
  })
})
