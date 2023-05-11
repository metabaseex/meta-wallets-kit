import { Provider } from '@meta-wallets-kit/types';
export declare type InpageProvider = Provider & {
    enable?(): Promise<void>;
};
declare global {
    interface Window {
        web3?: {
            currentProvider?: unknown;
        };
        ethereum?: unknown;
    }
}
