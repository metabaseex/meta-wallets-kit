/* eslint-disable import/no-default-export */
declare module 'squarelink' {
  import { BaseProvider } from 'meta-base-provider';

  export type SquarelinkProvider = BaseProvider & {
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
