import './@types';

import type { Provider } from '@meta-wallets-kit/for-third-library-definitions';

export { Provider };

type MaybePromise<T> = T | Promise<T>;

export interface DefaultConnectionPayload {
  provider: Provider;
}

export interface Connector<P extends DefaultConnectionPayload = DefaultConnectionPayload> {
  connect(): MaybePromise<P>;
  disconnect(): MaybePromise<void>;
  getAccount(): Promise<string | null>;
  getChainId(): Promise<number | null>;
  //extend method,added by david mei at 2023-05-12
  switchAccount(account:string): Promise<string | null>;
  switchOrAddChain(): Promise<number | null>;
  addTokenToWallet(): Promise<boolean | null>;
  //get payload
  getConnectionPayload(): P | null;
  //event
  subscribeAccountChanged(callback: ConnectCallback): SubscribedObject;
  subscribeChainChanged(callback: ChainIdCallback): SubscribedObject;
  subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}

export type SubscribedObject = { unsubscribe: () => void };
export type ConnectCallback = (account: string) => void;
export type ChainIdCallback = (chainId: number) => void;
export type DisconnectCallback = (error?: any) => void;



