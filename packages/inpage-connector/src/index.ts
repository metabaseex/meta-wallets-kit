import { AbstractConnector } from '@meta-wallets-kit/abstract-connector';
import {
  DefaultConnectionPayload,
  DisconnectCallback,
  SubscribedObject,
} from '@meta-wallets-kit/types';

import { InpageProvider } from './@types/extend-window';

export { InpageProvider };

export interface InpageConnectionPayload extends DefaultConnectionPayload {
  provider: InpageProvider;
  isMetamask:boolean,
}

export class InpageConnector extends AbstractConnector<InpageConnectionPayload> {

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
    
    let isMetamask = typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;

    if(isMetamask){
        const result: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if(result.length>0){
          
        }
    }else{
      if (provider.enable) {
        await provider.enable();
      }
    }

    

    this.payload = {
      provider,
      isMetamask
    };

    return this.payload;
  }

  public async switchAccount(account:string) : Promise<string | null>{
    let current = null;
    if(account == null || account=='') return null;
    // if(!this.payload?){
    //   return null;
    // }

    return current;
  }

  public async switchOrAddChain() : Promise<number | null>{
    

    return null;
  }

  public async addTokenToWallet() : Promise<boolean | null>{


    return null;
  }

  public subscribeDisconnect(callback: DisconnectCallback): SubscribedObject {
    return super.subscribeDisconnect((error?: any) => {
      const isRecoverableMetamaskDisconnection =
        this.payload?.provider?.isMetaMask && error?.code === 1013;
      !isRecoverableMetamaskDisconnection && callback(error);
    });
  }
}
