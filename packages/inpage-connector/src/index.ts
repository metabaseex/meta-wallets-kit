import { BaseConnector,TokenConfig,ChainWrapper } from '@meta-wallets-kit/core';
import {  DefaultConnectionPayload,DisconnectCallback, SubscribedObject,} from '@meta-wallets-kit/core';

import { InpageProvider } from './@types/extend-window';
import { MetaMaskWalletSdk } from './sdk/metamask';

/** Export Targets */
export { InpageProvider };

export interface InpageConnectionPayload extends DefaultConnectionPayload {
  provider: InpageProvider;
  isMetamask:boolean;
}

export class InpageConnector extends BaseConnector<InpageConnectionPayload> { 
  
  metaMask:MetaMaskWalletSdk = new MetaMaskWalletSdk();

  constructor(){
    super();
  }

  public async connect(): Promise<InpageConnectionPayload> {
    let provider: InpageProvider = window.ethereum || window.web3?.currentProvider;

    // edge case if Metamask and Coinbase extensions are both installed
    if (Array.isArray(provider?.providers)) {
      provider = provider.providers.find((x: InpageProvider) => x.isMetaMask) || provider;
    }

    if (!provider) {
      throw new Error(
        'Web3 provider not found! Please install the Web3 extension (e.g. Metamask) or use the Web3 browser (e.g. TrustWallet on your mobile device).',
      );
    }
    
    let isMetamask = this.metaMask.isMetaMask();

    if(isMetamask){
        await this.metaMask.connect();
    }else{
      if (provider.enable) {
        await provider.enable();
      }
    }

    this.payload = { provider, isMetamask };

    return this.payload;
  }

  public async switchAccount(account:string) : Promise<string | null>{
    if(account == null || account=='') return null;

    await this.metaMask.switchAccount(account);
    
    return account;
  }

  public async switchOrAddChain(networkId:string) : Promise<number | null>{
    let chainList:ChainWrapper = new ChainWrapper();
    let chainConfig = chainList.getChainConfig(networkId);
    if(chainConfig == undefined){
      return null;
    }

    return await this.metaMask.switchOrAddChain(chainConfig);
  }

  public async addTokenToWallet(token:TokenConfig) : Promise<boolean | null>{
    if(token == null ) return null;

    return await this.metaMask.addTokenToWallet(
      token.symbol,token.address,token.imageURL,token.decimals,token.type
    );
  }

  public subscribeDisconnect(callback: DisconnectCallback): SubscribedObject {
    return super.subscribeDisconnect((error?: any) => {
      const isRecoverableMetamaskDisconnection = (this.payload?.provider?.isMetaMask && error?.code === 1013);
      !isRecoverableMetamaskDisconnection && callback(error);
    });
  }


}
