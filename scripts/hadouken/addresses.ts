import { DEPLOYMENT_ENVS } from '../deployment'

import { 
  registry as gnRegistry,
  pool as gnPool,
  addressProvider as gnAddressProvider,
  tokenA as gnTokenA,
  tokenB as gnTokenB,
  tokenC as gnTokenC,
} from './addresses.ganache'
import { 
  registry as gwRegistry,
  pool as gwPool,
  addressProvider as gwAddressProvider,
  tokenA as gwTokenA,
  tokenB as gwTokenB,
  tokenC as gwTokenC,
} from './addresses.godwoken'

const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV;

if(!DEPLOYMENT_ENV || Object.keys(DEPLOYMENT_ENVS).includes(DEPLOYMENT_ENV)) {
  throw new Error("Set env variable DEPLOYMENT_ENV to 'ganache' or 'godwoken'")
}


let 
  registry: string,
  pool: string,
  addressProvider: string,
  tokenA: string,
  tokenB: string,
  tokenC: string

if(DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Ganache) {
  registry = gnRegistry
  pool = gnPool
  addressProvider = gnAddressProvider
  tokenA = gnTokenA
  tokenB = gnTokenB
  tokenC = gnTokenC
} else if (DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Godwoken) {
  registry = gwRegistry
  pool = gwPool
  addressProvider = gwAddressProvider
  tokenA = gwTokenA
  tokenB = gwTokenB
  tokenC = gwTokenC
}

export {
  registry,
  pool,
  addressProvider,
  tokenA,
  tokenB,
  tokenC,
}