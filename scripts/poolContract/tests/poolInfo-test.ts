import { getPoolInfo, getPoolCoins } from './poolInfo'
import addresses from '../addresses'
import { connectPool, connectPoolInfo } from '../connect'
import { transactionOverrides } from '../../deployment'

export async function testPoolInfo() {
  console.log('test pool info')
  console.log('poolInfo', addresses.poolInfo)
  console.log('pool', addresses.pool)

  const poolInfo = connectPoolInfo(addresses.poolInfo)

  console.log('pool info contract', poolInfo.address)

  await getPoolCoins(poolInfo, addresses.pool, transactionOverrides)

  await getPoolInfo(poolInfo, addresses.pool, transactionOverrides)
}