import { Provider } from '@meta-wallets-kit/types';

export type ConnectionStatus = 'disconnected' | 'pending' | 'connected';

export interface ConnectResult {
  provider: Provider;
  account: string;
  chainId: number;
}
