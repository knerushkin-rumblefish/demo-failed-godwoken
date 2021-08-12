import { DEPLOYMENT_ENVS } from '../deployment'

import gnAddresses from './addresses.ganache.vy.json'
import gwAddresses from './addresses.godwoken.vy.json'


const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV;

if(!DEPLOYMENT_ENV || Object.keys(DEPLOYMENT_ENVS).includes(DEPLOYMENT_ENV)) {
  throw new Error("Set env variable DEPLOYMENT_ENV to 'ganache' or 'godwoken'")
}


let addresses: typeof gnAddresses = gnAddresses

if(DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Ganache) {
  addresses = gnAddresses
} else if (DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Godwoken) {
  addresses = gwAddresses
}

export default addresses