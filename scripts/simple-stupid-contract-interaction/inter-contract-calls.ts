import { transactionOverrides } from '../deployment'
import { connectSimple, connectStupid } from './connect'
import { testAddToStructMappingWithInitSuccess, initStupid, testStupidArrays } from './direct-calls'

import { stupidAddress, simpleAddress } from '../address'

const stupid = connectStupid(stupidAddress)
const simple = connectSimple(simpleAddress)



async function simpleCallStupid() {
  console.log('simple call stupid')
  try {
    console.log('get address')
    try {
      const stupidAddressesLength = await stupid.getAddressesLength(transactionOverrides)
      console.log('stupid addresses length', stupidAddressesLength.toString())

      const address0 = await simple.getStupidAddress(stupid.address, 0, transactionOverrides)
      console.log(address0)
    } catch (error) {
      console.log(error)
    }

    console.log('get public address')
    try {
      const stupidPublicAddressesLength = await stupid.getPublicAddressesLength(transactionOverrides)
      console.log('stupid public addresses length', stupidPublicAddressesLength.toString())
      
      const publicAddress0 = await simple.getStupidPublicAddress(stupid.address, 0, transactionOverrides)
      console.log(publicAddress0)
    } catch (error) {
      console.log(error)
    }

  } catch (error) {
    console.error('init error', error)
  }
}

async function testNestedCallsSuccess() {
  /* Simple Contract call to Stupid Contract to get data from Array */
  await initStupid()

  // await testStupidArrays()

  await simpleCallStupid()
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

export async function testInterContractCalls() {
  console.log('\ntest inter contract calls')
  const address0 = '0xB01316C53c91dA3CCD593c040916151938868519'
  const address1 = '0x695Fac3006C042D1B26Fa338470C2941DbA38Cd6'

  await testNestedCallsSuccess()

  // await testSimpleGetStupidStruct(address0, address1)

  console.log('\n')
}
