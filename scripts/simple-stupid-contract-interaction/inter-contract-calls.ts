import { transactionOverrides } from '../deployment'
import { connectSimple, connectStupid } from './connect'
import { testAddToStructMappingWithInitSuccess, testInitStupidArrays } from './direct-calls'

import { stupidAddress, simpleAddress } from './index'

const stupid = connectStupid('0xce18532482F2e494a15aa94dBA27782E1622CFe3')
const simple = connectSimple('0x67CD6D98bdcDD50E2E5Dd192d7733323A931D4F4')

const ADDRESS = '0x57b7F4bD6a0373A3B8327bfEd4FBB02BEd5B82Ba'
const PUBLIC_ADDRESS = '0xB01316C53c91dA3CCD593c040916151938868519'



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


async function testNestedCallsSuccess() {
  /* Simple Contract call to Stupid Contract to get data from Array */
  await testInitStupidArrays()

  await callStupid()

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

  await testSimpleGetStupidStruct(address0, address1)

  console.log('\n')
}
