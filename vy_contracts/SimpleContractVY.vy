# @version 0.2.12

interface IStupidContract:
  def publicAddresses(i: uint256) -> address: view
  def getAddress(i: uint256) -> address: view

@view
@external
def getStupidAddress(stupidContract: address, index: uint256 ) -> address:
  
  return IStupidContract(stupidContract).getAddress(index)


@view
@external
def getStupidPublicAddress(stupidContract: address, index: uint256 ) -> address:
  
  return IStupidContract(stupidContract).publicAddresses(index)
