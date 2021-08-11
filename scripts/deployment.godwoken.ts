import { providers } from "ethers";

import { PolyjuiceJsonRpcProvider, PolyjuiceWallet } from "@polyjuice-provider/ethers";
import { PolyjuiceHttpProvider } from "@polyjuice-provider/web3";

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

export const deployer = new PolyjuiceWallet(
  DEPLOYER_PRIVATE_KEY,
  polyjuiceConfig,
  provider
);
