const DevkitFactory = artifacts.require('DevkitFactory')

contract('DevkitFactory', (accounts) => {
  let contract
  let idStub
  let nameStub
  let componentIdStub
  let addressStub

  before(async () => {
    contract = await DevkitFactory.deployed()
    idStub = toPaddedHex('some-id')
    nameStub = toPaddedHex('some-name')
    componentIdStub = toPaddedHex('some-component-id')
    addressStub = accounts[1]
  })

  it('when creating devkit, creates devkit', async () => {
    const actual = await contract.createDevkit(idStub, nameStub)

    assert(actual)
  })

  it('when calling for an address with a devkit id, knows default address', async () => {
    const actual = await contract.addresses(idStub)

    assert(isValidAddress(actual))
  })

  it('when setComponent is called, maps component ID to correct address', async () => {
    await contract.setComponent(componentIdStub, addressStub)

    const actual = await contract.components(componentIdStub)
    assert.equal(actual, addressStub)
  })

  describe('given there is a devkit', () => {
    let idStub
    let nameStub

    before(async () => {
      idStub = toPaddedHex('some-other-id')
      nameStub = toPaddedHex('some-other-name')

      await contract.createDevkit(idStub, nameStub)
    })

    it('when creating devkit with a duplicate id, throws', async () => {
      let errorMessage

      try {
        await contract.createDevkit(idStub, nameStub)
      } catch (error) {
        errorMessage = error.reason
      } finally {
        assert(
          errorMessage === 'Duplicate ID',
          'Did not throw error "Duplicate ID"'
        )
      }
    })
  })
})

const isValidAddress = (address) => {
  return (
    web3.utils.isAddress(address) &&
    address !== '0x0000000000000000000000000000000000000000'
  )
}

const toPaddedHex = (value) =>
  web3.utils.padRight(web3.utils.utf8ToHex(value), 64)
