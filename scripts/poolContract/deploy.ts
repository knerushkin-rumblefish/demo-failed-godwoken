import fs from 'fs'
import path from 'path'
import { BigNumber, ContractFactory, ethers, Signer, Wallet, constants } from 'ethers';

import { prepare_contract_abi } from '../../vy_utils/prepare_contracts'
import { deployer, transactionOverrides, translateAddress } from '../deployment'
import { overrideAddresses } from './utils'

import * as ERC20_JSON from '../../vy_artifacts/contracts/ERC20.json'
import * as StableSwap3Pool_JSON from '../../vy_artifacts/contracts/StableSwap3Pool.json'
import * as Registry_JSON from '../../vy_artifacts/contracts/Registry.json'
import * as AddressProvider_JSON from '../../vy_artifacts/contracts/AddressProvider.json'
import * as Swaps_JSON from '../../vy_artifacts/contracts/Swaps.json'
import * as PoolInfo_JSON from '../../vy_artifacts/contracts/PoolInfo.json'

import {
  ERC20,
  StableSwap3Pool,
  AddressProvider,
  Registry,
  PoolInfo,
  ERC20__factory,
  PoolInfo__factory,
  StableSwap3Pool__factory,
  AddressProvider__factory,
  Registry__factory,
  Swaps__factory,
} from '../../types/vy_contracts';

import {
  connectRegistry,
  connectAddressProvider,
} from './connect'

export async function deployAddressProvider(
  admin: string,
  deployer: Wallet
): Promise<AddressProvider['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(AddressProvider_JSON.abi),
    AddressProvider_JSON.bytecode,
    deployer
  )  as AddressProvider__factory;

  const deployTransaction = factory.getDeployTransaction(admin, transactionOverrides);

  const transactionResult = await deployer.sendTransaction(deployTransaction);
  const receipt = await transactionResult.wait();

  const contractAddress = receipt.contractAddress
  
  return contractAddress
}

export async function deployRegistry(
  addressProvider: AddressProvider,
  admin: string,
  deployer: Wallet
): Promise<Registry['address']> {
  const factory = new ContractFactory(
    prepare_contract_abi(Registry_JSON.abi),
    Registry_JSON.bytecode,
    deployer
  )  as Registry__factory;

  const deployTransaction = factory.getDeployTransaction(addressProvider.address, constants.AddressZero, transactionOverrides);

  const deploymentResult = await deployer.sendTransaction(deployTransaction);
  console.log('Deploy Registry Tx Hash', deploymentResult.hash)
  console.log('Deploy Registry Tx Block Hash', deploymentResult.blockHash)

  const deploymentReceipt = await deploymentResult.wait();

  const registryAddress = deploymentReceipt.contractAddress

  console.log('registry deployed:', registryAddress)

  console.log('Address Provider update')
  const addressProviderAddress0 = await addressProvider.get_address(0)
  console.log('Address Provider address 0', addressProviderAddress0)

  console.log('Address Provider contract', addressProvider.address)
  const resultUpdateAddressProvider = await addressProvider.set_address(
    BigNumber.from(0),
    registryAddress,
    transactionOverrides
  )
  console.log('AddressProvider update transaction', resultUpdateAddressProvider.hash)

  const updateAddressProviderReceipt = await resultUpdateAddressProvider.wait()
  console.log('Address Provider updated', updateAddressProviderReceipt.transactionHash)
  
  const addressProviderMaxId = await addressProvider.max_id()
  console.log('Address Provider max id', addressProviderMaxId.toNumber())

  const registryFromAddressProvider = await addressProvider.get_id_info(0)
  console.log('Address Provider registry', registryFromAddressProvider)

  return registryAddress
}

export async function deployPoolInfo(
  addressProvider: AddressProvider,
  admin: string,
  deployer: Wallet
) {
  console.log('PoolInfo Deploy')
  const factory = new ContractFactory(
    JSON.stringify(prepare_contract_abi(PoolInfo_JSON.abi)),
    PoolInfo_JSON.bytecode,
    deployer
  )  as PoolInfo__factory;
  
  const deployTransaction = factory.getDeployTransaction(
    addressProvider.address,
    transactionOverrides
  );

  const deploymentResult = await deployer.sendTransaction(deployTransaction);
  const deploymentReceipt = await deploymentResult.wait();
  console.log('Deployment transaction', deploymentReceipt.transactionHash)
  
  const poolInfoAddress = deploymentReceipt.contractAddress


  const addressProviderMaxId = await addressProvider.max_id()
  console.log('Address Provider max id', addressProviderMaxId.toNumber())
  
  if (addressProviderMaxId.toNumber() === 0) {
    const addNewIdResult = await addressProvider.add_new_id(
      poolInfoAddress,
      "PoolInfo Getters",
      transactionOverrides
    )
    const addNewIdReceipt = await addNewIdResult.wait()
    console.log('Address Provider new id added', addNewIdReceipt.transactionHash)

    const addressProviderMaxId = await addressProvider.max_id()
    console.log('Address Provider updated max id', addressProviderMaxId.toNumber())
  } else {
    const resultUpdateAddressProvider = await addressProvider.set_address(1, poolInfoAddress, transactionOverrides)
    const updateAddressProviderReceipt = await resultUpdateAddressProvider.wait()
    console.log('Address Provider updated', updateAddressProviderReceipt.transactionHash)
  }

  console.log('Pool Info deployed:', poolInfoAddress)

  return poolInfoAddress
}

export async function deploySwaps(
  addressProvider: AddressProvider,
  admin: string,
  deployer: Wallet
) {
  console.log('Swaps Deploy')
  const factory = new ContractFactory(
    JSON.stringify(prepare_contract_abi(Swaps_JSON.abi)),
    Swaps_JSON.bytecode,
    deployer
  )  as Swaps__factory;
  
  const deployTransaction = factory.getDeployTransaction(
    addressProvider.address,
    constants.AddressZero,
    transactionOverrides
  );

  const deploymentResult = await deployer.sendTransaction(deployTransaction);
  const deploymentReceipt = await deploymentResult.wait();
  console.log('Deployment transaction', deploymentReceipt.transactionHash)
  
  const swapsAddress = deploymentReceipt.contractAddress


  const addressProviderMaxId = await addressProvider.max_id()
  console.log('Address Provider max id', addressProviderMaxId.toNumber())
  
  if (addressProviderMaxId.toNumber() === 1) {
    const addNewIdResult = await addressProvider.add_new_id(
      swapsAddress,
      "Exchanges",
      transactionOverrides
    )
    const addNewIdReceipt = await addNewIdResult.wait()
    console.log('Address Provider new id added', addNewIdReceipt.transactionHash)

    const addressProviderMaxId = await addressProvider.max_id()
    console.log('Address Provider updated max id', addressProviderMaxId.toNumber())
  } else {
    const resultUpdateAddressProvider = await addressProvider.set_address(2, swapsAddress, transactionOverrides)
    const updateAddressProviderReceipt = await resultUpdateAddressProvider.wait()
    console.log('Address Provider updated', updateAddressProviderReceipt.transactionHash)
  }

  console.log('Swaps deployed:', swapsAddress)

  return swapsAddress
}

export async function deployERC20(
  name: string,
  decimals: number,
  admin: string,
  deployer: Wallet
): Promise<ERC20['address']> {
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

export async function deployPool(
  tokens: ERC20['address'][],
  registry: Registry['address'],
  admin: string,
  deployer: Wallet
): Promise<StableSwap3Pool['address']> {
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
  const registryContract = await connectRegistry(registry)

  const addPoolWithoutUnderlyingTx = await registryContract.add_pool_without_underlying(
    contractAddress,
    3,
    tokens[0],
    constants.HashZero,
    0,
    0,
    false,
    false,
    'pool',
    transactionOverrides,
  )
  await addPoolWithoutUnderlyingTx.wait()

  return contractAddress
}

export async function deploy() {
  const admin = translateAddress(deployer.address)

  const addressProvider = await deployAddressProvider(admin, deployer)
  console.log('address provider', addressProvider)

  const addressProviderContract = connectAddressProvider(addressProvider)

  const registry = await deployRegistry(addressProviderContract, admin, deployer)
  console.log('registry', registry)
  
  const poolInfo = await deployPoolInfo(addressProviderContract, admin, deployer)
  console.log('poolInfo', poolInfo)

  const swaps = await deploySwaps(addressProviderContract, admin, deployer)
  console.log('swaps', swaps)

  const tokenDesc = [
    { name: 'a', decimals: 18},
    { name: 'b', decimals: 6}, 
    { name: 'c', decimals: 6}, 
  ]
  const tokens = []

  for(let i = 0; i < tokenDesc.length; i++) {
    const token = await deployERC20(
      tokenDesc[i].name,
      tokenDesc[i].decimals,
      admin,
      deployer
    )
    console.log('token', tokenDesc[i].name, token)
    tokens.push(token)
  }

  const pool = await deployPool(tokens, registry, admin, deployer)
  console.log('pool', pool)

  const addresses = {
    addressProvider,
    registry,
    swaps,
    poolInfo,
    pool,
    tokenA: tokens[0],
    tokenB: tokens[1],
    tokenC: tokens[2],
  }

  overrideAddresses(addresses, `addresses.${process.env.DEPLOYMENT_ENV}.json`)
}