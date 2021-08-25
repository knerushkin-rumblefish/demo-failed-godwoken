import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer, constants } from 'ethers';

import { prepare_contract_abi } from '../../vy_utils/prepare_contracts'
import { deployer, transactionOverrides } from '../deployment'

import * as ERC20_JSON from '../../vy_artifacts/contracts/ERC20.json'
import * as StableSwap3Pool_JSON from '../../vy_artifacts/contracts/StableSwap3Pool.json'
import * as Registry_JSON from '../../vy_artifacts/contracts/Registry.json'
import * as Swaps_JSON from '../../vy_artifacts/contracts/Swaps.json'
import * as AddressProvider_JSON from '../../vy_artifacts/contracts/AddressProvider.json'
import * as LPToken_JSON from '../../vy_artifacts/contracts/LPToken.json'
import * as PoolInfo_JSON from '../../vy_artifacts/contracts/PoolInfo.json'

import {
  AddressProvider,
  StableSwap3Pool,
  Registry,
  PoolInfo,
  Swaps,
  ERC20,
  LPToken
} from '../../types/vy_contracts';

export function connectAddressProvider(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(AddressProvider_JSON.abi),
    deployer.provider
  ).connect(deployer) as AddressProvider;

  return contract
}

export function connectRegistry(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(Registry_JSON.abi),
    deployer.provider
  ).connect(deployer) as Registry;

  return contract
}

export function connectPoolInfo(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(PoolInfo_JSON.abi),
    deployer.provider
  ).connect(deployer) as PoolInfo;

  return contract
}

export function connectLPToken(address: string) {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(LPToken_JSON.abi),
    deployer.provider
  ).connect(deployer) as LPToken;

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


export function connectToken(address: string) {
  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(ERC20_JSON.abi),
    deployer.provider
  ).connect(deployer) as ERC20;

  return contract
}

export function connectSwaps(
  address: string
): Swaps {

  const contract = new ethers.Contract(
    address,
    prepare_contract_abi(Swaps_JSON.abi),
    deployer.provider
  ).connect(deployer) as Swaps;

  return contract
}
