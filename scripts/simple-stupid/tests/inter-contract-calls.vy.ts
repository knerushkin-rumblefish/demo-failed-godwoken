import { transactionOverrides } from '../../deployment'
import { testAddToStructMappingWithInitSuccess } from './direct-calls'

import { initStupidArrays } from './array.vy'

import {
  connectedSimple as simple,
  connectedStupid as stupid,
} from '../connect/connect_vy'


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


async function simpleCallFixedByConstArrayAddress() {
  console.log('simple call stupid fixed with const variable array')
  try {
    const fixedSizeArrayAddress = await simple.getStupidFixedSizeArrayAddress(stupid.address, 0, transactionOverrides)
    console.log('stupid fixed size array address', fixedSizeArrayAddress.toString())

  } catch (error) {
    console.error('simple call stupid fixed with const variable array error', error)
  }
}

async function simpleCallFixedByConstArrayAddresses() {
  console.log('simple call stupid fixed with const variable array')
  try {
    const fixedSizeArrayAddress = await simple.getStupidFixedSizeArrayAddresses(stupid.address, 8, transactionOverrides)
    console.log('stupid fixed size array address', fixedSizeArrayAddress.toString())

  } catch (error) {
    console.error('simple call stupid fixed with const variable array error', error)
  }
}

async function testNestedCallsSuccess() {
  /* Simple Contract call to Stupid Contract to get data from Array */
  console.log('init stupid arrays')
  await initStupidArrays()

  await simpleCallFixedByConstArrayAddress()
  await simpleCallFixedByConstArrayAddresses()

  // await testStupidArrays()

  // console.log('test simple call stupid')
  // await simpleCallStupid()
}

// async function testSimpleGetStupidStruct(address0: string, address1: string) {
//   console.log('simple get stupid struct')

//   // Init Struct Mapping
//   await testAddToStructMappingWithInitSuccess(address0, address1)

//   try {
//     const struct = await simple.getStupidStruct(stupid.address, address1, transactionOverrides)
//     console.log('struct', struct)
//   } catch (error) {
//     console.log(error)
//   }

// }

export async function testInterContractCalls() {
  console.log('\ntest inter contract calls')

  await testNestedCallsSuccess()

  console.log('\n')
}
