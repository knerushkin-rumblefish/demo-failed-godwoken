import fs from 'fs'
import path from 'path'

export function overrideAddresses(addresses: any, addressesPath: string) {
  console.log('override addresses', addressesPath)

  const addressesJSON = path.join(__dirname, addressesPath)

  fs.writeFileSync(addressesJSON, JSON.stringify(addresses, null, 2))
}
