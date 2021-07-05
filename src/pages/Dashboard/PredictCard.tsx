import React from 'react'
import { Box, Button, useTheme } from '@aragon/ui'

import { useBinaryMaker } from '../../hooks'
import { Entry, EntryTitle } from '../../components/Entry'


function PredictCard() {
  const { betBear, betBull, currentEpoch } = useBinaryMaker()

  const theme = useTheme()

  return (
    <div style={{ maxWidth: 350 }}>
      <Box
        heading={`Epoch ${currentEpoch}`}
      >

        <Entry>
          <EntryTitle> Last Price </EntryTitle>
          <div style={{ color: theme.positive }}> 2200 </div>
        </Entry>
        <Entry>
          <EntryTitle> Price Pool </EntryTitle>
          <div style={{ color: theme.positive }}> 2200 </div>
        </Entry>

        <br />

        <Button wide onClick={betBull} mode={'positive'}>
          Up
      </Button>
        <Button wide onClick={betBear} mode={'negative'}>
          Down
      </Button>

      </Box>
    </div>
  )
}

export default PredictCard
