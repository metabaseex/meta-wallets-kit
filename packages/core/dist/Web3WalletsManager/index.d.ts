import * as Web3ProvidersWs from 'web3-providers-ws';
import * as Web3ProvidersHttp from 'web3-providers-http';
import { Connector, Provider } from '@meta-wallets-kit/types';
import { ConnectResult } from './types';
export * from './types';
declare const WebsocketProvider: typeof Web3ProvidersWs.WebsocketProvider;
declare const HttpProvider: typeof Web3ProvidersHttp.HttpProvider;
declare type WebsocketProviderOptions = ConstructorParameters<typeof WebsocketProvider>[1];
declare type HttpProviderOptions = ConstructorParameters<typeof HttpProvider>[1];
declare type InfuraNetwork = 'rinkeby' | 'kovan' | 'mainnet' | 'ropsten' | 'goerli';
interface Options<W> {
    defaultProvider: OptionsOfDefaultProvider;
    makeWeb3(provider: Provider): W;
}
declare type OptionsOfDefaultProvider = {
    httpRpcUrl: string;
    options?: HttpProviderOptions;
} | {
    wsRpcUrl: string;
    options?: WebsocketProviderOptions;
} | {
    infuraAccessToken: string;
    /** default: 'mainnet' */
    network?: InfuraNetwork;
    options?: WebsocketProviderOptions;
};
export declare class Web3WalletsManager<W> {
    web3: W;
    txWeb3: any;
    account: any;
    chainId: any;
    status: any;
    private options;
    private activeConnector;
    private accountSubscription;
    private chainIdSubscription;
    private disconnectSubscription;
    constructor(options: Options<W>);
    connect(connector: Connector): Promise<ConnectResult>;
    disconnect(): Promise<void>;
    private resetState;
    private checkOptions;
    private getDefaultProvider;
    private handleAccountChange;
    private handleChainIdChange;
    private handleDisconnect;
}
export declare function assertNever(value: never): never;
