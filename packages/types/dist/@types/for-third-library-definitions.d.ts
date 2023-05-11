declare module '@meta-wallets-kit/for-third-library-definitions' {
    type Provider = any;
    interface JsonRpcPayload {
        jsonrpc?: string;
        method: string;
        params?: any[];
        id?: string | number;
    }
    interface JsonRpcResponse {
        jsonrpc: string;
        id: number;
        result?: any;
        error?: string;
    }
}
