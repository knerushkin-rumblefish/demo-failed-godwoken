# @version 0.2.12

MAX_COINS: constant(int128) = 8

struct ArrayAndNumber:
  latest_change: uint256
  structAddress: address[MAX_COINS]

structMapping: public(HashMap[address, ArrayAndNumber])

addresses: address[65536]
addressesLength: uint256


publicAddresses: public(address[65536])
publicAddressesLength: uint256

@external
def add0AddressWithAddressesInit(contract: address):
  self.addresses[0] = contract

@external
def add0AddressNoAddressesInit(contract: address):
  self.addresses[0] = contract

@external
def pushAddress(newAddress: address):
  length: uint256 = self.addressesLength
  self.addresses[0] = newAddress

  self.addressesLength = length + 1

@external
def addPublicAddress(newAddress: address):
  self.publicAddresses[0] = newAddress
  
@external
def pushPublicAddress(newAddress: address):
  length: uint256 = self.publicAddressesLength
  self.publicAddresses[length] = newAddress

  self.publicAddressesLength = length + 1

@view
@external
def getAddress(index: uint256) -> address:
  return self.addresses[index]

@view
@external
def getAddressesLength() -> uint256:
  return self.addressesLength

@view
@external
def getPublicAddressesLength() -> uint256:
  return self.publicAddressesLength
