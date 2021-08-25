import addresses from '../addresses'
import { connectPool, connectRegistry } from '../connect'
import { 
  // addCoinsToRegistry,
  addPoolToRegistry,
  // readPoolDataByPool,
  readRegistryPools,
  readRegistryCoinsByPool,
  readRegistryPoolParameters
} from './registry'

export async function testRegistry() {
  console.log('test registry')

  const registry = connectRegistry(addresses.registry)
  const pool = connectPool(addresses.pool)
  
  // await addCoinsToRegistry(registry, pool.address)
  await readRegistryCoinsByPool(registry, pool.address)
  // await readPoolDataByPool(registry, pool.address)

  await addPoolToRegistry(registry, pool.address, addresses.tokenA)

  await readRegistryPools(registry)
  await readRegistryCoinsByPool(registry, pool.address)

  await readRegistryPoolParameters(registry, pool.address)
}