import { simpleAddress as gnSimpleAddress, stupidAddress as gnStupidAddress } from './address.ganache.sol'
import { simpleAddress as gwSimpleAddress, stupidAddress as gwStupidAddress } from './address.godwoken.sol'

export enum DEPLOYMENT_ENVS {
  Ganache = 'ganache', 
  Godwoken = 'godwoken'
}

const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV;

if(!DEPLOYMENT_ENV || Object.keys(DEPLOYMENT_ENVS).includes(DEPLOYMENT_ENV)) {
  throw new Error("Set env variable DEPLOYMENT_ENV to 'ganache' or 'godwoken'")
}


let simpleAddress: string, stupidAddress: string

if(DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Ganache) {
  simpleAddress = gnSimpleAddress
  stupidAddress = gnStupidAddress
} else if (DEPLOYMENT_ENV === DEPLOYMENT_ENVS.Godwoken) {
  simpleAddress = gwSimpleAddress
  stupidAddress = gwStupidAddress
}

export {
  simpleAddress,
  stupidAddress,
}