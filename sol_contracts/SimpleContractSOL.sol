/* NOTE The base code is copy from: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c789941d76dd713333bdeafe5b4484f6d9543c4e/contracts/token/ERC20/ERC20.sol */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

struct ArrayAndNumber {
  address[] structAddress;
  uint256 latest_change;
}

interface IStupidContract {
  function publicAddresses(uint256 index) external view returns (address);
  function fixedSizeArray(uint256 index) external view returns (address);
  function getAddress(uint256 index) external view returns (address);
  function getStructFromMapping(address searchedAddress) external view returns (ArrayAndNumber memory);
}

contract SimpleContractSOL {

  struct AddressData {
      address[10] addresses;
      uint256 latest_update;
  }

  mapping(address => AddressData) public simple_data;

  function getStupidAddress(address stupidContract, uint256 index) public view returns (address) {
    
    return IStupidContract(stupidContract).getAddress(index);
  }

  function getStupidPublicAddress(address stupidContract, uint256 index) public view returns (address) {
    
    return IStupidContract(stupidContract).publicAddresses(index);
  }

  function getStupidStruct(address stupidContract, address searchedAddress) public view returns (ArrayAndNumber memory) {
    
    return IStupidContract(stupidContract).getStructFromMapping(searchedAddress);
  }

  function getStupidFixedSizeArrayAddress(address stupidContract, uint256 index) external view returns (address) {
    return IStupidContract(stupidContract).fixedSizeArray(index);
  }

  function getStupidFixedSizeArrayAddresses(
    address stupidContract,
    uint256 nCoins
  ) external view returns (address[10] memory) {
    address[10] memory address_list = [
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0)
    ];
    
    for (uint256 i = 0; i < 10; i++) {
      if (i == nCoins) {
        break;
      }
      address_list[i] = IStupidContract(stupidContract).fixedSizeArray(i);
      // address_list[i] = stupidContract;
    }

    return address_list;
  }

  function updateStupidFixedSizeArrayAddresses(
    address stupidContract,
    uint256 nCoins
  ) external returns (address[10] memory) {
    address[10] memory address_list = [
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0),
      address(0)
    ];
    
    for (uint256 i = 0; i < 10; i++) {
      if (i == nCoins) {
        break;
      }
      address fromFixedSizeArray = IStupidContract(stupidContract).fixedSizeArray(i);
      address_list[i] = fromFixedSizeArray;

      simple_data[stupidContract].addresses[i] = fromFixedSizeArray;
      // address_list[i] = stupidContract;
    }

    simple_data[stupidContract].latest_update = block.timestamp;

    return address_list;
  }

  function getSimpleData(address stupidContract) external view returns (address[10] memory) {
    return simple_data[stupidContract].addresses;
  }
}
