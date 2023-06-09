import { BaseConnector,TokenConfig,ChainWrapper } from '@meta-wallets-kit/core';
import {  BaseConnectionPayload,} from '@meta-wallets-kit/core';

import { InpageProvider } from './@types/extend-window';
import { MetaMaskWalletSdk } from './sdk/metamask';
import { getAccount, getChainId } from '@meta-wallets-kit/core';

/** Export Targets */
export { InpageProvider };

export interface InpageConnectionPayload extends BaseConnectionPayload {
  provider: InpageProvider;
  isMetamask:boolean;
}

export class InpageConnector extends BaseConnector<InpageConnectionPayload> { 
  
  public readonly name: string='Inject Connector';

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

    
    //subscrib events
    super.subscribeEvents(provider);

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

  public async getAccount(): Promise<string | null> {
    if (!this.payload) {
        return null;
    }

    const { account, sendingInterface } = await getAccount(
        this.payload.provider,
        this.sendingInterface,
    );

    this.sendingInterface = sendingInterface;

    return account;
  }

  public async getChainId(): Promise<number | null> {
    if (!this.payload) {
      return null;
    }

    const { chainId, sendingInterface } = await getChainId(
        this.payload.provider,
        this.sendingInterface,
    );

    this.sendingInterface = sendingInterface;

    return chainId;
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
}
