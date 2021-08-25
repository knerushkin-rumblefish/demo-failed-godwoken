import { translateAddress } from '../../deployment'
import { deployer, transactionOverrides } from '../../deployment'

import { 
  swapWithRegistry,
} from './swaps'

export async function testSwaps() {
  console.log('test registry')
  const admin = translateAddress(deployer.address)

  await swapWithRegistry(admin, deployer, transactionOverrides)
}