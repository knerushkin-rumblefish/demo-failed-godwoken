import fs from 'fs'
import { ethers } from 'ethers';

import * as SimpleContract_JSON from '../../../vy_artifacts/contracts/SimpleContractVY.json'
import * as StupidContract_JSON from '../../../vy_artifacts/contracts/StupidContractVY.json'

import {
  SimpleContractVY,
  StupidContractVY,
} from '../../../types/vy_contracts';

import { prepare_contract_abi } from '../../../vy_utils/prepare_contracts'

import { deployer } from '../../deployment'

import { stupidAddress, simpleAddress } from '../../address.vy'


export function connectSimple(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(SimpleContract_JSON.abi),
    deployer.provider
  ).connect(deployer) as SimpleContractVY;

  return contract
}

export function connectStupid(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(StupidContract_JSON.abi),
    deployer.provider
  ).connect(deployer) as StupidContractVY;

  return contract
}

export const connectedStupid = connectStupid(stupidAddress)
export const connectedSimple = connectSimple(simpleAddress)
