import {  ChainConfig } from '@meta-wallets-kit/types';

export const bsc : ChainConfig = {
    networkId: 'bsc_56',  
    showName: 'BNB Smart Chain',
    chainId: 56,
    chainType:'bsc',
    isTestnet: false,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://bsc-dataseed1.binance.org'] },
        public: { http: ['https://bsc-dataseed3.binance.org'] },
    },
    blockExplorerUrls: {
        etherscan: { name: 'BscScan', url: 'https://bscscan.com' },
        default: { name: 'BscScan', url: 'https://bscscan.com' },
    },
    contracts: {
      
    },
} 