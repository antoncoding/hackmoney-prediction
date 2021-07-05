import { Token } from '../types/index'
import { SupportedNetworks, CoinTags } from './enums'

type Tokens = {
  [key in SupportedNetworks]: Token[]
}

export const tokens: Tokens = {
  [SupportedNetworks.Kovan]: [
    {
      name: 'Wrapped Ether',
      id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      symbol: 'WETH',
      decimals: 18,
      tags: [CoinTags.LongETH],
    }
  ],
}
