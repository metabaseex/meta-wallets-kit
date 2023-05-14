
import { ChainConfig } from '../model';

export interface IBaseConnectorSdk{
    isMetaMask();

    connect();

    disConnect();

    switchAccount(account:string) : Promise<string | null>;

    switchOrAddChain(chainId: number,chainConfig?: ChainConfig) : Promise<number | null>;

    addTokenToWallet(symbol: string,address: string,imageURL: string, decimals:number, type:string) : Promise<boolean | null>;

}