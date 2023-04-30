/* eslint-disable no-console */
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { getChainConfigById, infuraKey } from '../config'
import {
  accountVar,
  chainIdVar,
  clearMultiWalletVars,
  MultiWalletProvider,
  setChainIdStorage,
  setProviderStorage,
  web3Var
} from '../graphql/variables/WalletVariable'

// eslint-disable-next-line no-shadow


export const multiWalletService = (providerName, chainId) => {
  switch (providerName) {
    case MultiWalletProvider.metaMask:
      return metaMaskProvider(chainId)

    case MultiWalletProvider.walletConnect:
      return walletConnectProvider(chainId)

    default:
      return metaMaskProvider()
  }
}

const metaMaskProvider = (chainIdParam) => {
  const listenEvents = () => {
    window.ethereum &&
      (window.ethereum).on(
        'accountsChanged',
        async (accounts) => {
          console.log('MM accountsChanged')
          if (accounts[0]) {
            accountVar(accounts[0])
          } else {
          }
        }
      )

    window.ethereum &&
      (window.ethereum).on(
        'chainChanged',
        async (chainIdItem) => {
          console.log('MM chainChanged', chainIdItem)
          chainIdVar(Number.parseInt(chainIdItem, 16))
        }
      )
  }

  return {
    connect: async () => {
      const provider = await detectEthereumProvider()

      if (provider && provider === window.ethereum) {
        try {
          const web3 = new Web3(Web3.givenProvider)

          const account = (
            await (window.ethereum).request({
              method: 'eth_requestAccounts'
            })
          )[0]

          const chainId = Number.parseInt(
            await (window.ethereum).request({
              method: 'eth_chainId'
            }),
            16
          )

          if (account && chainId) {
            accountVar(account)
            chainIdVar(chainId)
            setProviderStorage(MultiWalletProvider.metaMask)
            setChainIdStorage(chainId)
            web3Var(web3)
            listenEvents()

            if (chainId === 56 || chainIdParam === 56) {
              web3.givenProvider.sendAsync({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x38', // A 0x-prefixed hexadecimal string
                    chainName: 'Binance Smart Chain',
                    nativeCurrency: {
                      name: 'BNB',
                      symbol: 'BNB', // 2-6 characters long
                      decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org'],
                    blockExplorerUrls: ['https://bscscan.com']
                  }
                ]
              })
            }
          }

          console.log('MM account', account)
          console.log('MM chainId', chainId)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}

const walletConnectProvider = (chainIdParam) => {
  return {
    connect: async () => {
      console.log('WalletConnect')
      try {
        let providerData = {}
        switch (chainIdParam) {
          case 1:
            providerData = {
              infuraId: infuraKey,
              chainId: 1
            }
            break
          case 42:
            providerData = {
              infuraId: infuraKey,
              chainId: 42
            }
            break
          case 56:
            providerData = {
              chainId: 56,
              rpc: {
                56: `https://bsc-dataseed.binance.org/`
              },
              qrcodeModalOptions: {
                mobileLinks: ['trust']
              }
            }
            break
          default:
            break
        }
        const provider = new WalletConnectProvider(providerData)
        await provider.enable()
        const web3 = new Web3(provider)
        const account = (await web3.eth.getAccounts())[0]
        const chainId = await web3.eth.getChainId()

        if (account && chainId) {
          accountVar(account)
          chainIdVar(chainId)
          setProviderStorage(MultiWalletProvider.walletConnect)
          setChainIdStorage(chainId)
          web3Var(web3)

          provider.on('accountsChanged', async (accounts) => {
            console.log('WC accountsChanged', accounts)
            if (accounts[0]) {
              accountVar(accounts[0])
            } else {
              clearMultiWalletVars()
            }
          })

          provider.on('chainChanged', async (chainIdItem) => {
            console.log('WC chainChanged', chainIdItem)
            chainIdVar(chainIdItem)
          })

          provider.on('disconnect', async () => {
            console.log('WC disconnect')
            clearMultiWalletVars()
          })

          console.log('WC account', account)
          console.log('WC chainId', chainId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const initializeWeb3 = (chainId, node) => {
  const { infuraAddress, bscNodeAddress } = getChainConfigById(chainId)

  if (node === 'infura') {
    return new Web3(new Web3.providers.HttpProvider(infuraAddress))
  }

  if (node === 'quicknode') {
    return new Web3(new Web3.providers.HttpProvider(bscNodeAddress))
  }

  if (node === true) {
    if (chainId === 56 || chainId === 97) {
      return new Web3(new Web3.providers.HttpProvider(bscNodeAddress))
    }

    return new Web3(new Web3.providers.HttpProvider(infuraAddress))
  }

  return web3Var() || new Web3(new Web3.providers.HttpProvider(infuraAddress))
}
