import { testPool } from './pool-test'
import { testRegistry } from './registry-test'
import { testSwaps } from './swaps-test'
import { testPoolInfo } from './poolInfo-test'
import { testAddressProvider } from './addressProvider-test'


export async function test() {
  try {
    await testAddressProvider()

    // await testPool()

    // await testRegistry()

    // await testSwaps()

    await testPoolInfo()
  } catch(error) {
    console.error('test', error)
  }
}
