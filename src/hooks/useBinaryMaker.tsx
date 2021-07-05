import { useMemo, useCallback, useState, useEffect } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'

import { BinaryMaker } from '../constants'

const abi = require('../constants/abis/bet.json')

export function useBinaryMaker() {
  const { web3, user } = useConnectedWallet()

  const [currentEpoch, setCurrentEpoch] = useState(0)

  const { notifyCallback } = useNotify()

  const binaryMaker = useMemo(() => {
    return new web3.eth.Contract(abi, BinaryMaker)
  }, [web3])

  useEffect(() => {
    let isCancelled = false 
    async function updateCurrentEpoch() {
      const epoch = await binaryMaker.methods.currentEpoch().call()
      if (!isCancelled) {
        setCurrentEpoch(epoch)
      }
    }
    updateCurrentEpoch()
    const id = setInterval(updateCurrentEpoch, 30 * 1000)

    // cleanup function: remove interval
    return () => {
      isCancelled = true
      clearInterval(id)
    }
  }, [binaryMaker])

  const betBull = useCallback(
    async (amount: string) => {
      await binaryMaker.methods
        .betBull(currentEpoch)
        .send({ from: user, value: amount })
        .on('transactionHash', notifyCallback)
    },
    [binaryMaker, notifyCallback, user],
  )

  const betBear = useCallback(
    async (amount: string) => {
      await binaryMaker.methods
        .betBear(currentEpoch)
        .send({ from: user, value: amount })
        .on('transactionHash', notifyCallback)
    },
    [binaryMaker, notifyCallback, user],
  )

  return { betBull, betBear, currentEpoch }
}
