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

export async function deployAddressProvider(): Promise<AddressProvider['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(AddressProvider_JSON.abi),
    AddressProvider_JSON.bytecode,
    deployer
  )  as AddressProvider__factory;


  const deployTransaction = factory.getDeployTransaction(deployer.address, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export async function deployRegistry(addressProvider: AddressProvider['address']): Promise<Registry['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(Registry_JSON.abi),
    Registry_JSON.bytecode,
    deployer
  )  as Registry__factory;


  const deployTransaction = factory.getDeployTransaction(addressProvider, constants.AddressZero, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export async function deployERC20(name: string, decimals: number): Promise<ERC20['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(ERC20_JSON.abi),
    ERC20_JSON.bytecode,
    deployer
  )  as ERC20__factory;


  const deployTransaction = factory.getDeployTransaction(name, name, decimals, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export async function deployPool(tokens: ERC20['address'][]): Promise<StableSwap3Pool['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(StableSwap3Pool_JSON.abi),
    StableSwap3Pool_JSON.bytecode,
    deployer
  )  as StableSwap3Pool__factory;


  const deployTransaction = factory.getDeployTransaction(
    deployer.address,
    tokens as [string, string, string],
    constants.AddressZero,
    100,
    0,
    0,
    transactionOverrides,
  );

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export async function deploy() {
  const addressProvider = await deployAddressProvider()
  console.log('address provider', addressProvider)

  const registry = await deployRegistry(addressProvider)
  console.log('registry', registry)

  const tokenDesc = [
    { name: 'a', decimals: 18},
    { name: 'b', decimals: 6}, 
    { name: 'c', decimals: 6}, 
  ]
  const tokens = []

  for(let i = 0; i < tokenDesc.length; i++) {
    const token = await deployERC20(tokenDesc[i].name, tokenDesc[i].decimals)
    console.log('token', tokenDesc[i].name, token)
    tokens.push(token)
  }

  const pool = await deployPool(tokens)
  console.log('pool', pool)
}