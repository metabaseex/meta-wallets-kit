/* eslint-disable import/no-duplicates */
import type { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import type CoinbaseWalletSDKClass from '@coinbase/wallet-sdk';
import { BaseConnector,TokenConfig } from '@meta-wallets-kit/core';
import { BaseConnectionPayload } from '@meta-wallets-kit/core';

type CoinbaseWalletSDKOptions = ConstructorParameters<typeof CoinbaseWalletSDKClass>[0];

export interface CoinbaseConnectionPayload extends BaseConnectionPayload {
  provider: CoinbaseWalletProvider;
  coinbase: CoinbaseWalletSDKClass;
}

export interface CoinbaseConnectorConfig extends CoinbaseWalletSDKOptions {
  jsonRpcUrl?: string;
  chainId?: number;
}

export class CoinbaseConnector extends BaseConnector<CoinbaseConnectionPayload> {
  
  public readonly name: string='Coinbase Connector';

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

    //subscrib events
    super.subscribeEvents(provider);

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
  public async switchOrAddChain(networkId:string): Promise<number | null> {
    if(networkId==null) return null;
    return null;
  }
  public async addTokenToWallet(token:TokenConfig): Promise<boolean | null> {
    if(token == null ) return null;
    return null;
  }

  public async getChainId(): Promise<number | null>{
    return null;
  }

  public async getAccount(): Promise<string | null> {
  }

  /** event  ****/

  // public subscribeDisconnect(callback: DisconnectCallback): SubscribedObject {
  //   return super.subscribeDisconnect((error?: any) => {
  //     const isRecoverableDisconnection = error?.code === 1013;
  //     !isRecoverableDisconnection && callback(error);
  //   });
  // }
}
