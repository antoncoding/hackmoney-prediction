import { useMemo, useCallback, useState, useEffect } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'

import { BinaryMaker } from '../constants'
import { Game } from '../types/index'

const abi = require('../constants/abis/bet.json')

export function useBinaryMaker() {
  const { web3, user } = useConnectedWallet()

  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [game, setGame] = useState<null| Game>(null)

  const { notifyCallback } = useNotify()

  const binaryMaker = useMemo(() => {
    return new web3.eth.Contract(abi, BinaryMaker)
  }, [web3])

  useEffect(() => {
    let isCancelled = false 
    async function updateCurrentEpoch() {
      const epoch = await binaryMaker.methods.currentEpoch().call()
      console.log(`epoch`, epoch)
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

  // set game
  useEffect(() => {
    let isCancelled = false 
    async function updateGame() {
      if (currentEpoch  === 0) return;
      const game = await binaryMaker.methods.games(currentEpoch - 1).call()
      if (!isCancelled) {
        setGame(game)
      }
    }
    updateGame()
    const id = setInterval(updateGame, 30 * 1000)
    
    return () => {
      isCancelled = true
      clearInterval(id)
    }
  }, [currentEpoch, binaryMaker])

  const betBull = useCallback(
    
    async (amount: string) => {
      console.log(`currentEpoch`, currentEpoch)
      await binaryMaker.methods
        .betBull(currentEpoch)
        .send({ from: user, value: amount })
        .on('transactionHash', notifyCallback)
    },
    [binaryMaker, notifyCallback, user, currentEpoch],
  )

  const betBear = useCallback(
    async (amount: string) => {
      await binaryMaker.methods
        .betBear(currentEpoch)
        .send({ from: user, value: amount })
        .on('transactionHash', notifyCallback)
    },
    [binaryMaker, notifyCallback, user, currentEpoch],
  )

  return { betBull, betBear, currentEpoch, game }
}
