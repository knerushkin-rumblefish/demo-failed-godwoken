import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer } from 'ethers';

import * as SimpleContract_JSON from '../../../vy_artifacts/contracts/SimpleContractVY.json'
import * as StupidContract_JSON from '../../../vy_artifacts/contracts/StupidContractVY.json'

import {
  SimpleContractVY,
  StupidContractVY,
  SimpleContractVY__factory,
  StupidContractVY__factory,
} from '../../../types/vy_contracts';

import { prepare_contract_abi } from '../../../vy_utils/prepare_contracts'

import { deployer, transactionOverrides } from '../../deployment'

export async function deploySimple(
  deployer: Signer
):Promise<SimpleContractVY['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(SimpleContract_JSON.abi),
    SimpleContract_JSON.bytecode,
    deployer
  )  as SimpleContractVY__factory;


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
):Promise<StupidContractVY['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(StupidContract_JSON.abi),
    StupidContract_JSON.bytecode,
    deployer
  )  as StupidContractVY__factory;


  const deployTransaction = factory.getDeployTransaction(
    transactionOverrides
  );

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const interCallContractAddress = receipt.contractAddress
  
  return interCallContractAddress
}

export async function deploy() {
  const stupid = await deployStupid(deployer)

  const simple = await deploySimple(deployer)

  console.log('stupid', stupid)
  console.log('simple', simple)

  return {
    stupid,
    simple,
  }
}