import { readPoolBalances } from './pool'

export async function testPool() {
  console.log('test pool')

  await readPoolBalances()
}