import { useMemo, useCallback } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'

import { BinaryMaker } from '../constants'

const abi = require('../constants/abis/hTokenFactory.json')

export function useBinaryMaker() {
  const { web3, user } = useConnectedWallet()

  const { notifyCallback } = useNotify()

  const binaryMaker = useMemo(() => {
    return new web3.eth.Contract(abi, BinaryMaker)
  }, [web3])

  const betBull = useCallback(
    async (
      token: string,
      penalty: string,
      lockWindow: string,
      expiry: string,
      fee: string,
      n: string,
      feeRecipient: string,
      bonusToken: string,
    ) => {
      await binaryMaker.methods
        .createHodlERC20(token, penalty, lockWindow, expiry, fee, n, feeRecipient, bonusToken)
        .send({ from: user })
        .on('transactionHash', notifyCallback)
    },
    [binaryMaker, notifyCallback, user]
  )

    const betBear = useCallback(
      async (
        token: string,
        penalty: string,
        lockWindow: string,
        expiry: string,
        fee: string,
        n: string,
        feeRecipient: string,
        bonusToken: string,
      ) => {
        await binaryMaker.methods
          .createHodlERC20(token, penalty, lockWindow, expiry, fee, n, feeRecipient, bonusToken)
          .send({ from: user })
          .on('transactionHash', notifyCallback)
      },
      [binaryMaker, notifyCallback, user],
  )

  return { betBull, betBear }
}
