import { Provider } from '@meta-wallets-kit/core';

export type InpageProvider = Provider & {
  enable?(): Promise<void>;
};

declare global {
  interface Window {
    web3?: {
      currentProvider?: unknown;
    };
    ethereum?: any;
  }
}
