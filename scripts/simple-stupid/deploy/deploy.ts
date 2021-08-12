import { overrideAddresses } from '../utils'
import { deploy as deploySol } from './deploy_sol'
import { deploy as deployVy } from './deploy_vy'

const NAME = 'deploy'
const SIGN = '#'
const MESSAGE = [
  SIGN.repeat(25),
  NAME,
  SIGN.repeat(25),
].join('')

export async function deploy() {

  console.log(MESSAGE)

  console.log('sol')
  const addressesSol = await deploySol()
  overrideAddresses(addressesSol, `addresses.${process.env.DEPLOYMENT_ENV}.sol.json`)

  console.log('vy')
  const addressesVy = await deployVy()
  overrideAddresses(addressesVy, `addresses.${process.env.DEPLOYMENT_ENV}.vy.json`)
  console.log(
    SIGN.repeat(MESSAGE.length),
  )
}
