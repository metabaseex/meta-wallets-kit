import {  ChainConfig } from '@meta-wallets-kit/types';

export const ethMain : ChainConfig = {
    networkId: 'eth_1',  
    showName: 'Ethereum Mainnet',
    chainId: 1,
    /** chain type,such as ethereum,arbitrum,okchain */
    chainType:'ethereum',
    /** Flag for test networks */
    isTestnet: false,
    /** Currency used by chain */
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    /** Collection of RPC endpoints */
    rpcUrls: {
        default: {
            http: ['https://cloudflare-eth.com'],
        },
        public: {
            http: ['https://cloudflare-eth.com'],
        },
        alchemy: {
            http: ['https://eth-mainnet.g.alchemy.com/v2'],
            webSocket: ['wss://eth-mainnet.g.alchemy.com/v2'],
        },
        infura: {
            http: ['https://mainnet.infura.io/v3'],
            webSocket: ['wss://mainnet.infura.io/ws/v3'],
        },
    },
    /** Collection of block explorers */
    blockExplorerUrls: {
        default: {
            name: 'Etherscan',
            url: 'https://etherscan.io',
        },
        etherscan: {
            name: 'Etherscan',
            url: 'https://etherscan.io',
        },
    },
    /** Collection of contracts */
    contracts: {
      
    },
} 