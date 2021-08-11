import { Overrides, providers, Wallet } from 'ethers'
import { DEPLOYMENT_ENVS } from './address.sol'

import {
  provider as gnProvider,
  deployer as gnDeployer
} from './deployment.ganache'

import {
  provider as gwProvider,
  deployer as gwDeployer
} from './deployment.godwoken'

export const GAS_PRICE = 0
export const GAS_LIMIT = 12000000

export const transactionOverrides: Overrides = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT,
}


const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV;

if(!DEPLOYMENT_ENV || Object.keys(DEPLOYMENT_ENVS).includes(DEPLOYMENT_ENV)) {
  throw new Error("Set env variable DEPLOYMENT_ENV to 'ganache' or 'godwoken'")
}


let provider: providers.JsonRpcProvider, deployer: Wallet

if(DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Ganache) {
  provider = gnProvider
  deployer = gnDeployer
} else if (DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Godwoken) {
  provider = gwProvider
  deployer = gwDeployer
}

export {
  provider,
  deployer,
}
