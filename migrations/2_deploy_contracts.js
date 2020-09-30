const Devkit = artifacts.require('Devkit')
const DevkitFactory = artifacts.require('DevkitFactory')

const idHex = '0x736f6d652d6964'
const nameHex = '0x736f6d652d6e616d65'

module.exports = function (deployer, network) {
  if (network == 'development') {
    deployer.deploy(DevkitFactory).then(function () {
      return deployer.deploy(Devkit, idHex, nameHex, DevkitFactory.address)
    })
  } else {
    deployer.deploy(DevkitFactory)
  }
}
