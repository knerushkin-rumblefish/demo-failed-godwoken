import { deploy as poolContractDeploy } from './poolContract/deploy'

async function deploy() {
  console.log('deploy')
  await poolContractDeploy()
}

deploy()