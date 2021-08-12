import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer } from 'ethers';

import * as SimpleContractSOL_JSON from '../../../sol_artifacts/sol_contracts/SimpleContractSOL.sol/SimpleContractSOL.json'
import * as StupidContractSOL_JSON from '../../../sol_artifacts/sol_contracts/StupidContractSOL.sol/StupidContractSOL.json'
import {
  SimpleContractSOL,
  StupidContractSOL,
  SimpleContractSOL__factory,
  StupidContractSOL__factory,
} from '../../../types/sol_contracts';

import { deployer, transactionOverrides } from '../../deployment'

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
  
  return interCallContractAddress
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
  
  return interCallContractAddress
}

export async function deploy() {
  const stupidAddress = await deployStupid(deployer)

  const simpleAddress = await deploySimple(deployer)

  console.log('stupid', stupidAddress)
  console.log('simple', simpleAddress)
}