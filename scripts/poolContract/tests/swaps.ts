import { BigNumber, constants, Overrides, Wallet } from "ethers";
import { connectSwaps, connectRegistry } from '../connect'

import addresses from '../addresses'

import { approveToken, mintToken } from "./token";

export async function swapWithRegistry(admin: string, deployer: Wallet, transactionOverrides: Overrides) {
  const swaps = await connectSwaps(addresses.swaps)
  const registry = await connectRegistry(addresses.registry)

  if(swaps && registry) {
    console.log('Swas address', swaps.address)
    console.log('Registry address', registry.address)

    const poolAddress = await registry.pool_list(0)
    console.log(`Pool ${poolAddress}`)
    const tokensAddresses = await registry.get_coins(poolAddress, transactionOverrides)
    console.log(`Tokens ${tokensAddresses}`)
    
    const tokensAmounts: BigNumber[] = []
    for(
      let i = 0;
      i < tokensAddresses.filter(tokenAddress => tokenAddress !== constants.AddressZero).length;
      i++
    ) {
      let tokenAddress = tokensAddresses[i]

      try {
        const tokenAmount = await mintToken(
          tokenAddress,
          admin,
          deployer,
          transactionOverrides
        )
        console.log(`Amount to deposit ${tokenAddress}`, tokenAmount.toString())

        await approveToken(
          tokenAddress,
          tokenAmount,
          poolAddress,
          admin,
          deployer,
          transactionOverrides
        )

        tokensAmounts.push(tokenAmount)
      } catch(error) {
        console.error('Tokens amounts', error)
      }
    }

    console.log('Tokens Amounts', tokensAmounts.map(tokenAmount => tokenAmount.toString()))

    try {
      const getBestRate = swaps["get_best_rate(address,address,uint256)"]
      const bestExchangeRate = await getBestRate(
        tokensAddresses[0],
        tokensAddresses[1],
        tokensAmounts[0],
        transactionOverrides
      )
      console.log('bestExchangeRate pool', bestExchangeRate[0])
      console.log('bestExchangeRate amount', bestExchangeRate[1].toString())
    } catch(error) {
      console.error('get_best_rate', error)
    }
    
    const poolBalanceBeforeExchange = await registry.get_balances(poolAddress, transactionOverrides)
    console.log(
      'pool balance',
      poolBalanceBeforeExchange.map(tokenBalance => tokenBalance.toString())
    )

    const foundedPool = await registry["find_pool_for_coins(address,address)"](
      tokensAddresses[0],
      tokensAddresses[1],
    )
    console.log('pool from registry', foundedPool)

    // try {
    //   console.log('exchange with swaps', tokensAddresses[0], tokensAddresses[1])
    //   const exchange = swaps._exchang
    //   const exchangeTransaction = await exchange(
    //     foundedPool,
    //     tokensAddresses[0],
    //     tokensAddresses[1],
    //     tokensAmounts[0],
    //     BigNumber.from(0),
    //     transactionOverrides
    //   )
    //   console.log('transaction', exchangeTransaction.hash)
    //   await exchangeTransaction.wait()

    //   const poolBalanceAfterExchange = await registry.get_balances(poolAddress, transactionOverrides)
    //   console.log(
    //     'pool balance',
    //     poolBalanceAfterExchange.map(tokenBalance => tokenBalance.toString())
    //   )
    // } catch(error) {
    //   console.error('exchange_with_best_rate', error)
    // }

    // try {
    //   console.log('exchange with swaps', tokensAddresses[0], tokensAddresses[1])
    //   const exchange = swaps["exchange(address,address,address,uint256,uint256)"]
    //   const exchangeTransaction = await exchange(
    //     foundedPool,
    //     tokensAddresses[0],
    //     tokensAddresses[1],
    //     tokensAmounts[0],
    //     BigNumber.from(0),
    //     transactionOverrides
    //   )
    //   console.log('transaction', exchangeTransaction.hash)
    //   await exchangeTransaction.wait()

    //   const poolBalanceAfterExchange = await registry.get_balances(poolAddress, transactionOverrides)
    //   console.log(
    //     'pool balance',
    //     poolBalanceAfterExchange.map(tokenBalance => tokenBalance.toString())
    //   )
    // } catch(error) {
    //   console.error('exchange_with_swaps', error)
    // }

    try {
      console.log('exchange with best rate', tokensAddresses[0], tokensAddresses[1])
      const exchangeWithBestRate = swaps["exchange_with_best_rate(address,address,uint256,uint256)"]
      const exchangeTransaction = await exchangeWithBestRate(
        tokensAddresses[0],
        tokensAddresses[1],
        tokensAmounts[0],
        BigNumber.from(0),
        transactionOverrides
      )
      console.log('transaction', exchangeTransaction.hash)
      await exchangeTransaction.wait()

      const poolBalanceAfterExchange = await registry.get_balances(poolAddress, transactionOverrides)
      console.log(
        'pool balance',
        poolBalanceAfterExchange.map(tokenBalance => tokenBalance.toString())
      )
    } catch(error) {
      console.error('exchange_with_best_rate', error)
    }


    console.log('Success')
    return
  }

  console.error('Error: Registry not deployed')
}