import { test as testPoolContract } from './poolContract/tests'
import { test as testSimpleStupid } from './simple-stupid/tests'

export async function test() {
  console.log('test')

  await testPoolContract()

  await testSimpleStupid()
}

test()