import { deploy as poolContractDeploy } from './hadouken/deploy'

async function deploy() {
  console.log('deploy')
  await poolContractDeploy()
}

deploy()