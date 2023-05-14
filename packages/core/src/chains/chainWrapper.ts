
import { ChainConfig } from '../model';
import { ethMain } from './ethMain';
import { bsc } from './bsc';
import { bscTestnet } from './bscTestnet';


export class ChainWrapper{
    chainMap: Map<string,ChainConfig> = new Map();
    constructor(){
        this.chainMap.set(ethMain.networkId,ethMain);
        this.chainMap.set(bsc.networkId,bsc);
        this.chainMap.set(bscTestnet.networkId,bscTestnet);
    }

    public getChainConfig(networkId:string) : ChainConfig | undefined {
        if(!this.chainMap.has(networkId)){
            return undefined;
        }
        return this.chainMap.get(networkId);
    }
    
}

