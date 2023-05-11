import { AbstractConnector } from '@meta-wallets-kit/abstract-connector';
import { DefaultConnectionPayload } from '@meta-wallets-kit/types';
import type WalletConnectProvider from '@walletconnect/web3-provider';
import type { IWalletConnectProviderOptions } from '@walletconnect/types';
export declare type ConnectWalletConnectorConfig = IWalletConnectProviderOptions;
export interface ConnectWalletConnectionPayload extends DefaultConnectionPayload {
    provider: WalletConnectProvider;
}
export declare class ConnectWalletConnector extends AbstractConnector<ConnectWalletConnectionPayload> {
    private config;
    constructor(config: ConnectWalletConnectorConfig);
    connect(): Promise<ConnectWalletConnectionPayload>;
    disconnect(): Promise<void>;
}
