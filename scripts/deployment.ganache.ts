import { providers, Wallet } from "ethers";


if(!process.env.DEPLOYER_PRIVATE_KEY) {
  throw new Error('Set env variable DEPLOYER_PRIVATE_KEY')
}

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const localProvider = new providers.JsonRpcProvider(
  "http://localhost:7545",
)

export const translateAddress = (address: string) => address

export const provider = localProvider

export const deployer = new Wallet(
  DEPLOYER_PRIVATE_KEY,
  localProvider
);
