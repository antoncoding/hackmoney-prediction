import React, { useState, useMemo } from 'react'
import { Box, Button, useTheme, TextInput } from '@aragon/ui'

import { useBinaryMaker, useTokenPrice } from '../../hooks'
import { Entry, EntryTitle } from '../../components/Entry'
import { fromTokenAmount, toTokenAmount } from '../../utils/math'
import BigNumber from 'bignumber.js'


function PredictCard() {
  const { betBear, betBull, currentEpoch, game } = useBinaryMaker()


  // use eth price for volume··
  const ethPrice = useTokenPrice('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')

  const theme = useTheme()

  const [ethValue, setETHValue] = useState(0)

  const bullPercentage = useMemo(() => game && game.totalAmount !== '0' ? new BigNumber(game.bullAmount).div(new BigNumber(game.totalAmount)).times(100).toString() : '50', [game]) 
  const bearPercentage = useMemo(() => game && game.totalAmount !== '0' ? new BigNumber(game.bearAmount).div(new BigNumber(game.totalAmount)).times(100).toString() : '50', [game]) 

  return (
    <div style={{ maxWidth: 350 }}>
      <Box
        heading={`Epoch ${currentEpoch}`}
      >

        <Entry>
          <EntryTitle> Last Volume </EntryTitle>
          <div style={{ color: theme.positive }}> {ethPrice.toString()}M </div>
        </Entry>
        <Entry>
          <EntryTitle> Price Pool </EntryTitle>
          <div> { game ? toTokenAmount(game.totalAmount, 18).toString() : 0 } </div>
        </Entry>
        <Entry>
          <EntryTitle> Price Pool </EntryTitle>
          <div> { game ? toTokenAmount(game.totalAmount, 18).toString() : 0 } </div>
        </Entry>

        <br />

        <TextInput 
          wide 
          type="number" 
          value={ethValue} 
          onChange={(event) => setETHValue(event.target.value)}
          adornment={'ETH'}
          adornmentPosition="end"
        />

        <Button wide onClick={() => betBull( fromTokenAmount(ethValue, 18).toString() )} mode={'positive'}>
          Up ({bullPercentage}%)
      </Button>
        <Button wide onClick={() => betBear( fromTokenAmount(ethValue, 18).toString() )} mode={'negative'}>
          Down ({bearPercentage}%)
      </Button>

      </Box>
    </div>
  )
}

export default PredictCard
