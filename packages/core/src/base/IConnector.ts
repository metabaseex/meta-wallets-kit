//base common types
import type { BaseProvider } from 'meta-base-provider';
import type { TokenConfig } from '../model';

type MaybePromise<T> = T | Promise<T>;

export interface DefaultConnectionPayload {
  provider: BaseProvider;
}

export interface IConnector<P extends DefaultConnectionPayload = DefaultConnectionPayload> {
  connect(): MaybePromise<P>;
  //common function
  disconnect(): MaybePromise<void>;
  getAccount(): Promise<string | null>;
  getChainId(): Promise<number | null>;
  getConnectionPayload(): P | null;
  //extend method,added by david mei at 2023-05-12
  switchAccount?(account: string): Promise<string | null>;
  switchOrAddChain?(networkId: string): Promise<number | null>;
  addTokenToWallet?(token: TokenConfig): Promise<boolean | null>;
  //event
  subscribeAccountChanged(callback: ConnectCallback): SubscribedObject;
  subscribeChainChanged(callback: ChainIdCallback): SubscribedObject;
  subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}

export type SubscribedObject = { unsubscribe: () => void };
export type ConnectCallback = (account: string) => void;
export type ChainIdCallback = (chainId: number) => void;
export type DisconnectCallback = (error?: any) => void;



