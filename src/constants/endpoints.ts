import { SupportedNetworks } from './enums'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

export const subgraph: graphEndPointType = {
  [SupportedNetworks.Kovan]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-kovan',
}
