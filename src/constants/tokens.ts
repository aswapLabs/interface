import { WETH9 } from '@uniswap/sdk-core'
import { Token, Star } from '@aswaporg/aswap-sdk-core'
import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

// export const XCOIN: { [chainId: number]: Token } = {
//   [SupportedChainId.LOCAL]: new Token(
//       SupportedChainId.LOCAL,
//       '0x9bb5ace47e68616f64229b119f4c5d95::XCoin::XCoin',
//       9,
//       'XCoin',
//       'XCoin'
//   ),
// }
export const STC: { [chainId: number]: Token } = {
  [SupportedChainId.BARNARD]: new Token(
      SupportedChainId.BARNARD,
      '0x00000000000000000000000000000001::STC::STC',
      9,
      'STC',
      'STC'
  ),
}
export const Coin101: { [chainId: number]: Token } = {
  [SupportedChainId.BARNARD]: new Token(
      SupportedChainId.BARNARD,
      '0x0a7b8dab322448af454fccaffbcbf247::BX_USDT::BX_USDT',
      9,
      'BX_USDT',
      'BX_USDT'
  ),
}
export const AMPL = new Token(
  SupportedChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
)
export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDC = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const FEI = new Token(
  SupportedChainId.MAINNET,
  '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  18,
  'FEI',
  'Fei USD'
)
export const TRIBE = new Token(
  SupportedChainId.MAINNET,
  '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
  18,
  'TRIBE',
  'Tribe'
)
export const FRAX = new Token(
  SupportedChainId.MAINNET,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax'
)
export const FXS = new Token(
  SupportedChainId.MAINNET,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share'
)
export const renBTC = new Token(
  SupportedChainId.MAINNET,
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
  8,
  'renBTC',
  'renBTC'
)
export const UMA = new Token(
  SupportedChainId.MAINNET,
  '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
  18,
  'UMA',
  'UMA Voting Token v1'
)
export const ETH2X_FLI = new Token(
  SupportedChainId.MAINNET,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
// Mirror Protocol compat.
export const UST = new Token(
  SupportedChainId.MAINNET,
  '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
  18,
  'UST',
  'Wrapped UST'
)
export const MIR = new Token(
  SupportedChainId.MAINNET,
  '0x09a3ecafa817268f77be1283176b946c4ff2e608',
  18,
  'MIR',
  'Wrapped MIR'
)
export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
}

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.BARNARD]: Star.onChain(SupportedChainId.BARNARD).wrapped,
  // [SupportedChainId.LOCAL]: Star.onChain(SupportedChainId.LOCAL).wrapped,
}


export class ExtendedStar extends Star {

  private static _cachedStar: { [chainId: number]: ExtendedStar } = {}

  public static onChain(chainId: number): ExtendedStar {
    return this._cachedStar[chainId] ?? (this._cachedStar[chainId] = new ExtendedStar(chainId))
  }
}
