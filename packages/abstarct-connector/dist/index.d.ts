import { ChainIdCallback, ConnectCallback, Connector, DefaultConnectionPayload, DisconnectCallback, SubscribedObject } from '@meta-wallets-kit/types';
export declare abstract class AbstractConnector<P extends DefaultConnectionPayload> implements Connector<P> {
    protected payload: P | null;
    private sendingInterface;
    abstract connect(): Promise<P>;
    disconnect(): Promise<void>;
    getAccount(): Promise<string | null>;
    getChainId(): Promise<number | null>;
    getConnectionPayload(): P | null;
    subscribeConnectAccount(callback: ConnectCallback): SubscribedObject;
    subscribeChainId(callback: ChainIdCallback): SubscribedObject;
    subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}
