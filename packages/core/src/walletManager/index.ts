import { BehaviorSubject } from 'rxjs';
import * as Web3ProvidersWs from 'web3-providers-ws';
import * as Web3ProvidersHttp from 'web3-providers-http';
import { IConnector } from '../base';
import type { BaseProvider } from 'meta-base-provider';

import { ConnectResult, ConnectionStatus } from './types';

export * from './types';

import { ChainWrapper } from '../chains';
import { ChainConfig } from '../model';

const WebsocketProvider = (Web3ProvidersWs as unknown) as typeof Web3ProvidersWs.WebsocketProvider;
const HttpProvider = (Web3ProvidersHttp as unknown) as typeof Web3ProvidersHttp.HttpProvider;

type WebsocketProviderOptions = ConstructorParameters<typeof WebsocketProvider>[1];
type HttpProviderOptions = ConstructorParameters<typeof HttpProvider>[1];

type InfuraNetwork = 'rinkeby' | 'kovan' | 'mainnet' | 'ropsten' | 'goerli';

interface Options<W> {

  makeWeb3Client(provider: BaseProvider ): W;
}

type ConfigOfPublicProvider =
  |
    {
      networkId:string;
      options?: HttpProviderOptions;
    }
  | {
      httpRpcUrl: string;
      options?: HttpProviderOptions;
    }
  | {
      wsRpcUrl: string;
      options?: WebsocketProviderOptions;
    }
  | {
      infuraAccessToken: string;
      /** default: 'mainnet' */
      network?: InfuraNetwork;
      options?: WebsocketProviderOptions;
    };

export class Web3WalletsManager<W> {

  public localConfig: ConfigOfPublicProvider;
  public localClient: W | undefined;
  public hasLocalClient:boolean = false;

  public wallectClient = new BehaviorSubject<W | null>(null);
  //properties
  public account = new BehaviorSubject<string | null>(null);
  public chainId = new BehaviorSubject<number | null>(null);
  public status = new BehaviorSubject<ConnectionStatus>('disconnected');

  private options: Options<W>;
  private activeConnector: IConnector | null = null;
  //event
  // private accountSubscription: SubscribedObject | null = null;
  // private chainIdSubscription: SubscribedObject | null = null;
  // private disconnectSubscription: SubscribedObject | null = null;

  constructor(options: Options<W>) {
    this.localConfig={
      networkId:'bsc_97',
    }
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

  public async connect(connector: IConnector): Promise<ConnectResult> {
    await this.disconnect();

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
      //set event callback
      // this.accountSubscription = connector.subscribeAccountChanged(this.handleAccountChange);
      // this.chainIdSubscription = connector.subscribeChainChanged(this.handleChainIdChange);
      // this.disconnectSubscription = connector.subscribeDisconnect(this.handleDisconnect);

      this.status.next('connected');

      return { provider, account, chainId };
    } catch (error) {
      this.disconnect();
      throw error;
    }
  }

  public async disconnect() {
    try {
      // this.accountSubscription && this.accountSubscription.unsubscribe();
      // this.chainIdSubscription && this.chainIdSubscription.unsubscribe();
      // this.disconnectSubscription && this.disconnectSubscription.unsubscribe();
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

  public async createLocalClient(localConfig: ConfigOfPublicProvider){
    this.localConfig = {
      ...localConfig,
    };
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

  private resetState() {
    this.activeConnector = null;
    // this.accountSubscription = null;
    // this.chainIdSubscription = null;
    // this.disconnectSubscription = null;

    this.wallectClient.next(null);
    this.account.next(null);
    this.chainId.next(null);
    this.status.next('disconnected');
  }

  private checkOptions() {
    if(!('networkId' in this.localConfig) && !('httpRpcUrl' in this.localConfig) && !('wsRpcUrl' in this.localConfig) && !('infuraAccessToken' in this.localConfig)) {
        console.error(
          'You need to configure one of these parameters: "httpRpcUrl", "wsRpcUrl" or "infuraAccessToken".',
        );
    }
  }

  private getLocalProvider(): Web3ProvidersWs.WebsocketProvider | Web3ProvidersHttp.HttpProvider {
    //check
    this.checkOptions();

    if('networkId' in this.localConfig){
      const { networkId, options } = this.localConfig;
      let chainConfig = this.getChainConfig(networkId);
      let https = chainConfig?.rpcUrls.public.http;
      let httpUrl:string ='';
      if(https != undefined && https.length>0){
        httpUrl = https[0];
        console.log('httpUrl:'+httpUrl);
      }
      return new HttpProvider(httpUrl, options);
    }

    if ('httpRpcUrl' in this.localConfig) {
      const { httpRpcUrl, options } = this.localConfig;
      return new HttpProvider(httpRpcUrl, options);
    }

    const defaultReconnectOptions = {
      auto: true,
      delay: 5000,
    };

    if ('wsRpcUrl' in this.localConfig) {
      const { wsRpcUrl, options } = this.localConfig;
      return new WebsocketProvider(wsRpcUrl, {
        ...options,
        reconnect: {
          ...defaultReconnectOptions,
          ...options?.reconnect,
        },
      });
    }

    if ('infuraAccessToken' in this.localConfig) {
      const { infuraAccessToken, network = 'mainnet', options } = this.localConfig;
      return new WebsocketProvider(`wss://${network}.infura.io/ws/v3/${infuraAccessToken}`, {
        ...options,
        reconnect: {
          ...defaultReconnectOptions,
          ...options?.reconnect,
        },
      });
    }

    return assertNever(this.localConfig);
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

  /** private method */
  
}

export function assertNever(value: never): never {
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
