import { 
  addPoolToRegistry,
  readRegistryPools,
  readRegistryCoinsByPool,
  readRegistryPoolParameters
} from './registry'

export async function testRegistry() {
  console.log('test registry')

  await addPoolToRegistry()

  await readRegistryPools()

  // await readRegistryCoinsByPool()

  await readRegistryPoolParameters()
}