# @version 0.2.12

MAX_COINS: constant(int128) = 10

interface IStupidContract:
  def publicAddresses(i: uint256) -> address: view
  def getAddress(i: uint256) -> address: view
  def fixedSizeArray(i: uint256) -> address: view

@view
@external
def getStupidAddress(stupidContract: address, index: uint256 ) -> address:
  
  return IStupidContract(stupidContract).getAddress(index)


@view
@external
def getStupidPublicAddress(stupidContract: address, index: uint256 ) -> address:
  
  return IStupidContract(stupidContract).publicAddresses(index)

@view
@external
def getStupidFixedSizeArrayAddress(stupidContract: address, index: uint256 ) -> address:
  
  return IStupidContract(stupidContract).fixedSizeArray(index)

@view
@external
def getStupidFixedSizeArrayAddresses(stupidContract: address, nCoins: uint256) -> address[MAX_COINS]:
  address_list: address[MAX_COINS] = empty(address[MAX_COINS])

  fromFixedSizeArray: address = ZERO_ADDRESS
  
  for i in range(MAX_COINS):
    if i == nCoins:
        break
    # "in loop" contract call - OK
    fromFixedSizeArray = IStupidContract(stupidContract).fixedSizeArray(i)
    address_list[i] = fromFixedSizeArray
    # assignment const address - OK
    # address_list[i] = 0x062FE8dbdD92D44Bc351929b5D4B4d6cb40608fa

  return address_list