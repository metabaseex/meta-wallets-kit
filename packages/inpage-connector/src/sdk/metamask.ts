
import { IBaseConnectorSdk } from '@meta-wallets-kit/core';

import { ChainConfig } from '@meta-wallets-kit/core';

//All errors returned by the MetaMask provider follow this interface:
//See: https://docs.metamask.io/wallet/reference/provider-api/#connect
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}
export class MetaMaskWalletSdk implements IBaseConnectorSdk{

    constructor(){

    }

    public isMetaMask(): boolean {
        return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
    }
    /**
     * Returns account address array if wallet is connected otherwise opens MetaMask popup.
     * On error, returns a single string with the error message
     */
    public async connect()  {
        if (this.isMetaMask()) {
            try {
                const result: string[] = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                return result;
            } catch (e) {
                return "Error: Unable to execute request: "+ e?.message;
            }
        } else {
            return "Error: MetaMask not detected";
        }
    }
    /**
     * Opens a MetaMask popup to connect/disconnect from a list of user's accounts.
     * Returns an array.
     * The popup opens even if the user has already connected some accounts.
     * On error, returns a single string with the error message
     */
    public async switchAccount(account:string) : Promise<string | null> {
        if (this.isMetaMask()) {
            try {
                const result: string[] = await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: { account },
                    },
                ],
                });
                return result[0];
            } catch (e) {
                return "Error: Unable to execute request: " + e?.message;
            }
        } else {
          return "Error: MetaMask not detected";
        }
    }

    /**
     * Add a token to MetaMask
     * @param symbol Symbol of the token, upto 5 characters
     * @param address Address of the token
     * @param imageURL String URL of the token image
     * @param decimals (Optional) 18 by default
     * @param type (Optional) ERC20 by default
     */
    public async addTokenToWallet(symbol: string,address: string,imageURL: string, decimals = 18, type = "ERC20"):Promise<boolean | null>{
        return await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type,
                options: {
                    address, // The address that the token is at.
                    symbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals, // The number of decimals in the token
                    image: imageURL, // A string url of the token logo
                },
            },
        });
    };


    /**
     * Switch to a chain or add the chain if user does not have it
     * @param chainConfig (Optional) Chain Config Interface used for adding new chain
     */
    public async switchOrAddChain(chainConfig?: ChainConfig) : Promise<number | null>{
        if(chainConfig == undefined) return null;
        let chainId = chainConfig?.chainNo;
        const chainIdHex = "0x" + parseInt(chainId.toString(), 10).toString(16);
        try {
           return  await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainIdHex }],
            });
        } catch (switchError) {
            const error = switchError as any;
            // This error code indicates that the chain has not been added to MetaMask.
            if (error?.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                        {
                            chainId: chainIdHex,
                            ...chainConfig,
                        },
                        ],
                    });
                } catch (addError) {
                    throw new Error(
                        "Couldn't add network, it's possible that user has rejected the change"
                    );
                }
            } else {
                throw new Error("Couldn't switch networks. Error: " + switchError);
            } 
            
        }

        return null;
    };
    /**
     * get MetaMask chainId
     */
    public async getChainId() : Promise<number | null>{
        const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
        return chainId;
    }

    public async getAccount() : Promise<string | null>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((err) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
            } else {
              console.error(err);
            }
          });
        if(accounts == null || accounts.length == 0){
            return "";
        }
        const account = accounts[0];
        return account;
      }

// Event handlers
/**
 * Event handler for when the user changes the account in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes accounts string array as an argument
 */
/* export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
    if (isMetaMask) {
        onMounted(() => {
            window.ethereum.on("accountsChanged", callback);
        });
        onUnmounted(() => {
            window.ethereum.removeListener("accountsChanged", callback);
        });
    }
}; */

/**
 * Event handler for when the user changes the active chain in MetaMask
 *
 * Reference for event handlers: https://docs.metamask.io/guide/ethereum-provider.html#events
 * @param callback Function that takes chainId number as an argument
 */
/* export const onChainChanged = (callback: (chainId: number) => void) => {
    if (isMetaMask) {
        onMounted(() => {
            window.ethereum.on("chainChanged", callback);
        });
        onUnmounted(() => {
            window.ethereum.removeListener("chainChanged", callback);
        });
    }
}; */

}
