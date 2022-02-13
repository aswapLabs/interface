import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@aswaporg/aswap-web3-injected-connector'
import { SupportedChainId } from '../constants/chains'
import getLibrary from '../utils/getLibrary'

import { NetworkConnector } from './NetworkConnector'

export const NETWORK_URLS: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.MAINNET]: `https://main-seed.starcoin.org`,
  [SupportedChainId.BARNARD]: `https://barnard-seed.starcoin.org`,
  // [SupportedChainId.LOCAL]: `http://localhost:9850`,
  [SupportedChainId.HALLEY]: `https://halley-seed.starcoin.org`,
  [SupportedChainId.PROXIMA]: `https://proxima-seed.starcoin.org`,
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.PROXIMA,
  SupportedChainId.BARNARD,
  // SupportedChainId.LOCAL,
  SupportedChainId.HALLEY,
]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})



