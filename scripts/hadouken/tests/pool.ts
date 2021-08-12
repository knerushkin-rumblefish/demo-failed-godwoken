import { transactionOverrides } from '../../deployment'
import addresses from '../addresses'
import { connectPool } from '../connect'

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