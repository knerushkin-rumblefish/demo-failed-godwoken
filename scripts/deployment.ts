import { Overrides } from 'ethers'

import {
  provider as localProvider,
  deployer as localDeployer
} from './deployment.local'

export const GAS_PRICE = 0
export const GAS_LIMIT = 12000000

export const transactionOverrides: Overrides = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT,
}

export const provider = localProvider
export const deployer = localDeployer
