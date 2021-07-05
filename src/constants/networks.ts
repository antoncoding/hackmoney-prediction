import { SupportedNetworks } from './enums'

export const networkIdToTxUrl = {
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io/tx',
}

export const networkIdToAddressUrl = {
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io/address',
}
