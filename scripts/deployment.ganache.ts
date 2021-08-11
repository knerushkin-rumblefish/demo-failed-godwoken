import { providers, Wallet } from "ethers";

const DEPLOYER_PRIVATE_KEY = '0xbbfbee4961061d506ffbb11dfea64eba16355cbf1d9c29613126ba7fec0aed5d';

const localProvider = new providers.JsonRpcProvider(
  "http://localhost:7545",
)

export const provider = localProvider

export const deployer = new Wallet(
  DEPLOYER_PRIVATE_KEY,
  localProvider
);
