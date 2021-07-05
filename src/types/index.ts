export type Token = {
  id: string
  name: string
  symbol: string
  decimals: number
  mintable?: boolean
  coingeckId?: string
  tags: string[]
}

export type Game = {
    epoch : string
    startBlock : string
    lockBlock : string
    endBlock : string
    totalAmount : string
    bullAmount : string
    bearAmount : string
    rewardBaseCalAmount : string
    rewardAmount : string
    answer : string
    oracleId : string
    oracleCalled : boolean
}
