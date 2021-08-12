import { testDirectCalls } from './direct-calls'
import { testInterContractCalls as testInterContractCallsVY } from './inter-contract-calls.vy'
import { testInterContractCalls as testInterContractCallsSOL } from './inter-contract-calls.sol'


export async function test() {
  // await testDirectCalls()
  console.log('vy')
  await testInterContractCallsVY()

  console.log('sol')
  await testInterContractCallsSOL()
}
