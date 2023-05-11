import type { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import type CoinbaseWalletSDKClass from '@coinbase/wallet-sdk';
import { AbstractConnector } from '@meta-wallets-kit/abstract-connector';
import { DefaultConnectionPayload, DisconnectCallback, SubscribedObject } from '@meta-wallets-kit/types';
declare type CoinbaseWalletSDKOptions = ConstructorParameters<typeof CoinbaseWalletSDKClass>[0];
export interface CoinbaseConnectionPayload extends DefaultConnectionPayload {
    provider: CoinbaseWalletProvider;
    coinbase: CoinbaseWalletSDKClass;
}
export interface CoinbaseConnectorConfig extends CoinbaseWalletSDKOptions {
    jsonRpcUrl?: string;
    chainId?: number;
}
export declare class CoinbaseConnector extends AbstractConnector<CoinbaseConnectionPayload> {
    private config;
    constructor(config: CoinbaseConnectorConfig);
    connect(): Promise<CoinbaseConnectionPayload>;
    disconnect(): Promise<void>;
    subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}
export {};
