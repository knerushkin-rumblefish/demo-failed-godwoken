import { ethers } from 'ethers';

import * as SimpleContractSOL_JSON from '../../artifacts/contracts/SimpleContractSOL.sol/SimpleContractSOL.json'
import * as StupidContractSOL_JSON from '../../artifacts/contracts/StupidContractSOL.sol/StupidContractSOL.json'
import {
  SimpleContractSOL,
  StupidContractSOL,
} from '../../types/contracts';

import { deployer, transactionOverrides } from '../deployment'

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

