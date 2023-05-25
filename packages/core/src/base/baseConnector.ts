import {
    ChainIdCallback,
    ConnectCallback,
    IConnector,
    DefaultConnectionPayload,
    DisconnectCallback,
    ShowUriCallBack,
    SubscribedObject,
} from './IConnector';
import type { TokenConfig } from '../model';
import { getAccount, getChainId, SendingInterface } from '../utils';

  
  
export abstract class BaseConnector<P extends DefaultConnectionPayload> implements IConnector<P> {

    protected payload: P | null = null;
    private sendingInterface: SendingInterface = 'EIP 1193';

    public abstract connect(): Promise<P>;

    /** common fuction start */
    public async disconnect() {
        this.payload = null;
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

    public getConnectionPayload() {
        return this.payload;
    }

    /** common fuction end */

    public abstract switchAccount(account:string) : Promise<string | null>;

    public abstract switchOrAddChain(networkId:string) : Promise<number | null>;

    public abstract addTokenToWallet(token:TokenConfig) : Promise<boolean | null>;


    /******** event function */
    public subscribeAccountChanged(callback: ConnectCallback): SubscribedObject {
        const convertedCallback = (accounts: string[]) => callback(accounts[0]);

        this.payload?.provider.on && this.payload.provider.on('accountsChanged', convertedCallback);

        return {
            unsubscribe: () => {
                this.payload?.provider.removeListener &&
                this.payload.provider.removeListener('accountsChanged', convertedCallback);
            },
        };
    }

    public subscribeChainChanged(callback: ChainIdCallback): SubscribedObject {
        const convertedCallback = (chainId: number | string) => {
            const convertedChainId = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;

            if (Number.isNaN(convertedChainId)) {
                throw new Error('ChainId is incorrect');
            } else {
                callback(convertedChainId);
            }
        };

        this.payload?.provider.on && this.payload.provider.on('chainChanged', convertedCallback);

        return {
            unsubscribe: () => {
                this.payload?.provider.removeListener &&
                this.payload.provider.removeListener('chainChanged', convertedCallback);
            },
        };
    }

    public subscribeDisconnect(callback: DisconnectCallback): SubscribedObject {
        this.payload?.provider.on && this.payload.provider.on('disconnect', callback);

        return {
            unsubscribe: () => {
                this.payload?.provider.removeListener &&
                this.payload.provider.removeListener('disconnect', callback);
            },
        };
    }

    public subscribeShowUri(callback: ShowUriCallBack): SubscribedObject {
        //just empty 
        if(callback != null){
            
        }

        return {
            unsubscribe: () => {
                
            },
        };
    } 
}
  