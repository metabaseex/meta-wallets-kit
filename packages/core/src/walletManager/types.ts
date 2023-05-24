import { BaseProvider } from 'meta-base-provider';

export type ConnectionStatus = 'disconnected' | 'pending' | 'connected';

export interface ConnectResult {
  provider: BaseProvider;
  account: string;
  chainId: number;
}
