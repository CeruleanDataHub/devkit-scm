const Devkit = artifacts.require('Devkit')
const DevkitFactory = artifacts.require('DevkitFactory')

contract('Devkit', (accounts) => {
  let contract
  let componentIdStub

  before(async () => {
    contract = await Devkit.deployed()
    componentIdStub = toPaddedHex('some-component-id')
  })

  describe('initially', () => {
    let idStub
    let nameStub

    before(async () => {
      idStub = toPaddedHex('some-id')
      nameStub = toPaddedHex('some-name')
    })

    it('sets id', async () => {
      const actual = await contract.id()

      assert.equal(actual, idStub)
    })

    it('sets name', async () => {
      const actual = await contract.name()

      assert.equal(actual, nameStub)
    })

    it('sets date', async () => {
      const dateBN = await contract.date()

      const timestamp = dateBN.toNumber()

      assert(isValidDate(timestamp))
    })

    it('sets address', async () => {
      const actual = await contract.devkit()

      assert(isValidAddress(actual))
    })

    it('sets factory address', async () => {
      const actual = await contract.factory()

      assert(isValidAddress(actual))
    })

    it('when calling for devkit basic info, returns correct data', async () => {
      const basicInfo = await contract.getBasicInfo()

      assert.include(basicInfo, {
        0: idStub,
        1: nameStub,
      })
      assert(isValidDate(basicInfo[2].toNumber()))
      assert(isValidAddress(basicInfo[3]))
    })
  })

  describe('given two components are added', () => {
    let someComponentId
    let someComponentName
    let someManufacturer
    let someSupplier
    let otherComponentId
    let otherComponentName
    let otherManufacturer
    let otherSupplier

    before(async () => {
      someComponentId = testComponents[0].componentIdHex
      someComponentName = testComponents[0].componentNameHex
      someManufacturer = testComponents[0].manufacturerHex
      someSupplier = testComponents[0].supplierHex
      otherComponentId = testComponents[1].componentIdHex
      otherComponentName = testComponents[1].componentNameHex
      otherManufacturer = testComponents[1].manufacturerHex
      otherSupplier = testComponents[1].supplierHex

      await contract.addComponent(
        someComponentId,
        someComponentName,
        someManufacturer,
        someSupplier
      )

      await contract.addComponent(
        otherComponentId,
        otherComponentName,
        otherManufacturer,
        otherSupplier
      )
    })

    it('when calling for first component, returns correct component', async () => {
      const component = await contract.components(0)

      assert.include(component, {
        componentId: someComponentId,
        componentName: someComponentName,
        manufacturer: someManufacturer,
        supplier: someSupplier,
      })
    })

    it('when calling for all components, returns all components', async () => {
      const components = await contract.getComponents()

      assert.deepEqual(components, {
        0: [someComponentId, otherComponentId],
        1: [someComponentName, otherComponentName],
        2: [someManufacturer, otherManufacturer],
        3: [someSupplier, otherSupplier],
      })
    })

    describe('given factory contract', () => {
      let factoryContract

      before(async () => {
        factoryContract = await DevkitFactory.deployed()
      })

      it('when calling for first component, address is mapped correctly', async () => {
        const actual = await factoryContract.components(someComponentId)

        assert.equal(actual, contract.address)
      })

      it('when calling for second component, address is mapped correctly', async () => {
        const actual = await factoryContract.components(otherComponentId)

        assert.equal(actual, contract.address)
      })

      it('when callComponents is called, maps component id to correct address', async () => {
        await contract.callComponents(componentIdStub)

        const actual = await factoryContract.components(componentIdStub)
        assert.equal(actual, contract.address)
      })
    })
  })
})

const isValidAddress = (address) => {
  return (
    web3.utils.isAddress(address) &&
    address !== '0x0000000000000000000000000000000000000000'
  )
}

const isValidDate = (timestamp) => timestamp !== 0 && timestamp > 1594700000

const toPaddedHex = (value) =>
  web3.utils.padRight(web3.utils.utf8ToHex(value), 64)

const testComponents = [
  {
    componentIdHex: toPaddedHex('some-id'),
    componentNameHex: toPaddedHex('some-component'),
    manufacturerHex: toPaddedHex('some-manufacturer'),
    supplierHex: toPaddedHex('some-supplier'),
  },
  {
    componentIdHex: toPaddedHex('some-other-id'),
    componentNameHex: toPaddedHex('some-other-component'),
    manufacturerHex: toPaddedHex('some-other-manufacturer'),
    supplierHex: toPaddedHex('some-other-supplier'),
  },
]
