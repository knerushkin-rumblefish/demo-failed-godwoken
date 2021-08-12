import { testRegistry } from './hadouken/tests/registry-test'

export async function test() {
  console.log('test')
  await testRegistry()
}

test()