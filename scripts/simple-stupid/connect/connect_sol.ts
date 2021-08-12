import { ethers } from 'ethers';

import * as SimpleContractSOL_JSON from '../../../sol_artifacts/sol_contracts/SimpleContractSOL.sol/SimpleContractSOL.json'
import * as StupidContractSOL_JSON from '../../../sol_artifacts/sol_contracts/StupidContractSOL.sol/StupidContractSOL.json'
import {
  SimpleContractSOL,
  StupidContractSOL,
} from '../../../types/sol_contracts';


import { deployer } from '../../deployment'

import addresses from '../address.sol'

export function connectSimple(address: string) {

  const contract = new ethers.Contract(
    address,
    SimpleContractSOL_JSON.abi,
    deployer.provider
  ).connect(deployer) as SimpleContractSOL;

  return contract
}

export function connectStupid(address: string) {

  const contract = new ethers.Contract(
    address,
    StupidContractSOL_JSON.abi,
    deployer.provider
  ).connect(deployer) as StupidContractSOL;

  return contract
}


export const connectedStupid = connectStupid(addresses.stupid)
export const connectedSimple = connectSimple(addresses.simple)