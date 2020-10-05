## Devkit Supply Chain Management
Devkit-scm is decentralised way of handling supply chain management of physical Development Kits (Devkits) that contain IoT devices such as sensors and bridge devices. Devkits are intended to use with Cerulean Data Hub IoT Platform. Devkit-scm keeps track of all the Devkits in circulation,information about the Devkits and the components it contains.

## Motivation
The project aims to showcase how blockchain technology can be used with Cerulean Data Hub. When Devkits and its components are added to immutable and decentralised database (Quorum), the owners of the Devkits can be sure which components belongs to their Devkit as well as be certain about the supply chain of the components. In addition, if a components breaks, its manufacturer and supplier are known so the component can be replaced or fixed.  
 
## Tech/framework used
- Smart contracts are written in Solidity.
- Truffle is used to build, deploy and test the smart contracts.
- Testing framework Mocha is used with assertion library Chai.

## Tests
There's two ways to run the test: Truffle Develop and Ganache-CLI. Complete the prerequisites first, then choose which way you want to run the tests.

### Prerequisites
* Download and install the latest LTS of NodeJS.
* Install Truffle.js on your machine globally via NPM with a `npm install -g truffle`.
* Create .env file to the project root and copy the content of env.example to it (seed phrase  in the env.example file is randomly generated and it should not be used in production).
* Install dependencies with `npm install`. 

#### Run the tests with Truffle Develop
* In the project root start Truffle's development console with a `truffle develop`.
* Run tests in the truffle develop console with a `test --network truffle_develop`.

#### Run the test with Ganache-CLI
* Install Ganache-CLI on your machine globally via NPM with a `npm install -g ganache-cli`.
* Start ganache in a terminal windown with a command `ganache-cli`.
* In a new terminal window, go to the project root and run the tests with a `truffle test --network development`.
