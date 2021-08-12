import { testPool } from './pool-test'
import { testRegistry } from './registry-test'


export async function test() {
  console.log('test pool contracts')
  
  await testPool()

  await testRegistry()
}
