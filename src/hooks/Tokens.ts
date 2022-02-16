import { parseBytes32String } from '@ethersproject/strings'
import {Currency, CurrencyAmount, Token} from '@uniswap/sdk-core'
import { Currency as CurrencyNew, Token as TokenNew } from '@aswaporg/aswap-sdk-core'
import { arrayify } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { createTokenFilterFunction } from '../components/SearchModal/filtering'
import { ExtendedStar, STC, WETH9_EXTENDED} from '../constants/tokens'
import { useAllLists, useCombinedActiveList, useInactiveListUrls } from '../state/lists/hooks'
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'
import { TokenAddressMap, useUnsupportedTokenList } from './../state/lists/hooks'

import { useActiveWeb3React } from './web3'
import { useBytes32TokenContract, useTokenContract } from './useContract'
import request from "sync-request";
import {useTokenDecimals1, useTokenDecimals2} from './useTokenSwapRouter'


// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap, includeUserAdded: boolean): { [address: string]: Token | TokenNew } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()

  return useMemo(() => {
    if (!chainId) return {}

    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId] ?? {}).reduce<{ [address: string]: Token | TokenNew }>(
      (newMap, address) => {
        newMap[address] = tokenMap[chainId][address].token
        return newMap
      },
      {}
    )

    if (includeUserAdded) {
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token | TokenNew }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token
              return tokenMap
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...mapWithoutUrls }
          )
      )
    }

    return mapWithoutUrls
  }, [chainId, userAddedTokens, tokenMap, includeUserAdded])
}

export function useAllTokens(): { [address: string]: Token | TokenNew } {
  const allTokens = useCombinedActiveList()
  return useTokensFromMap(allTokens, true)
}

export function useUnsupportedTokens(): { [address: string]: Token | TokenNew } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap, false)
}

export function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const { chainId } = useActiveWeb3React()
  const activeTokens = useAllTokens()
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const tokenFilter = createTokenFilterFunction(search)
    const result: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    for (const url of inactiveUrls) {
      const list = lists[url].current
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          const wrapped = new WrappedTokenInfo(tokenInfo, list)
          if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
            addressSet[wrapped.address] = true
            result.push(wrapped)
            if (result.length >= minResults) return result
          }
        }
      }
    }
    return result
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

export function useIsTokenActive(token: Token | TokenNew | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | CurrencyNew | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | TokenNew | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useToken1(tokenAddress?: string): Token | TokenNew | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  // console.log("cao", tokenAddress)
  const address = isAddress(tokenAddress)

  const token: Token | undefined = address ? tokens[address] : undefined

  if(token){
    return token
  }

  //asdf1 检索的为地址，先查看本地是否存在，如果不存在，查询链是否存在，如果存在则保存到本地缓存，用于下次缓存查询

  //如果查询为代币地址；则查询链，是否存在当前查询的代币
  //存在则加入到本地缓存
  //不存在直接返回

  if (!chainId || !address || address==='') return undefined

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const {data: decimals} = useTokenDecimals(tokenAddress);
  // return getTokenDecimals(tokenAddress!, chainId);
  return undefined
  // let decimals = null;
  // async function tt(){
  //   decimals = await getTokenDecimals(tokenAddress!)
  // }
  // tt()
  // setTimeout(function(){
  //   console.log("I am the third log after 5 seconds");
  // },3000);
  // console.log("12344")
  // return new TokenNew(
  //     chainId,
  //     tokenAddress!,
  //     9,
  //     'Coin104',
  //     'Coin104'
  // )

  // async function fuck_t1(){
  //   const decimals = await getTokenDecimals(tokenAddress!)
  //   return new TokenNew(
  //       chainId as any,
  //       '0x9bb5ace47e68616f64229b119f4c5d95::Coin104::Coin104',
  //       decimals?.length-1,
  //       'Coin104',
  //       'Coin104'
  //   )
  // }
  // fuck_t1()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const {data: decimals} = useTokenDecimals(tokenAddress)
  // const {data: totalLiquidity} = useTotalLiquidity("0x9bb5ace47e68616f64229b119f4c5d95::Coin102::Coin102","0x9bb5ace47e68616f64229b119f4c5d95::Coin103::Coin103")
  // console.log("sss1-jingdu", decimals)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const decimals = getTokenDecimals(tokenAddress!)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // return useMemo(() => {
  //   const dd = decimals
  //
  //   return new Token(
  //       chainId,
  //       '0x9bb5ace47e68616f64229b119f4c5d95::Coin104::Coin104',
  //       9,
  //       'Coin104',
  //       'Coin104'
  //   )
  // }, [
  //   token,
  //   chainId,
  //   address
  // ])

  // return new TokenNew(
  //     chainId as any,
  //     '0x9bb5ace47e68616f64229b119f4c5d95::Coin104::Coin104',
  //     9,
  //     'Coin104',
  //     'Coin104'
  // )
}

export function useCurrency(currencyId: string | undefined): Currency | CurrencyNew | null | undefined {
  console.log("gettoken")
  const { chainId } = useActiveWeb3React()
  const isSTC = currencyId?.toUpperCase() === 'STC'
  const token = useToken(isSTC ? undefined : currencyId)
  const extendedStar = useMemo(() => (chainId ? ExtendedStar.onChain(chainId) : undefined), [chainId])
  const weth = chainId ? WETH9_EXTENDED[chainId] : undefined
  if (weth?.address?.toLowerCase() === currencyId?.toLowerCase()) return weth
  return isSTC ? extendedStar : token
}

function getTokenDecimals(address: string, chainId: number) : TokenNew|undefined{
  const params = {
      "id":101,
      "jsonrpc":"2.0",
      "method":"contract.call",
      "params":[
    {
      "function_id":"0x1::Token::scaling_factor",
      "type_args":[
        address
      ],
      "args":[

      ]
    }
  ]
  };
  const res = request('POST',"https://barnard-seed.starcoin.org", {
        json: params
  });
  const map = JSON.parse(res.getBody('utf8'));
  if(!map['result'] || !map['result'][0] || !map['result'][0]['U128']){
    return undefined
  }
  const addressArr = address.split('::')
  if(addressArr.length !== 3){
    return undefined
  }
  // 0x5f715A009d7e90FBdd12f8d0b828a912::Coin101::Coin101
  return new TokenNew(
      chainId,
      addressArr[0].toLowerCase()+"::"+addressArr[1]+"::"+addressArr[2],
      // address,
      map['result'][0]['U128'].length-1,
      addressArr[2],
      addressArr[2]
  )
}

export function regPair(chainId: number|undefined, tokenA: string|undefined, tokenB: string|undefined) : boolean {
  if(!chainId || !tokenA || !tokenB){
    return false
  }
  const params = {
    "chainId":chainId,
    "tokenA":tokenA, // "0x9bb5ace47e68616f64229b119f4c5d95::coin111::coin111"
    "tokenB":tokenB, // "0x9bb5ace47e68616f64229b119f4c5d95::coin222::coin222"
  };
  //最长等待60s todo 待修改api地址
  const res = request('POST',"https://aswap.exchange/api/pair/reg", {
    json: params
  });
  const map = JSON.parse(res.getBody('utf8'));
  if(map && map['status'] && map['status']===1){
    return true
  }
  return false;
}

export function regPair1(chainId: number|undefined, tokenA: string|undefined, tokenB: string|undefined) : Promise<boolean>{
  if(!chainId || !tokenA || !tokenB){
    return new Promise<boolean>(()=>{return false})
  }
  const params = {
    "chainId":chainId,
    "tokenA":tokenA, // "0x9bb5ace47e68616f64229b119f4c5d95::coin111::coin111"
    "tokenB":tokenB, // "0x9bb5ace47e68616f64229b119f4c5d95::coin222::coin222"
  };
  //最长等待60s todo 待修改api地址
  return fetch("https://aswap.exchange/api/pair/reg", {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(response => response.json())
    .then((map => {
        if(map && map['status'] && map['status']===1){
          return true
        }
        return false
      }))
      .catch((reason => {
        console.log(reason)
        return false
      }))

}
