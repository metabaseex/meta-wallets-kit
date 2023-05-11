import './@types';
import type { Provider } from '@meta-wallets-kit/for-third-library-definitions';
export { Provider };
declare type MaybePromise<T> = T | Promise<T>;
export interface DefaultConnectionPayload {
    provider: Provider;
}
export interface Connector<P extends DefaultConnectionPayload = DefaultConnectionPayload> {
    connect(): MaybePromise<P>;
    disconnect(): MaybePromise<void>;
    getAccount(): Promise<string | null>;
    getChainId(): Promise<number | null>;
    getConnectionPayload(): P | null;
    subscribeConnectAccount(callback: ConnectCallback): SubscribedObject;
    subscribeChainId(callback: ChainIdCallback): SubscribedObject;
    subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}
export declare type SubscribedObject = {
    unsubscribe: () => void;
};
export declare type ConnectCallback = (account: string) => void;
export declare type ChainIdCallback = (chainId: number) => void;
export declare type DisconnectCallback = (error?: any) => void;
