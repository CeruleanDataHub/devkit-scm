pragma solidity >=0.4.22 <0.7.0;

import './Devkit.sol';

contract DevkitFactory {
    mapping(bytes32 => address) public addresses;
    mapping(bytes32 => address) public components;

    function setComponent(bytes32 _componentId, address _address) public {
        components[_componentId] = _address;
    }

    function createDevkit(bytes32 id, bytes32 name) public {
        require(addresses[id] == address(0x0), "Duplicate ID");

        address newDevkit = address(new Devkit(id, name, address(this)));
        addresses[id] = newDevkit;
    }
}
