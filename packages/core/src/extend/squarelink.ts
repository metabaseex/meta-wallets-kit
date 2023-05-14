/* eslint-disable import/no-default-export */
declare module 'squarelink' {
  import { Provider } from '@meta-wallets-kit/provider';

  export type SquarelinkProvider = Provider & {
    enable(): Promise<void>;
  };

  export interface Network {
    url: string;
    chainId?: number;
  }

  export interface Options {
    scope: string[];
    useSync: boolean;
  }

  class Squarelink {
    constructor(clientId: string, network?: string | Network, options?: Options);

    public getProvider(): Promise<SquarelinkProvider>;
  }

  export default Squarelink;
}
