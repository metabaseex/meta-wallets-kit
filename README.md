# Meta Wallets Kit [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This kit will help connect you dApp to different Ethereum wallets, e.g. Metamask. With meta-wallets-kit, you can create Web3WalletsManager and connect your dApp to the wallet of your choice using one of the supported wallet integrations.

# Donate Address:
If you are interested in supporting this project, please donate ETH or BNB to the following address:

0xD9eb03A55e444197B760abcfA0E250C3eEa5151A

## Wallet integrations:

| Wallet | Integration Package |Size |
|----|----|----|
|Inpage (Extensions like [Metamask](https://metamask.io/) or Web3 browsers like [Cipher](https://www.cipherbrowser.com/))|[`@meta-wallets-kit/inpage-connector`](./packages/inpage-connector)|[![minzip](https://badgen.net/bundlephobia/minzip/@meta-wallets-kit/inpage-connector)](https://bundlephobia.com/result?p=@meta-wallets-kit/inpage-connector@latest)|
[WalletConnect](https://walletconnect.org/)|[`@meta-wallets-kit/connect-wallet-connector`](./packages/connect-wallet-connector)|[![minzip](https://badgen.net/bundlephobia/minzip/@meta-wallets-kit/connect-wallet-connector)](https://bundlephobia.com/result?p=@meta-wallets-kit/connect-wallet-connector@latest)|
[Coinbase Connector](https://www.coinbase.com/)|[`@meta-wallets-kit/coinbase-connector`](./packages/coinbase-connector)|[![minzip](https://badgen.net/bundlephobia/minzip/@meta-wallets-kit/coinbase-connector)](https://bundlephobia.com/result?p=@meta-wallets-kit/coinbase-connector@latest)|

## Installation

`npm install --save @meta-wallets-kit/core`

`npm install --save @meta-wallets-kit/inpage-connector` or another integration

## Creating and managing wallets

```typescript
import Web3 from 'web3';
import { Web3WalletsManager } from '@meta-wallets-kit/core';
import { InpageConnector } from '@meta-wallets-kit/inpage-connector';

// Create Web3WalletsManager instance
const web3Manager = new Web3WalletsManager<Web3>({
  defaultProvider: {
    network: 'kovan',
    infuraAccessToken: 'INFURA_API_KEY',
  },
  makeWeb3: provider => new Web3(provider), // you can use web3.js, ethers.js or another suitable library
});

// Create connector
const connector = new InpageConnector();

// Connect to wallet
await web3Manager.connect(connector);

// Get address and Web3 for sending transaction
const myAddress = web3Manager.account.value;
const txWeb3 = web3Manager.txWeb3.value;

// Create contract
const daiContract = txWeb3.eth.Contract(DAI_ABI, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');

// Send transaction
await daiContract.methods
  .transfer('0x0000000000000000000000000000000000000000', '1000000000000000000')
  .send({ from: myAddress });
```

## Web3WalletsManager API

```typescript
class Web3WalletsManager<W> {
    /** default Web3 instance for reading. Uses a provider created based on defaultProvider options */
    web3: W;
    /** Web3 instance for sending transactions. An instance is created after connecting to the wallet and uses the wallet provider */
    txWeb3: BehaviorSubject<W | null>;
    /** active account address */
    account: BehaviorSubject<string | null>;
    /** active network ID */
    chainId: BehaviorSubject<number | null>;
    /** status of the connection */
    status: BehaviorSubject<ConnectionStatus>;

    constructor(options: Options<W>);

    /** Connect to wallet; Returns account address and Web3 Instance for sending transactions */
    connect(connector: Connector): Promise<ConnectResult>;
    /** Disconnect wallet, close streams */
    disconnect(): Promise<void>;
}

interface Options<W> {
    defaultProvider: {
        httpRpcUrl?: string;
        wsRpcUrl?: string;
        infuraAccessToken?: string;
        /** default: 'mainnet' */
        network?: InfuraNetwork;
    };
    makeWeb3<W>(provider: Provider): W;
}
```
