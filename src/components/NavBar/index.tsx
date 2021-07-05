import React, { useMemo } from 'react'
import { Bar, LinkBase, ContextMenu, ContextMenuItem } from '@aragon/ui'
import ConnectButton from './ConnectButton'


function MyBar() {
  return (
    <Bar
      secondary={<ConnectButton />}
    />
  )
}

export default MyBar
