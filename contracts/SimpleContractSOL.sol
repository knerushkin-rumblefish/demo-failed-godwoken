/* NOTE The base code is copy from: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c789941d76dd713333bdeafe5b4484f6d9543c4e/contracts/token/ERC20/ERC20.sol */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

struct ArrayAndNumber {
  address[] structAddress;
  uint256 latest_change;
}

interface IStupidContract {
  function publicAddresses(uint256 index) external view returns (address);
  function getAddress(uint256 index) external view returns (address);
  function getStructFromMapping(address searchedAddress) external view returns (ArrayAndNumber memory);
}

contract SimpleContractSOL {

  function getStupidAddress(address stupidContract, uint256 index) public view returns (address) {
    
    return IStupidContract(stupidContract).getAddress(index);
  }

  function getStupidPublicAddress(address stupidContract, uint256 index) public view returns (address) {
    
    return IStupidContract(stupidContract).publicAddresses(index);
  }

  function getStupidStruct(address stupidContract, address searchedAddress) public view returns (ArrayAndNumber memory) {
    
    return IStupidContract(stupidContract).getStructFromMapping(searchedAddress);
  }
}