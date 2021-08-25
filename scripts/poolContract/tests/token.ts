import { BigNumber, Overrides, Wallet } from 'ethers'
import { connectToken } from '../connect'

export async function approveToken(
  tokenAddress:string,
  amount: BigNumber, 
  spender: string,
  admin: string,
  deployer: Wallet,
  transactionOverrides: Overrides,
) {
  const tokenContract = connectToken(tokenAddress)

  const tokenSymbol = await tokenContract.symbol()
  console.log(`Token ${tokenSymbol} approve`)

  const approveTokenRequest = await tokenContract.approve(spender, amount, transactionOverrides)
  const approveTokenResponse = await approveTokenRequest.wait()
  console.log(`Token ${tokenAddress} approved`, approveTokenResponse.transactionHash)

  const allowance = await tokenContract.callStatic.allowance(admin, spender)
  console.log(`Token allowance`, allowance.toString())
}

export async function mintToken(
  tokenAddress: string,
  admin: string,
  deployer: Wallet,
  transactionOverrides: Overrides,
) {
  const tokenContract = connectToken(tokenAddress)
  
  // To correspond Force Bridge ERC20 implementation claimTestToken ming const amount of token for address
  // and not any amount for method callee.
  // Force Bridge ERC20 implementation mint 100 of token amount (with decimal taking into account)
  const mintToken = await tokenContract.claimTestToken(
    admin,
    transactionOverrides
  )
  await mintToken.wait()

  const balance = await tokenContract.balanceOf(admin)
  console.log(`Deployer ${tokenAddress} balance`, balance.toString())

  return balance
}