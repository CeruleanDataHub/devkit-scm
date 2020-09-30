pragma solidity >=0.4.22 <0.7.0;

import './DevkitFactory.sol';

contract Devkit {
    struct Component {
        bytes32 componentId;
        bytes32 componentName;
        bytes32 manufacturer;
        bytes32 supplier;
    }

    bytes32 public id;
    bytes32 public name;
    uint256 public date;
    address public devkit;
    address public factory;
    Component[] public components;

    constructor(bytes32 _id, bytes32 _name, address _factory) public {
        id = _id;
        name = _name;
        date = now;
        factory = _factory;
        devkit = address(this);
    }

    function callComponents(bytes32 _componentId) public {
        DevkitFactory devkitFactory = DevkitFactory(factory);
        devkitFactory.setComponent(_componentId, address(this));
    } 

    function getComponents()
        external
        view
        returns (
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory,
            bytes32[] memory
        )
    {
        bytes32[] memory componentId = new bytes32[](components.length);
        bytes32[] memory componentName = new bytes32[](components.length);
        bytes32[] memory manufacturer = new bytes32[](components.length);
        bytes32[] memory supplier = new bytes32[](components.length);

        for (uint256 i = 0; i < components.length; i++) {
            componentId[i] = components[i].componentId;
            componentName[i] = components[i].componentName;
            manufacturer[i] = components[i].manufacturer;
            supplier[i] = components[i].supplier;
        }

        return (componentId, componentName, manufacturer, supplier);
    }

    function addComponent(
        bytes32 componentId,
        bytes32 componentName,
        bytes32 manufacturer,
        bytes32 supplier
    ) public {
        components.push(
            Component(componentId, componentName, manufacturer, supplier)
        );

        callComponents(componentId);
    }

    function getBasicInfo()
        public
        view
        returns (
            bytes32,
            bytes32,
            uint256,
            address
        )
    {
        return (id, name, date, devkit);
    }
}
