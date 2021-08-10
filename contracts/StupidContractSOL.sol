/* NOTE The base code is copy from: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c789941d76dd713333bdeafe5b4484f6d9543c4e/contracts/token/ERC20/ERC20.sol */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract StupidContractSOL {

  // Init/No Init for array
  address[] private  addresses;

  address[] public publicAddresses;

  // No Init for mapping
  mapping(address => address) public addressMapping;

  // Use Struct
  struct ArrayAndNumber {
    address[] structAddress;
    uint256 latest_change;
  }

  ArrayAndNumber[] structArray;

  mapping(address => ArrayAndNumber) public structMapping;

  function add0AddressWithAddressesInit(address newAddress) public {
    if(addresses.length == 0) {
      addresses = new address[](1);
    }

    addresses[0] = newAddress;
  }

  function add0AddressNoAddressesInit(address newAddress) public {
    addresses[0] = newAddress;
  }

  // Working even without internal init
  function pushAddress(address newAddress) public {
    addresses.push(newAddress);
  }

  function addPublicAddress(address newAddress) public {
    if(publicAddresses.length == 0) {
      publicAddresses = new address[](1);
    }
    publicAddresses[0] = newAddress;
  }

  function pushPublicAddress(address newAddress) public {
    publicAddresses.push(newAddress);
  }

  function getAddress(uint256 index) public view returns (address) {
    require(addresses.length > index, 'out of address array');

    return addresses[index];
  }

  function add0ToMappingNoInit(address newAddress, address oldAddress) public {
    addressMapping[oldAddress] = newAddress;
  }

  function getFromMappingWithoutInit(address searchedAddress) public view returns (address) {
    return addressMapping[searchedAddress];
  }

  function add0ToStuctToArrayNoStructInit(address addressToAdd) public {
    structArray[0].latest_change = block.timestamp;
    structArray[0].structAddress[0] = addressToAdd;
  }

  function add0ToStuctToArrayStructInit(address addressToAdd) public {
    address[] memory structAddressInit = new address[](1);
    structAddressInit[0] = addressToAdd;

    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: structAddressInit,
      latest_change: block.timestamp
    });

    structArray[0] = structInstance;
  }

  function add0ToStuctToArrayStructInitWithUpdate(address addressToAdd) public {
    address[] memory structAddressInit = new address[](1);
    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: structAddressInit,
      latest_change: block.timestamp
    });

    structArray[0] = structInstance;
    structArray[0].structAddress[0] = addressToAdd;
  }

  function createArrayWithInit(address addressToAdd) public pure returns (address[] memory) {

    address[] memory addressesToAdd = new address[](1);
    addressesToAdd[0] = addressToAdd;

    return addressesToAdd;
  }
  
  function createArrayNoInit(address addressToAdd) public pure returns (address[] memory) {

    address[] memory addressesToAdd;
    addressesToAdd[0] = addressToAdd;

    return addressesToAdd;
  }

  function createStruct(address addressToAdd) public view returns (address[] memory, uint256) {
    address[] memory structAddressesToAdd = new address[](1);
    structAddressesToAdd[0] = addressToAdd;

    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: structAddressesToAdd,
      latest_change: block.timestamp
    });

    return (structInstance.structAddress, structInstance.latest_change);
  }

  function createStructReturnStruct(address addressToAdd) public view returns (ArrayAndNumber memory) {
    address[] memory structAddressesToAdd = new address[](1);
    structAddressesToAdd[0] = addressToAdd;

    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: structAddressesToAdd,
      latest_change: block.timestamp
    });

    return structInstance;
  }

  function createEmptyStruct() public view returns (address[] memory, uint256) {
    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: new address[](1),
      latest_change: block.timestamp
    });

    return (structInstance.structAddress, structInstance.latest_change);
  }

  function createStructMappingAndModify1(address addressToAdd) public view  returns (ArrayAndNumber memory) {
    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: new address[](1),
      latest_change: block.timestamp
    });

    structInstance.latest_change = block.timestamp;
    structInstance.structAddress[0] = addressToAdd;

    return structInstance;
  }

  function createStructMappingAndModify2() public view  returns (ArrayAndNumber memory) {
    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: new address[](1),
      latest_change: block.timestamp
    });

    structInstance.latest_change = block.timestamp;

    return structInstance;
  }

  function addToStructMappingNoInit(address addressToAdd, address indexAddress) public {
    structMapping[indexAddress].latest_change = block.timestamp;
    structMapping[indexAddress].structAddress[0] = addressToAdd;
  }

  function addToStructMappingWithInit(address addressToAdd, address indexAddress) public {
    address[] memory structAddressesToAdd = new address[](1);
    structAddressesToAdd[0] = addressToAdd;

    ArrayAndNumber memory structInstance = ArrayAndNumber({
      structAddress: structAddressesToAdd,
      latest_change: block.timestamp
    });
    
    structMapping[indexAddress] = structInstance;
  }

  function getStructFromMapping(address searchedAddress) public view returns (ArrayAndNumber memory) {
    return structMapping[searchedAddress];
  }
}