import { AbstractConnector } from '@meta-wallets-kit/abstract-connector';
import { DefaultConnectionPayload, DisconnectCallback, SubscribedObject } from '@meta-wallets-kit/types';
import { InpageProvider } from './@types/extend-window';
export { InpageProvider };
export interface InpageConnectionPayload extends DefaultConnectionPayload {
    provider: InpageProvider;
}
export declare class InpageConnector extends AbstractConnector<InpageConnectionPayload> {
    connect(): Promise<InpageConnectionPayload>;
    subscribeDisconnect(callback: DisconnectCallback): SubscribedObject;
}
