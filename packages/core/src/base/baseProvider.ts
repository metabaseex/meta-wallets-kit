declare module 'meta-base-provider'{
  export type BaseProvider = any;

  export interface JsonRpcPayload {
    jsonrpc?: string;
    method: string;
    params?: any[];
    id?: string | number;
  }

  export interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: string;
  }

  export class EmptyProvider{
  }

}

