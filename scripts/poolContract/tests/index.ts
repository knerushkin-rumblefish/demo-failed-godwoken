import { testPool } from './pool-test'
import { testRegistry } from './registry-test'
import { testSwaps } from './swaps-test'


export async function test() {
  console.log('test pool contracts')
  
  await testPool()

  await testRegistry()

  await testSwaps()
}
