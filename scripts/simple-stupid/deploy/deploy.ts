import { deploy as deploySol } from './deploy_sol'
import { deploy as deployVy } from './deploy_vy'

const NAME = 'deploy'
const SIGN = '#'
const MESSAGE = [
  SIGN.repeat(25),
  NAME,
  SIGN.repeat(25),
].join('')

async function deploy() {

  console.log(MESSAGE)

  console.log('sol')
  await deploySol()

  console.log('vy')
  await deployVy()

  console.log(
    SIGN.repeat(MESSAGE.length),
  )
}

deploy()