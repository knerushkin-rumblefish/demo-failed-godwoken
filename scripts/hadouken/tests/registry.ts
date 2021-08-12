import { constants } from 'ethers'
import { transactionOverrides } from '../../deployment'
import {
  pool as poolAddress,
  registry as registryAddress,
  tokenA as tokenAAddress,
  tokenB as tokenBAddress,
  tokenC as tokenCAddress
} from '../addresses'

import { connectRegistry, connectPool } from '../connect'

const registry = connectRegistry(registryAddress)
const pool = connectPool(poolAddress)

export async function addPoolToRegistry() {
  try {
    const tokens: string[] = Array(8).fill(constants.AddressZero)
    
    tokens[0] = tokenAAddress
    tokens[1] = tokenBAddress
    tokens[2] = tokenCAddress

    const transaction = await registry.add_pool_without_underlying(
      poolAddress,
      3,
      tokens as [string, string, string, string, string, string, string, string],
      tokenAAddress,
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

export async function readRegistryCoinsByPool() {
  console.log('registry pool coins')
  try {
    const coins = await registry.get_coins(poolAddress, transactionOverrides) 
    console.log(JSON.stringify(coins, null, 2))
  } catch (error) {
    console.error(error)
  }
}