/* eslint-disable import/no-duplicates */
import { BaseConnector } from '@meta-wallets-kit/core';
import { DefaultConnectionPayload } from '@meta-wallets-kit/core';
import type WalletConnectProvider  from '@walletconnect/ethereum-provider';
import  { EthereumProviderOptions }  from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

/* export interface EthereumProviderOptions {
  projectId: string;
  chains: number[];
  optionalChains?: number[];
  methods?: string[];
  optionalMethods?: string[];
  events?: string[];
  optionalEvents?: string[];
  showQrModal: boolean;
} */

export type ConnectWalletConnectorConfig = EthereumProviderOptions;

export interface ConnectWalletConnectionPayload extends DefaultConnectionPayload {
  provider: WalletConnectProvider;
}

export class ConnectWalletConnector extends BaseConnector<ConnectWalletConnectionPayload> {
  constructor(private config: ConnectWalletConnectorConfig) {
    super();
  }

  public async connect(): Promise<ConnectWalletConnectionPayload> {
    const WalletConnectLibrary = await import('@walletconnect/ethereum-provider');
    const Provider = WalletConnectLibrary.default;
    const provider = await Provider.init(this.config);
    // Web3Modal is disabled by default, enable it during init() to display a QR code modal
    //await provider.connect({
    //   chains, // OPTIONAL chain ids
    //   rpcMap, // OPTIONAL rpc urls
    //   pairingTopic // OPTIONAL pairing topic
    // })
// or
    await provider.enable();

    this.payload = {
      provider,
    };

    return this.payload;
  }

  public async disconnect() {
    if (this.payload) {
      /* const walletConnector = await this.payload.provider.getWalletConnector({
        disableSessionCreation: true,
      });
      await walletConnector.killSession();
      await this.payload.provider.stop(); */
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
}
