import { Currency } from '@uniswap/sdk-core'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import STCLogo from '../../assets/svg/stc.svg'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import Logo from '../Logo'

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 4px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ...rest
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (!currency || currency.isNative) return []

    // if (currency.isToken) {
    if (currency.symbol === 'Bot') {
      // const defaultUrls = currency.chainId === 1 ? [getTokenLogoURL(currency.address)] : []
      const defaultUrls = currency.chainId === 1 ? [getTokenLogoURL('0xdAC17F958D2ee523a2206206994597C13D831ec7')] : []
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls]
      }
      return defaultUrls
    }
    return []
  }, [currency, uriLocations])

  /*
  if (currency?.isNative) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} {...rest} />
  */
  if (currency?.isNative) {
    return <StyledEthereumLogo src={STCLogo} size={size} style={style} {...rest} />
  }
  else {
     if (currency instanceof WrappedTokenInfo) {
         const symbol = currency.tokenInfo.symbol
         const logoURI = currency.tokenInfo.logoURI
         console.log(symbol)
         console.log(logoURI)
         return <StyledEthereumLogo src={logoURI} size={size} style={style} {...rest} />
     }
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} {...rest} />
  }
}
