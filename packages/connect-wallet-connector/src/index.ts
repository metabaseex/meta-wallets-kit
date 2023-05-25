/* eslint-disable import/no-duplicates */
import { BaseConnector,TokenConfig,ChainWrapper } from '@meta-wallets-kit/core';
import { DefaultConnectionPayload, } from '@meta-wallets-kit/core';
import type WalletConnectProvider  from '@walletconnect/ethereum-provider';
import  { EthereumProviderOptions }  from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { EthereumProvider  } from '@walletconnect/ethereum-provider';

export type ConnectWalletConnectorConfig = EthereumProviderOptions;

export interface ConnectWalletConnectionPayload extends DefaultConnectionPayload {
  provider: WalletConnectProvider;
}

export class ConnectWalletConnector extends BaseConnector<ConnectWalletConnectionPayload> {

  public readonly name: string='Wallet Connect';

  constructor(private config: ConnectWalletConnectorConfig) {
    super();
  }

  public async connect(): Promise<ConnectWalletConnectionPayload> {
    //const WalletConnectLibrary = await import('@walletconnect/ethereum-provider');
    //const ethProvider = WalletConnectLibrary.default;
    const provider = await EthereumProvider.init(this.config);
    // Web3Modal is disabled by default, enable it during init() to display a QR code modal
    //await provider.connect({
    //   chains, // OPTIONAL chain ids
    //   rpcMap, // OPTIONAL rpc urls
    //   pairingTopic // OPTIONAL pairing topic
    // })
    // or
    if(this.config.showQrModal){
      //use web3 modal
      await provider.enable();
    }else{
      //custom handle message
      provider.on("display_uri", (uri: string) => {
        // ... custom logic
        console.log('kits:connect wallet:');
        console.log(uri);
        this.emit('message',{type:'display_uri',data: uri});
      });
      await provider.connect();
    }
    
    this.payload = { provider,};

    return this.payload;
  }

  public async disconnect() {
    super.unSubScribeEvents();
    super.disconnect();
    
  }

  public async switchAccount(account: string): Promise<string | null> {
    if(account == null || account=='') return null;
    if(this.payload == null || this.payload.provider == null) return null;
    try {
        const result: string[] = await this.payload?.provider.request({
        method: "wallet_requestPermissions",
        params: [
            {
                eth_accounts: { account },
            },
        ],
        });
        return result[0];
    } catch (e) {
        return "Error: Unable to execute request: " + e?.message;
    }
  }
  public async switchOrAddChain(networkId:string): Promise<number | null> {
    if(networkId == null || networkId=='') return null;
    if(this.payload == null || this.payload.provider == null) return null;
    let chainList:ChainWrapper = new ChainWrapper();
    let chainConfig = chainList.getChainConfig(networkId);
    if(chainConfig == undefined){
      return null;
    }

    let chainId = chainConfig?.chainId;
        const chainIdHex = "0x" + parseInt(chainId.toString(), 10).toString(16);
        try {
           return  await this.payload?.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainIdHex }],
            });
        } catch (switchError) {
        }

        return null;

  }
  public async addTokenToWallet(token:TokenConfig): Promise<boolean | null> {
    if(token == null ) return null;
    if(this.payload == null || this.payload.provider == null) return null;
    return await this.payload?.provider.request({
        method: "wallet_watchAsset",
        params: {
            type:token.type,
            options: {
                address:token.address, // The address that the token is at.
                symbol:token.symbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals:token.decimals, // The number of decimals in the token
                image: token.imageURL, // A string url of the token logo
            },
        },
    });
  }
}
