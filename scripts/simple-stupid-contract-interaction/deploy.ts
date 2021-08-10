import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer } from 'ethers';

import * as SimpleContractSOL_JSON from '../../artifacts/contracts/SimpleContractSOL.sol/SimpleContractSOL.json'
import * as StupidContractSOL_JSON from '../../artifacts/contracts/StupidContractSOL.sol/StupidContractSOL.json'
import {
  SimpleContractSOL,
  StupidContractSOL,
  SimpleContractSOL__factory,
  StupidContractSOL__factory,
} from '../../types/contracts';

import { deployer, transactionOverrides } from '../deployment'

export async function deploySimple(
  deployer: Signer
):Promise<SimpleContractSOL['address']> {
  const factory = new ContractFactory(
    SimpleContractSOL_JSON.abi,
    SimpleContractSOL_JSON.bytecode,
    deployer
  )  as SimpleContractSOL__factory;


  const deployTransaction = factory.getDeployTransaction(
    transactionOverrides
  );

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const interCallContractAddress = receipt.contractAddress
  
  console.log('address', interCallContractAddress)
  return interCallContractAddress
}

export function connectSimple(address: string) {

  const contract = new ethers.Contract(
    address,
    SimpleContractSOL_JSON.abi,
    deployer.provider
  ).connect(deployer) as SimpleContractSOL;

  return contract
}

export async function deployStupid(
  deployer: Signer
):Promise<StupidContractSOL['address']> {
  const factory = new ContractFactory(
    StupidContractSOL_JSON.abi,
    StupidContractSOL_JSON.bytecode,
    deployer
  )  as StupidContractSOL__factory;


  const deployTransaction = factory.getDeployTransaction(
    transactionOverrides
  );

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const interCallContractAddress = receipt.contractAddress
  
  console.log('address', interCallContractAddress)
  return interCallContractAddress
}

export function connectStupid(address: string) {

  const contract = new ethers.Contract(
    address,
    StupidContractSOL_JSON.abi,
    deployer.provider
  ).connect(deployer) as StupidContractSOL;

  return contract
}


async function deploy() {
  console.log('stupid')
  await deployStupid(deployer)

  console.log('simple')
  await deploySimple(deployer)
}

deploy()