import { Provider } from '@meta-wallets-kit/types';
export declare function warning(message: string): void;
export declare function invariant(condition: any, message?: string): asserts condition;
export declare type SendingInterface = 'EIP 1193' | 'Old Web3.js';
export declare function getAccount(provider: Provider, sendingInterface?: SendingInterface): Promise<{
    account: string | null;
    sendingInterface: SendingInterface;
}>;
export declare function getChainId(provider: Provider, sendingInterface?: SendingInterface): Promise<{
    chainId: number;
    sendingInterface: SendingInterface;
}>;
