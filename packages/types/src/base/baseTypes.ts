//declare var $: any;

type Address = string; //`0x${string}`

export type ChainConfig = {
    /** unique network Id */
    networkId: string,
    /** Human-readable name */
    showName: string,
    /** ID in number form */
    chainId: number,
    /** chain type,such as ethereum,arbitrum,okchain */
    chainType:string,
    /** Flag for test networks */
    isTestnet?: boolean,
    /** Currency used by chain */
    nativeCurrency: NativeCurrency
    /** Collection of RPC endpoints */
    rpcUrls: {
      default: RpcUrls
      public: RpcUrls
      [key: string]: RpcUrls
    }
    /** Collection of block explorers */
    blockExplorerUrls?: {
      default: BlockExplorer
      [key: string]: BlockExplorer
    }
    /** Collection of contracts */
    contracts?: {
      ensRegistry?: Contract
      ensUniversalResolver?: Contract
      multicall3?: Contract
    }
}

type BlockExplorer = {
    name: string
    url: string
}

type Contract = {
    address: Address
    blockCreated?: number
  }
  
type NativeCurrency = {
    name: string
    /** 2-6 characters long */
    symbol: string
    decimals: number
}

type RpcUrls = {
    http: readonly string[]
    webSocket?: readonly string[]
}
  
