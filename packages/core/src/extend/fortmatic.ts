/* eslint-disable import/no-default-export */
declare module 'fortmatic' {
  import type { BaseProvider } from 'meta-base-provider';

  export interface FortmaticProvider extends BaseProvider {
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
