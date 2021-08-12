import { constants } from 'ethers'
import { transactionOverrides } from '../../deployment'
import addresses from '../addresses'

import { connectRegistry, connectPool } from '../connect'

const registry = connectRegistry(addresses.registry)
const pool = connectPool(addresses.pool)

export async function addPoolToRegistry() {
  try {
    const tokens: string[] = Array(8).fill(constants.AddressZero)
    
    tokens[0] = addresses.tokenA
    tokens[1] = addresses.tokenB
    tokens[2] = addresses.tokenC

    const transaction = await registry.add_pool_without_underlying(
      addresses.pool,
      3,
      addresses.tokenA,
      constants.HashZero,
      0,
      0,
      false,
      false,
      'pool',
      transactionOverrides,
    )

    await transaction.wait()
  } catch(error) {
    console.error(error)
  }
}

export async function readRegistryPools() {
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


export async function readRegistryPoolParameters() {
  console.log('registry pool parameters')
  try {
    const parameters = await registry.get_parameters(addresses.pool, transactionOverrides) 
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

export async function readRegistryCoinsByPool() {
  console.log('registry pool coins')
  try {
    const coins = await registry.get_coins(addresses.pool, transactionOverrides) 
    console.log(JSON.stringify(coins, null, 2))
  } catch (error) {
    console.error(error)
  }
}