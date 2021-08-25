import { constants } from 'ethers'
import { transactionOverrides } from '../../deployment'

import {
  Registry, StableSwap3Pool,
} from '../../../types/vy_contracts';

import { connectRegistry, connectPool } from '../connect'


export async function addPoolToRegistry(registry: Registry, poolAddress: string, lpToken: string) {
  console.log('Add pool to Registry', poolAddress)
  try {
    const transaction = await registry.add_pool_without_underlying(
      poolAddress,
      3,
      lpToken,
      constants.HashZero,
      0,
      0,
      false,
      false,
      'pool',
      transactionOverrides,
    )

    await transaction.wait()

    const poolNameInRegistry = await registry.get_pool_name(poolAddress, transactionOverrides)
    console.log('Pool addeed to registry', poolNameInRegistry)
  } catch(error) {
    console.error(error)
  }
}

// export async function addCoinsToRegistry(registry: Registry, poolAddress: string) {
//   try {
//     const transaction = await registry.get_new_pool_coins(poolAddress, 3, false, false, transactionOverrides)

//     await transaction.wait()
//   } catch(error) {
//     console.error(error)
//   } 
// }

export async function readRegistryPools(registry: Registry) {
  console.log('registry pools')
  try {
    const poolCount = await registry.pool_count(transactionOverrides)
    for(let i = 0; i < poolCount.toNumber(); i++) {
      const pool = await registry.pool_list(i, transactionOverrides)
      console.log('pool', pool)
    }
  } catch (error) {
    console.error(error)
  }
}


export async function readRegistryPoolParameters(registry: Registry, poolAddress: string) {
  console.log('registry pool parameters')
  try {
    const parameters = await registry.get_parameters(poolAddress, transactionOverrides) 
    console.log(JSON.stringify(
        parameters.map(parameter => parameter.toString()),
        null,
        2
      )
    )
  } catch (error) {
    console.error(error)
  }
}

export async function readRegistryCoinsByPool(registry: Registry, poolAddress: string) {
  console.log('registry pool coins')
  try {
    const coins = await registry.get_coins(poolAddress, transactionOverrides) 
    console.log(JSON.stringify(coins, null, 2))
  } catch (error) {
    console.error(error)
  }
}

// export async function readPoolDataByPool(registry: Registry, poolAddress: string) {
//   console.log('registry pool coins')
//   try {
//     const poolData = await registry.pool_data(poolAddress, transactionOverrides) 
//     console.log(JSON.stringify(poolData, null, 2))
//   } catch (error) {
//     console.error(error)
//   }
// }