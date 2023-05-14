/* eslint-disable import/no-duplicates */
import type { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import type CoinbaseWalletSDKClass from '@coinbase/wallet-sdk';
import { BaseConnector } from '@meta-wallets-kit/core';
import {
  DefaultConnectionPayload,
  DisconnectCallback,
  SubscribedObject,
} from '@meta-wallets-kit/core';

type CoinbaseWalletSDKOptions = ConstructorParameters<typeof CoinbaseWalletSDKClass>[0];

export interface CoinbaseConnectionPayload extends DefaultConnectionPayload {
  provider: CoinbaseWalletProvider;
  coinbase: CoinbaseWalletSDKClass;
}

export interface CoinbaseConnectorConfig extends CoinbaseWalletSDKOptions {
  jsonRpcUrl?: string;
  chainId?: number;
}

export class CoinbaseConnector extends BaseConnector<CoinbaseConnectionPayload> {
  
  
  constructor(private config: CoinbaseConnectorConfig) {
    super();
  }

  public async connect(): Promise<CoinbaseConnectionPayload> {
    const { jsonRpcUrl, chainId, ...ctorOptions } = this.config;

    const CoinbaseWalletSDK = (await import('@coinbase/wallet-sdk')).default;
    const coinbase = new CoinbaseWalletSDK(ctorOptions);

    const provider = coinbase.makeWeb3Provider(jsonRpcUrl, chainId);
    await provider.enable();

    this.payload = { provider, coinbase };

    return this.payload;
  }

  public async disconnect() {
    if (this.payload) {
      this.payload.coinbase.disconnect();
    }
    super.disconnect();
  }

  public async switchAccount(account: string): Promise<string | null> {
    if(account == null) return null;
    throw new Error('Method not implemented.');
  }
  public async switchOrAddChain(): Promise<number | null> {
    throw new Error('Method not implemented.');
  }
  public async addTokenToWallet(): Promise<boolean | null> {
    throw new Error('Method not implemented.');
  }

  /** event  ****/

  public subscribeDisconnect(callback: DisconnectCallback): SubscribedObject {
    return super.subscribeDisconnect((error?: any) => {
      const isRecoverableDisconnection = error?.code === 1013;
      !isRecoverableDisconnection && callback(error);
    });
  }
}
