import { testRegistry } from './poolContract/tests/registry-test'
import { testPool } from './poolContract/tests/pool-test'

export async function test() {
  console.log('test')
  await testPool()
  await testRegistry()
}

test()