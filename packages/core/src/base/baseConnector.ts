import { IConnector, BaseConnectionPayload,} from './IConnector';
import type { TokenConfig } from '../model';
import { normalizeChainId, SendingInterface } from '../utils';

import { default as EventEmitter } from 'eventemitter3'
import { BaseProvider } from 'meta-base-provider';

export type ConnectorData = {
    account?: string
    chainId?: number
}

export interface ConnectorEvents{
    connected(data: ConnectorData): void;
    changed(data: ConnectorData): void ;
    disconnect(): void;
    message({ type, data }: { type: string; data?: unknown }): void;
    error(error: any): void;
}

export abstract class BaseConnector<P extends BaseConnectionPayload> extends EventEmitter<ConnectorEvents> implements IConnector<P> {
    //readonly message
    public abstract readonly name: string;
    
    protected payload: P | null = null;
    protected sendingInterface: SendingInterface = 'EIP 1193';

    protected data:ConnectorData = { account:'',chainId:1 };

    public abstract connect(): Promise<P>;

    /** common fuction start */
    public async disconnect() {
        //this.unSubScribeEvents();
        
        this.payload = null;
    }

    public abstract getAccount(): Promise<string | null>;  

    public abstract getChainId(): Promise<number | null>;
   

    public getConnectionPayload() {
        return this.payload;
    }

    public abstract switchAccount(account:string) : Promise<string | null>;

    public abstract switchOrAddChain(networkId:string) : Promise<number | null>;

    public abstract addTokenToWallet(token:TokenConfig) : Promise<boolean | null>;

    /** common fuction end */
    private getProvider() : BaseProvider | null {
        if(!this.payload || !this.payload?.provider) return null;
        return this.payload.provider;
    }

    public subscribeEvents(provider:BaseProvider): void{
        if(!provider || !provider.on) return;
        provider.on('chainChanged',this.onChainChanged);
        provider.on('accountsChanged',this.onAccountChanged);
        provider.on('disconnect',this.onDisconnect);
    }

    public unSubScribeEvents(): void{
        try{
            let provider = this.getProvider();
            if(!provider || !provider.removeAllListeners) return;
            provider?.removeAllListeners();
        }finally{

        }
        
    }

    /******** event function */
    protected onChainChanged = (chainId: number | string) => {
        const nid = normalizeChainId(chainId);
        this.data.chainId = nid;
        this.emit('changed', { chainId:nid });
    }
    protected onAccountChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
            this.emit('disconnect');
            this.data.account = '';
        }else{
            let curAccount=((accounts!=null && accounts.length>0) ? accounts[0] :'');
            this.data.account = curAccount;
           
            this.emit('changed', { account: (curAccount as string), })
        }
    }
    protected onDisconnect = async (error?: any) => {
        // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
        // https://github.com/MetaMask/providers/pull/120
        //TO be checked
        if(error?.code == '1013'){
            const provider = this.getProvider();
            if (provider) {
            const isAuthorized = await this.getAccount()
            if (isAuthorized) return
            }
        }
        this.emit('disconnect');
    }
}


  