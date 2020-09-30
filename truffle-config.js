require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    loc_development_development: {
      network_id: '*',
      port: 8545,
      host: '127.0.0.1',
    },
    abs_cdh_cdhblockchain_cdhblockchain: {
      network_id: '*',
      gasPrice: 0,
      provider: new HDWalletProvider(
        process.env.SEED_PHRASE,
        process.env.CONNECTION_STRING
      ),
    },
  },
}
