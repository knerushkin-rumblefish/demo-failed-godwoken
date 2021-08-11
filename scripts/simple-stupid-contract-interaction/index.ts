import { testDirectCalls } from './direct-calls'
import { testInterContractCalls } from './inter-contract-calls'


async function test() {
  await testDirectCalls()
  // await testInterContractCalls()
}

test()