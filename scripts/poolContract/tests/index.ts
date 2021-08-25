import { testPool } from './pool-test'
import { testRegistry } from './registry-test'
import { testSwaps } from './swaps-test'


export async function test() {
  await testPool()

  // await testRegistry()

  await testSwaps()
}
