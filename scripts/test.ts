import { testRegistry } from './hadouken/tests/registry-test'
import { testPool } from './hadouken/tests/pool-test'

export async function test() {
  console.log('test')
  await testPool()
  await testRegistry()
}

test()