import {  ChainConfig } from '@meta-wallets-kit/types';

export const bscTestnet : ChainConfig = {
    networkId: 'bsc_97',  
    showName: 'BSC Testnet',
    chainId: 97,
    chainType:'bsc',
    isTestnet: false,
    nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
        public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
    },
    blockExplorerUrls: {
        etherscan: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
        default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
    },
    contracts: {
      
    },
} 