import { transactionOverrides } from '../../deployment'
import {
  connectedStupid as stupid,
} from '../connect/connect_vy'

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
    const transactionPushNoAddressInit =
      await stupid.pushAddress(ADDRESS, transactionOverrides)

    await transactionPushNoAddressInit.wait()

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

export async function readFromPublicArrayByIndex() {
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

export async function readFromArrayByIndex() {
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
export async function readFromPublicArrayByIndexOutOfBoundFailure() {
  const publicAddress = await stupid.publicAddresses(10, transactionOverrides)

  console.log('read public address', publicAddress, PUBLIC_ADDRESS)
}

// Correct Behavior. Trying to access not initialized element from storage array
export async function readFromFixedArrayByIndexNoInit() {
  const fixeSizeAddress = await stupid.fixedSizeArray(0, transactionOverrides)

  console.log('read address from fixed size array', fixeSizeAddress, PUBLIC_ADDRESS)
}

export async function initStupidArrays() {
  await pushNoArrayInit()
  await pushPublicNoArrayInit()
}
