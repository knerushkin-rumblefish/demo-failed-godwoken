import { deploy as poolContractDeploy } from './poolContract/deploy'

import { deploy as simpleStupidDeploy } from './simple-stupid/deploy/deploy'

async function deploy() {
  console.log('deploy')

  await poolContractDeploy()

  // await simpleStupidDeploy()
}

deploy()