import { transactionOverrides } from '../deployment'
import { connectSimple, connectStupid } from './connect'


const stupid = connectStupid('0x3635a068c25D6357caa50A4b67EBF3F412c1a113')
const simple = connectSimple('0xBAB0259111b6B3a2E2B5fAE5533d773539bdC090')

const ADDRESS = '0x57b7F4bD6a0373A3B8327bfEd4FBB02BEd5B82Ba'
const PUBLIC_ADDRESS = '0xB01316C53c91dA3CCD593c040916151938868519'


async function initStupid() {
  try {
    // try {
    //   /*
    //     FAILING: no internal private array init => status code 2
    //   */
    //   console.log('init add 0 stupid addresses without internal init')
    //   const transactionAdd0Address =  await stupid.add0AddressNoAddressesInit(ADDRESS, transactionOverrides)
  
    //   await transactionAdd0Address.wait()
  
    //   console.log('added address', ADDRESS)
    // } catch(error) {
    //   console.log('add 0 address without of prior internal private address array init')
    //   console.error(error)
    // }

    try {
      /*
        FAILING: OBSERVED: no status code 2 => just stuck on wait
        SUCCESS
      */
      console.log('init add 0 stupid addresses with init')
      const transactionAdd0AddressWithAddressesInit =
        await stupid.add0AddressWithAddressesInit(ADDRESS, transactionOverrides)
  
      await transactionAdd0AddressWithAddressesInit.wait()
  
      console.log('added address', ADDRESS)
    } catch(error) {
      console.log('add 0 address without of prior internal private address array init')
      console.error(error)
    }

    try {
      console.log('init push stupid addresses')
      const transactionPushAddress =  await stupid.pushAddress(ADDRESS, transactionOverrides)

      await transactionPushAddress.wait()

      console.log('added address', ADDRESS)
    } catch(error) {
      console.log('push to addresses array without init')
      console.error(error)
    }

    try {
      console.log('init stupid public addresses add 0')
      const transactionPublicAddress =  await stupid.addPublicAddress(PUBLIC_ADDRESS, transactionOverrides)

      await transactionPublicAddress.wait()

      console.log('added public address', PUBLIC_ADDRESS)
    } catch(error) {
      console.log('add public address with internal init')
      console.error(error)
    }

    try {
      console.log('init stupid public addresses push')
      const transactionPublicAddress =  await stupid.pushPublicAddress(PUBLIC_ADDRESS, transactionOverrides)

      await transactionPublicAddress.wait()

      console.log('added public address', PUBLIC_ADDRESS)
    } catch(error) {
      console.log('add public address with internal init')
      console.error(error)
    }

  } catch (error) {
    console.log(error)
  }
}

async function callStupid() {
  console.log('direct stupid call')
  try {
    const address0 =  await stupid.getAddress(0, transactionOverrides)
    console.log('address', address0)
    console.log(address0)
  } catch (error) {
    console.log(error)
  }

  try {
    const publicAddress0 =  await stupid.publicAddresses(0, transactionOverrides)
    console.log('public address', publicAddress0)
  } catch (error) {
    console.log(error)
  }
}

async function simpleCallStupid() {
  try {
    console.log('simple call stupid')
    try {
      const address0 = await simple.getStupidAddress(stupid.address, 0, transactionOverrides)
      console.log(address0)
    } catch (error) {
      console.log(error)
    }

    try {
      const publicAddress0 = await simple.getStupidPublicAddress(stupid.address, 0, transactionOverrides)
      console.log(publicAddress0)
    } catch (error) {
      console.log(error)
    }

  } catch (error) {
    console.error('init error', error)
  }
}

async function testSimpleGetStupidStruct(address0: string, address1: string) {
  console.log('simple get stupid struct')

  // Init Struct Mapping
  await testAddToStructMappingWithInitSuccess(address0, address1)

  try {
    const struct = await simple.getStupidStruct(stupid.address, address1, transactionOverrides)
    console.log('struct', struct)
  } catch (error) {
    console.log(error)
  }

}

async function testNestedCallsSuccess() {
  /* Simple Contract call to Stupid Contract to get data from Array */
  await initStupid()

  await callStupid()

  await simpleCallStupid()
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

async function addAddressToStructStupidMapping(newAddress: string) {
}

async function testStructNoInitFailed() {
  /* mapping don't need manual init */ 
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  console.log('add address to struct stupid mapping', address0)
  const transaction = await stupid.add0ToStuctToArrayNoStructInit(address0, transactionOverrides);
  
  await transaction.wait()
  const structFromMapping = await getStructFromStupidMapping(address1)

  console.log('struct from mapping', structFromMapping)
}

async function testStructWithInitFailed() {
  /* mapping don't need manual init */ 
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'
  
  console.log('add address to struct stupid mapping', address0)
  const transaction = await stupid.add0ToStuctToArrayStructInit(address0, transactionOverrides);
  
  await transaction.wait()

  const structFromMapping = await getStructFromStupidMapping(address1)

  console.log('struct from mapping', structFromMapping)
}

async function testGetArray() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const addressArray = await stupid.createArray(address0, transactionOverrides)

  console.log('array')
  console.log(addressArray)
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
  console.log(' test add struct no init')

  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  const transaction = await stupid.addToStructMappingNoInit(address1, address0, transactionOverrides)

  await transaction.wait()
}

async function testAddToStructMappingWithInitSuccess(address0: string, address1: string) {
  console.log(' test add struct with init')


  const transaction = await stupid.addToStructMappingWithInit(address0, address1, transactionOverrides)

  await transaction.wait()

  const struct = await getStructFromStupidMapping(address1)
  console.log('struct', struct)
}

async function test() {
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  // await testNestedCallsSuccess()

  // await testMappingSuccess()

  // await testGetArray()
  // await testGetEmptyStructSuccess()
  // await testGetStruct()
  // await testGetStructReturnStruct()

  // await getStructAndModify1Success()
  // await getStructAndModify2Success()


  // await testAddToStructMappingWithInitSuccess(address0, address1)
  // await testAddToStructMappingNoInitFailed()

  await testSimpleGetStupidStruct(address0, address1)

  // await testStructNoInitFailed()

  // await testStructWithInitFailed()

}

test()