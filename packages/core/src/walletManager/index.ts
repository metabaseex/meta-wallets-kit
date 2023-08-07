import { BehaviorSubject } from 'rxjs';
import * as Web3ProvidersWs from 'web3-providers-ws';
import * as Web3ProvidersHttp from 'web3-providers-http';
import { BaseConnector, BaseConnectionPayload, IConnector } from '../base';
import type { BaseProvider } from 'meta-base-provider';

import { ConnectResult, ConnectionStatus } from './types';

export * from './types';

import { ChainWrapper } from '../chains';
import { ChainConfig } from '../model';

const WebsocketProvider = (Web3ProvidersWs as unknown) as typeof Web3ProvidersWs.WebsocketProvider;
const HttpProvider = (Web3ProvidersHttp as unknown) as typeof Web3ProvidersHttp.HttpProvider;

type WebsocketProviderOptions = ConstructorParameters<typeof WebsocketProvider>[1];
type HttpProviderOptions = ConstructorParameters<typeof HttpProvider>[1];

//type InfuraNetwork = 'rinkeby' | 'kovan' | 'mainnet' | 'ropsten' | 'goerli';

interface ProviderOptions<W> {
  makeWeb3Client(provider: BaseProvider ): W;
}

type ConfigOfChain = {
  networkId: string;
  chainNum: Number;
}

type ConfigOfPublicProvider =
  {
    autoConnect?:boolean;
    protocol?: string; // https or wss
    rpcUrl?: string;
    infuraKey?: string;
    options?: HttpProviderOptions | WebsocketProviderOptions | undefined;
  }

export class Web3WalletsManager<W> {
  //global
  private options: ProviderOptions<W>;
  public hasChainConfig: boolean = false; 
  public chainConfig: ConfigOfChain = { networkId:'', chainNum:1,};
  //wallet provider
  public wallectClient = new BehaviorSubject<W | null>(null);
  public account = new BehaviorSubject<string | null>(null);
  public chainId = new BehaviorSubject<number | null>(null);
  public status = new BehaviorSubject<ConnectionStatus>('disconnected');
  private activeConnector: IConnector | null = null;

  
  //user local client,for some local query function,
  //optional to use,unnecessary to create
  public localConfig: ConfigOfPublicProvider = {};
  public localClient: any | undefined;
  public hasLocalClient:boolean = false;

  constructor(options: ProviderOptions<W>) {
    this.options = {
      ...options,
    };
    //init web manager
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleChainIdChange = this.handleChainIdChange.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }
  //init or reset targetChain
  public async setTargetChain(config: ConfigOfChain){
    //check if switch chain?
    this.chainConfig = {
      ...config,
    };
    this.hasChainConfig = true;
  } 

  public async connect(connector: BaseConnector<BaseConnectionPayload>): Promise<ConnectResult> {
    //await this.disconnect();
    this.activeConnector = connector;
    const { makeWeb3Client } = this.options;
    try {
      this.status.next('pending');

      const { provider } = await connector.connect();
      const web3 = makeWeb3Client(provider);
      this.wallectClient.next(web3);

      const account = await getAccount(connector);
      this.account.next(account);

      const chainId = await getChainId(connector);
      this.chainId.next(chainId);

      this.status.next('connected');

      connector.emit("connected",{ account: account as string,chainId:chainId });

      return { provider, account, chainId };
    } catch (error) {
      this.disconnect();
      throw error;
    }
  }

  public async disconnect() {
    try {
      this.activeConnector && (await this.activeConnector.disconnect());
    } finally {
      this.resetState();
    }
  }

  public getChainConfig(networkId: string) : ChainConfig | null{
    let chainList:ChainWrapper = new ChainWrapper();
    let chainConfig = chainList.getChainConfig(networkId);
    if(chainConfig == undefined){
      return null;
    }
    return chainConfig;
  }

  /*** Optional Function: Local Rpc Client */
  public async createLocalClient(localConfig: ConfigOfPublicProvider){
    if(!this.hasChainConfig){
      console.log('meta: chain config first');
      return;
    }
    this.localConfig = {
      autoConnect: true,
      protocol: 'https', // https or wss
      rpcUrl: '',
      infuraKey: '',
      ...localConfig
    }
    this.localClient = this.options.makeWeb3Client(this.getLocalProvider());
    this.hasLocalClient = true;
  }

  public async destroyLocalClient(){
    if(this.hasLocalClient){
      if(this.localClient instanceof HttpProvider){
        if(this.localClient.connected){
          this.localClient.disconnect();
        }
      }else if(this.localClient instanceof WebsocketProvider){
        if(this.localClient.connected){
          this.localClient.disconnect(0,'');
        }
      }
      this.localClient =  undefined ;
    }
    this.hasLocalClient = false;
  }

  /************ private method *******/

  private resetState() {
    this.activeConnector = null;
    this.wallectClient.next(null);
    this.account.next(null);
    this.chainId.next(null);
    this.status.next('disconnected');
  }

  private checkLocalConfig() {
    if(!('autoConnect' in this.localConfig)){
      return;
    }
    // if(!('networkId' in this.localConfig) && !('httpRpcUrl' in this.localConfig) && !('wsRpcUrl' in this.localConfig) && !('infuraAccessToken' in this.localConfig)) {
    //   console.error('You need to configure one of these parameters: "httpRpcUrl", "wsRpcUrl" or "infuraAccessToken".',);
    // }
  }

  private getLocalProvider(): Web3ProvidersWs.WebsocketProvider | Web3ProvidersHttp.HttpProvider | null {
    //check
    this.checkLocalConfig();
    const { autoConnect,protocol,rpcUrl,infuraKey,options } =this.localConfig;
    if(infuraKey != ''){
      //infura

    }else{
      let finalRpcUrl: string = (rpcUrl == undefined ? '' : rpcUrl);
      if(!finalRpcUrl){
        let chainConfig = this.getChainConfig(this.chainConfig.networkId);
        let https = chainConfig?.rpcUrls.public.http;
        if(https != undefined && https.length>0){
          finalRpcUrl = https[0];
          console.log('httpUrl:'+finalRpcUrl);
        }
      }
      if(protocol == "wss"){
        const defaultReconnectOptions = {
          auto: autoConnect,
          delay: 5000,
        };
        return new WebsocketProvider(finalRpcUrl, {
          ...options,
          reconnect: {
            ...defaultReconnectOptions,
          },
        });
      }else{
        //default https
        return new HttpProvider(finalRpcUrl, options);
      }
    }
  
    return null;
  }
  
  private handleAccountChange(account: string) {
    this.account.next(account);
  }

  private handleChainIdChange(chainId: number) {
    this.chainId.next(chainId);
  }

  private handleDisconnect() {
    this.disconnect();
  }

}

export function assertNever(value: string): string {
  throw new Error(`Unexpected value: ${value}`);
}

async function getAccount(connector: IConnector): Promise<string> {
  const account = await connector.getAccount();

  if (!account) {
    throw new Error('No Ethereum accounts found, you need to create an account in your wallet');
  }

  return account;
}

async function getChainId(connector: IConnector): Promise<number> {
  const chainId = await connector.getChainId();

  if (!chainId) {
    throw new Error('ChainID is not found, you need to choose a network in your wallet');
  }

  return chainId;
}
