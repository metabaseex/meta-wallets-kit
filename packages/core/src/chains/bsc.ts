import {  ChainConfig } from '../model';

export const bsc : ChainConfig = {
    networkId: 'bsc_56',  
    showName: 'BNB Smart Chain',
    chainNo: 56,
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