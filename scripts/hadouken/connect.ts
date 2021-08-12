import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer, constants } from 'ethers';

import { prepare_contract_abi } from '../../vy_utils/prepare_contracts'
import { deployer, transactionOverrides } from '../deployment'

import * as ERC20_JSON from '../../vy_artifacts/contracts/ERC20.json'
import * as StableSwap3Pool_JSON from '../../vy_artifacts/contracts/StableSwap3Pool.json'
import * as Registry_JSON from '../../vy_artifacts/contracts/Registry.json'
import * as AddressProvider_JSON from '../../vy_artifacts/contracts/AddressProvider.json'

import {
  ERC20,
  StableSwap3Pool,
  AddressProvider,
  Registry,
  ERC20__factory,
  StableSwap3Pool__factory,
  AddressProvider__factory,
  Registry__factory,
} from '../../types/vy_contracts';


export function connectRegistry(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(Registry_JSON.abi),
    deployer.provider
  ).connect(deployer) as Registry;

  return contract
}

export function connectPool(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(StableSwap3Pool_JSON.abi),
    deployer.provider
  ).connect(deployer) as StableSwap3Pool;

  return contract
}