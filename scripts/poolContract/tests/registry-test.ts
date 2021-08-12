import { 
  addCoinsToRegistry,
  addPoolToRegistry,
  readPoolDataByPool,
  readRegistryPools,
  readRegistryCoinsByPool,
  readRegistryPoolParameters
} from './registry'

export async function testRegistry() {
  console.log('test registry')

  await addCoinsToRegistry()
  await readRegistryCoinsByPool()
  await readPoolDataByPool()

  await addPoolToRegistry()

  await readRegistryPools()
  await readRegistryCoinsByPool()

  await readRegistryPoolParameters()
}