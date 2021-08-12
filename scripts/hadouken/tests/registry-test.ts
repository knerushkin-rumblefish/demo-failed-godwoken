import { 
  addPoolToRegistry,
  readRegistryPools,
  readRegistryCoinsByPool
} from './registry'

export async function testRegistry() {
  console.log('add test to registry')
  await addPoolToRegistry()

  await readRegistryPools()

  await readRegistryCoinsByPool()
}