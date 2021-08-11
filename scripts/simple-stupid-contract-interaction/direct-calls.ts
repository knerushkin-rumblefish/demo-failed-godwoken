import { transactionOverrides } from '../deployment'
import { connectSimple, connectStupid } from './connect'

import { stupidAddress, simpleAddress } from '../address'

const stupid = connectStupid(stupidAddress)
const simple = connectSimple(simpleAddress)

const ADDRESS = '0x57b7F4bD6a0373A3B8327bfEd4FBB02BEd5B82Ba'
const PUBLIC_ADDRESS = '0xB01316C53c91dA3CCD593c040916151938868519'


export async function addIndex0NoArrayInit() {
  try {
    /*
      FAILING: no internal private array init => status code 2
    */
    console.log('init add 0 stupid addresses without internal init')
    const transactionAdd0Address =  await stupid.add0AddressNoAddressesInit(ADDRESS, transactionOverrides)

    await transactionAdd0Address.wait()

    console.log('added address', ADDRESS)
  } catch(error) {
    console.log('add 0 address without of prior internal private address array init')
    console.error(error)
  }

}

export async function addIndex0WithExplicitArrayInit() {
  try {
    console.log('init add 0 stupid addresses with init')
    const transactionAdd0AddressWithAddressesInit =
      await stupid.add0AddressWithAddressesInit(ADDRESS, transactionOverrides)

    await transactionAdd0AddressWithAddressesInit.wait()

    console.log('added address', ADDRESS)
  } catch(error) {
    console.log('add 0 address without of prior internal private address array init')
    console.error(error)
  }
}

/* Working same on Godwoken/Ganache */
export async function pushNoArrayInit() {

  try {
    console.log('init add 0 stupid addresses with init')
    const transactionAdd0AddressWithAddressesInit =
      await stupid.add0AddressWithAddressesInit(ADDRESS, transactionOverrides)

    await transactionAdd0AddressWithAddressesInit.wait()

    console.log('added address', ADDRESS)
  } catch(error) {
    console.log('add 0 address without of prior internal private address array init')
    console.error(error)
  }
}

/* Working same on Godwoken/Ganache */
export async function add0PublicWithExplicitArrayInit() {

  try {
    console.log('init add 0 stupid addresses with init')
    const transactionAdd0AddressWithAddressesInit =
      await stupid.add0AddressWithAddressesInit(ADDRESS, transactionOverrides)

    await transactionAdd0AddressWithAddressesInit.wait()

    console.log('added address', ADDRESS)
  } catch(error) {
    console.log('add 0 address without of prior internal private address array init')
    console.error(error)
  }
}

/* Working same on Godwoken/Ganache */
export async function pushPublicNoArrayInit() {
  try {
    console.log('init stupid public addresses push')
    const transactionPublicAddress =  await stupid.pushPublicAddress(PUBLIC_ADDRESS, transactionOverrides)

    await transactionPublicAddress.wait()

    console.log('added public address', PUBLIC_ADDRESS)
  } catch(error) {
    console.log('add public address with internal init')
    console.error(error)
  }
}

async function readFromPublicArrayByIndex() {
  try {
    console.log('init stupid public addresses add 0')
    const transactionPublicAddress =  await stupid.addPublicAddress(PUBLIC_ADDRESS, transactionOverrides)

    await transactionPublicAddress.wait()

    console.log('added public address', PUBLIC_ADDRESS)
  } catch(error) {
    console.log('add public address with internal init')
    console.error(error)
  }

  const publicAddress = await stupid.publicAddresses(0, transactionOverrides)

  console.log('read public address', publicAddress, PUBLIC_ADDRESS)
}

async function readFromArrayByIndex() {
  try {
    console.log('init stupid public addresses add 0')
    const transactionPublicAddress =  await stupid.add0AddressWithAddressesInit(ADDRESS, transactionOverrides)

    await transactionPublicAddress.wait()

    console.log('added public address', ADDRESS)
  } catch(error) {
    console.log('add public address with internal init')
    console.error(error)
  }

  const address = await stupid.publicAddresses(0, transactionOverrides)

  console.log('read public address', address, ADDRESS)
}


// Correct Behavior. Trying to access not initialized element from storage array
async function readFromPublicArrayByIndexOutOfBoundFailure() {
  const publicAddress = await stupid.publicAddresses(10, transactionOverrides)

  console.log('read public address', publicAddress, PUBLIC_ADDRESS)
}

// Correct Behavior. Trying to access not initialized element from storage array
async function readFromFixedArrayByIndexNoInit() {
  const fixeSizeAddress = await stupid.fixedSizeArray(0, transactionOverrides)

  console.log('read address from fixed size array', fixeSizeAddress, PUBLIC_ADDRESS)
}

async function testReadStupidArrays() {
  await readFromArrayByIndex()
  await readFromPublicArrayByIndex()

  // await readFromPublicArrayByIndexOutOfBoundFailure()
  await readFromFixedArrayByIndexNoInit()
}

/*
  Different behavior on Ganache/Godwoken
*/
export async function execDiff() {
  await addIndex0WithExplicitArrayInit()
  await addIndex0NoArrayInit()
}

export async function initStupid() {
  await pushNoArrayInit()
  await pushPublicNoArrayInit()
}

export async function testStupidArrays() {
  try {
    // await addIndex0NoArrayInit() // FAILING ON BOTH WITH NO INIT
    await addIndex0WithExplicitArrayInit()

    await pushNoArrayInit()

    await add0PublicWithExplicitArrayInit()

    await pushPublicNoArrayInit()

    await testReadStupidArrays()
  } catch (error) {
    console.log(error)
  }
}




async function testCreateArrayPure() {
  try {
    const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
    console.log('with init')
    const addressArray0 = await stupid.createArrayWithInit(address0, transactionOverrides)

    console.log('array with init')
    console.log(addressArray0)
  } catch(error) {
    console.error(error)
  }


  // Failed
  // console.log('no init')
  // const addressArray1 = await stupid.createArrayNoInit(address0, transactionOverrides)

  // console.log('array no init')
  // console.log(addressArray1)
}

async function addAddressToStupidMapping(newAddress: string, oldAddress: string) {
  console.log('add address to stupid mapping', newAddress, oldAddress)

  const transaction = await stupid.add0ToMappingNoInit(newAddress, oldAddress);
  
  await transaction.wait()
}

async function getFromStupidMapping(searchedAddress: string) {
  const addressFromMapping = await stupid.getFromMappingWithoutInit(searchedAddress)

  return addressFromMapping
}

// primitive
// mapping(address => address) and any primitive type don't need any initialization
async function testMappingSuccess() {
  /* mapping don't need manual init */ 
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0xa07d9C6bF53E348c3B511B6e7BAb8B564Ea5F3bb'

  await addAddressToStupidMapping(address0, address1)

  const addressFromMapping = await getFromStupidMapping(address1)

  console.log('address from mapping', addressFromMapping)
}

async function getStructFromStupidMapping(searchedAddress: string) {
  const structFromMapping = await stupid.getStructFromMapping(searchedAddress)

  return structFromMapping
}

async function testStructNoInitFailed() {
  /* array of Struct's failing on direct through array[index].structParam variable initialization*/ 
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  console.log('add address to struct stupid array', address0)
  const transaction = await stupid.add0ToStuctToArrayNoStructInit(address0, transactionOverrides);
  
  await transaction.wait()
  const structFromMapping = await getStructFromStupidMapping(address1)

  console.log('struct from mapping', structFromMapping)
}

async function testStructWithInitFailed() {
  /* mapping don't need manual init */ 
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'
  
  console.log('add address to struct stupid array', address0)
  const transaction = await stupid.add0ToStuctToArrayStructInit(address0, transactionOverrides);
  
  await transaction.wait()

  const structFromMapping = await getStructFromStupidMapping(address1)

  console.log('struct from mapping', structFromMapping)
}


async function testGetEmptyStructSuccess() {
  const [structAddress, latest_change] = await stupid.createEmptyStruct(transactionOverrides)

  console.log('struct')
  console.log(latest_change.toString())
  console.log(structAddress)
}

async function testGetStruct() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const [structAddress, latest_change] = await stupid.createStruct(address0, transactionOverrides)

  console.log('struct')
  console.log(latest_change.toString())
  console.log(structAddress)
}

async function testGetStructReturnStruct() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const struct = await stupid.createStructReturnStruct(address0, transactionOverrides)

  console.log('struct')
  console.log(struct)
}

async function getStructAndModify1Success() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  const struct = await stupid.createStructMappingAndModify1(address0, transactionOverrides)

  console.log('struct 1', struct)
}

async function getStructAndModify2Success() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  const struct = await stupid.createStructMappingAndModify2(transactionOverrides)

  console.log('struct 2', struct)
}


async function testAddToStructMappingNoInitFailed() {
  // Failing when key not previously added
  // status_code => 2

  console.log(' test add struct no init')

  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  const transaction = await stupid.addToStructMappingNoInit(address1, address0, transactionOverrides)

  await transaction.wait()
}

export async function testAddToStructMappingWithInitSuccess(address0: string, address1: string) {
  console.log(' test add struct with init')


  const transaction = await stupid.addToStructMappingWithInit(address0, address1, transactionOverrides)

  await transaction.wait()

  const struct = await getStructFromStupidMapping(address1)
  console.log('struct', struct)
}

export async function testArrayField() {
  // await testCreateArrayPure()

  await testStupidArrays()
}

export async function testMappingField() {
  await testMappingSuccess()
}


export async function testStructs() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  // Pure Struct Create
  await testGetEmptyStructSuccess()
  await testGetStruct()
  await testGetStructReturnStruct()

  // Initialize Struct First with empty value's, then update values and return
  await getStructAndModify1Success()
  await getStructAndModify2Success()

  await testAddToStructMappingWithInitSuccess(address0, address1)
  // await testAddToStructMappingNoInitFailed()

  // await testStructWithInitFailed()
  // await testStructNoInitFailed()

}

export async function testDirectCalls() {
  console.log('\ntest direct calls')

  await execDiff()

  // await testArrayField()

  // await testMappingField()

  // await testStructs()


  console.log('\n')
}
