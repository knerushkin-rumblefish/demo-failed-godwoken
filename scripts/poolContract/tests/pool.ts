import { BigNumber, Overrides, Wallet } from 'ethers'
import { LPToken, StableSwap3Pool } from '../../../types/vy_contracts'
import { transactionOverrides } from '../../deployment'
import addresses from '../addresses'
import { connectPool } from '../connect'
import { approveToken, mintToken } from './token'

const pool = connectPool(addresses.pool)

export async function readPoolBalances() {
  try {
    for(let i = 0; i < 3; i++) {
      const balance = await pool.balances(i, transactionOverrides)
      const coin = await pool.coins(i, transactionOverrides)
      console.log('pool balance', coin, balance.toString())
    }
  } catch (error) {
    console.error(error)
  }
}
setLPMinter
export async function addLiquidity(
  pool: StableSwap3Pool,
  tokensAddresses: string[],
  admin: string,
  deployer: Wallet,
  transactionOverrides: Overrides
) {
  const tokensAmounts: BigNumber[] = []
  console.log('Pool Tokens')
  for(let tokenAddress of tokensAddresses) {
    try {
      const tokenAmount = await mintToken(tokenAddress, admin, deployer, transactionOverrides)
      console.log(`Amount to deposit ${tokenAddress}`, tokenAmount.toString())

      await approveToken(
        tokenAddress,
        tokenAmount,
        pool.address,
        admin,
        deployer,
        transactionOverrides
      )

      tokensAmounts.push(tokenAmount)
    } catch(error) {
      console.error(error)
    }
  }

  try {
    console.log('Add initial liquidity', pool.address, tokensAmounts.map(amount => amount.toString()))

    const addLiquidityRequest = await pool.add_liquidity(
      tokensAmounts as [BigNumber, BigNumber, BigNumber],
      BigNumber.from(0),
      transactionOverrides
    )
    console.log('Add initial liquidity request', addLiquidityRequest.hash)

    const addLiquidityReceipt = await addLiquidityRequest.wait()
    console.log('Initial liquidity added', addLiquidityReceipt.transactionHash)
  } catch(error) {
    console.error('add initial liquidity', error)
  }
}

export async function setLPMinter(
  lpToken: LPToken,
  poolAddress: string,
  admin: string,
  deployer: Wallet,
  transactionOverrides: Overrides
) {

  try {
    console.log('Set LP token minter')
    const setMinterTransaction = await lpToken.set_minter(poolAddress, transactionOverrides)

    await setMinterTransaction.wait()
    console.log('LP token Minter', poolAddress)
  } catch(error) {
    console.error('add initial liquidity', error)
  }
}