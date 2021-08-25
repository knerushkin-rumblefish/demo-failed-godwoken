import addresses from '../addresses'
import { connectAddressProvider } from '../connect'
import { transactionOverrides } from '../../deployment'

export async function testAddressProvider() {
  console.log('test address provider')
  const addressProvider = connectAddressProvider(addresses.addressProvider)

  const registryAddress = await addressProvider.get_registry(transactionOverrides)

  console.log('In Address Provider Regsitry', registryAddress)
}