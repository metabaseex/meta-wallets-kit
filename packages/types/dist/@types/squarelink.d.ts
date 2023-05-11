declare module 'squarelink' {
    import { Provider } from '@meta-wallets-kit/for-third-library-definitions';
    export type SquarelinkProvider = Provider & {
        enable(): Promise<void>;
    };
    export interface Network {
        url: string;
        chainId?: number;
    }
    export interface Options {
        scope: string[];
        useSync: boolean;
    }
    class Squarelink {
        constructor(clientId: string, network?: string | Network, options?: Options);
        getProvider(): Promise<SquarelinkProvider>;
    }
    export default Squarelink;
}
