/* eslint-disable import/no-default-export */
declare module 'fortmatic' {
  import { Provider } from '@meta-wallets-kit/core';

  export interface FortmaticProvider extends Provider {
    enable(): Promise<void>;
  }

  export interface CustomNodeOptions {
    rpcUrl: string;
    chainId: number;
  }

  export interface User {
    login(): Promise<void>;
    logout(): void;
    getUser: unknown;
    getBalances: unknown;
    getTransactions: unknown;
    isLoggedIn: unknown;
    settings: unknown;
    deposit: unknown;
  }

  class Fortmatic {
    user: User;

    constructor(
      apiKey: string,
      network?: 'rinkeby' | 'kovan' | 'ropsten' | 'mainnet' | CustomNodeOptions,
    );

    getProvider(): FortmaticProvider;
  }

  export default Fortmatic;
}
