/* eslint-disable import/no-duplicates */
import { AbstractConnector } from '@meta-wallets-kit/abstract-connector';
import { DefaultConnectionPayload } from '@meta-wallets-kit/types';
import type WalletConnectProvider from '@walletconnect/web3-provider';
import type { IWalletConnectProviderOptions } from '@walletconnect/types';

export type ConnectWalletConnectorConfig = IWalletConnectProviderOptions;

export interface ConnectWalletConnectionPayload extends DefaultConnectionPayload {
  provider: WalletConnectProvider;
}

export class ConnectWalletConnector extends AbstractConnector<ConnectWalletConnectionPayload> {
  constructor(private config: ConnectWalletConnectorConfig) {
    super();
  }

  public async connect(): Promise<ConnectWalletConnectionPayload> {
    const WalletConnectLibrary = await import('@walletconnect/web3-provider');
    const Provider = WalletConnectLibrary.default;
    const provider = new Provider(this.config);

    await provider.enable();

    this.payload = {
      provider,
    };

    return this.payload;
  }

  public async disconnect() {
    if (this.payload) {
      const walletConnector = await this.payload.provider.getWalletConnector({
        disableSessionCreation: true,
      });
      await walletConnector.killSession();
      await this.payload.provider.stop();
    }
    super.disconnect();
  }

  public async switchAccount(account: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  public async switchOrAddChain(): Promise<number | null> {
    throw new Error('Method not implemented.');
  }
  public async addTokenToWallet(): Promise<boolean | null> {
    throw new Error('Method not implemented.');
  }
}
