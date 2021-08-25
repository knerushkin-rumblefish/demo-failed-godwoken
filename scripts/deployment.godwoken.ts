import { providers } from "ethers";

import { PolyjuiceJsonRpcProvider, PolyjuiceWallet } from "@polyjuice-provider/ethers";
import { PolyjuiceHttpProvider } from "@polyjuice-provider/web3";

import { AddressTranslator } from 'nervos-godwoken-integration'
import Config from '../config.json'

if(!process.env.DEPLOYER_PRIVATE_KEY) {
  throw new Error('Set env variable DEPLOYER_PRIVATE_KEY')
}

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const polyjuiceConfig = {
  rollupTypeHash: Config.nervos.rollupTypeHash,
  ethAccountLockCodeHash: Config.nervos.ethAccountLockCodeHash,
  web3Url: Config.nervos.godwoken.rpcUrl
}


export const providerPolyjuiceEthers = new PolyjuiceJsonRpcProvider(
  polyjuiceConfig,
  Config.nervos.godwoken.rpcUrl
);

const httpProvider = new PolyjuiceHttpProvider(Config.nervos.godwoken.rpcUrl, polyjuiceConfig);
const web3Provider = new providers.Web3Provider(httpProvider)

export const provider = providerPolyjuiceEthers

export const addressTranslator = new AddressTranslator({
  CKB_URL: Config.nervos.ckb.url,
  INDEXER_URL: Config.nervos.indexer.url,
  deposit_lock_script_type_hash: Config.nervos.depositLockScriptTypeHash,
  eth_account_lock_script_type_hash: Config.nervos.ethAccountLockCodeHash,
  rollup_type_script: {
    code_hash: Config.nervos.rollupTypeScript.codeHash,
    hash_type: Config.nervos.rollupTypeScript.hashType,
    args: Config.nervos.rollupTypeScript.args,
  },
  rollup_type_hash: Config.nervos.rollupTypeHash,
  portal_wallet_lock_hash: Config.nervos.portal_wallet_lock_hash,
})

export const translateAddress = (address: string) => addressTranslator.ethAddressToGodwokenShortAddress(address)

export const deployer = new PolyjuiceWallet(
  DEPLOYER_PRIVATE_KEY,
  polyjuiceConfig,
  provider,
);
