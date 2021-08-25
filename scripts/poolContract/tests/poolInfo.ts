import { constants, Overrides } from 'ethers'
import { transactionOverrides } from '../../deployment'

import {
  PoolInfo,
  Swaps,
} from '../../../types/vy_contracts';

export async function getPoolInfo(
  poolInfo: PoolInfo,
  poolAddress: string,
  transactionOverrides: Overrides
) {
  const pool = await poolInfo.get_pool_info(poolAddress, transactionOverrides)
  console.log('pool info', pool)
}

export async function getPoolCoins(
  poolInfo: PoolInfo,
  poolAddress: string,
  transactionOverrides: Overrides
) {
  const poolCoins = await poolInfo.get_pool_coins(poolAddress, transactionOverrides)
  console.log('pool coins', poolCoins)
}