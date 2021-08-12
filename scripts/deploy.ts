import { deploy as hadoukenDeploy } from './hadouken/deploy'

async function deploy() {
  console.log('deploy')
  await hadoukenDeploy()
}

deploy()