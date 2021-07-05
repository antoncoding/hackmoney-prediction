import React from 'react'
import { Bar } from '@aragon/ui'
import ConnectButton from './ConnectButton'


function MyBar() {
  return (
    <Bar
      secondary={<ConnectButton />}
    />
  )
}

export default MyBar
