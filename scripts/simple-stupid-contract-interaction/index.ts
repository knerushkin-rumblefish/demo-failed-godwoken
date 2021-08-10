import { testDirectCalls } from './direct-calls'
import { testInterContractCalls } from './inter-contract-calls'

export const stupidAddress = '0xce18532482F2e494a15aa94dBA27782E1622CFe3'
export const simpleAddress = '0x67CD6D98bdcDD50E2E5Dd192d7733323A931D4F4'

async function test() {
  await testDirectCalls()
  await testInterContractCalls()
}

test()