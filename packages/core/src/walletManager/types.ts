import { Provider } from '@meta-wallets-kit/provider';

export type ConnectionStatus = 'disconnected' | 'pending' | 'connected';

export interface ConnectResult {
  provider: Provider;
  account: string;
  chainId: number;
}
