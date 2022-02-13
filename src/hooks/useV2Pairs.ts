import { computePairAddress, Pair } from '@aswaporg/aswap-v2-sdk'
import {Token as TokenNew} from '@aswaporg/aswap-sdk-core'
import { useMemo } from 'react'
import { V2_FACTORY_ADDRESSES } from '../constants/addresses'
import {Currency, CurrencyAmount, Token} from '@uniswap/sdk-core'
import {useAswapAllPairs, useBatchGetReserves} from './useTokenSwapRouter'
import {useActiveWeb3React} from "./web3";
import useStarcoinProvider from "./useStarcoinProvider";

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function useV2Pairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies]
  )

  const pairAddresses = useMemo<([string, string] | undefined)[]>(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA &&
          tokenB &&
          tokenA.chainId === tokenB.chainId &&
          !tokenA.equals(tokenB) &&
          V2_FACTORY_ADDRESSES[tokenA.chainId]
          ? // ? computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB })
            [tokenA.address, tokenB.address]
          : undefined
      }),
    [tokens]
  )

  // const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  const { data: results, isValidating } = useBatchGetReserves(pairAddresses)

    // console.log("total999", currencies)

    return useMemo(() => {
    return (
      results?.map((result, i) => {
        // const { result: reserves, loading } = result
        const reserves = result
        const tokenA = tokens[i][0]
        const tokenB = tokens[i][1]

        // if (loading) return [PairState.LOADING, null]
        if (isValidating) return [PairState.LOADING, null]
        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
        if (!reserves) return [PairState.NOT_EXISTS, null]
        // const { reserve0, reserve1 } = reserves
        const [reserve0, reserve1] = reserves
        if (!reserve0 || !reserve1) return [PairState.NOT_EXISTS, null]
        // const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
        const [token0, token1] = [tokenA, tokenB]
        const [res1, res2] = [
          PairState.EXISTS,
          new Pair(
            CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
            CurrencyAmount.fromRawAmount(token1, reserve1.toString())
          ),
        ]
        return [res1, res2]

      }) || [[PairState.NOT_EXISTS, null]]
    )
    // }, [results, tokens])
  }, [results, tokens, isValidating])
}

function transToken(list: any[]) : TokenNew{
    return new TokenNew(
        list[0],
        list[1],
        list[2],
        list[3],
        list[4],
    )
}

function transPairTokens(pairs: any[][]) : [TokenNew, TokenNew]{
    const t1 = new TokenNew(
        pairs[0][0],
        pairs[0][1],
        pairs[0][2],
        pairs[0][3],
        pairs[0][4],
    )
    const t2 = new TokenNew(
        pairs[1][0],
        pairs[1][1],
        pairs[1][2],
        pairs[1][3],
        pairs[1][4],
    )
    return [t1,t2]
}

function isSamePairs(pairs1: [TokenNew, TokenNew], pairs2: [TokenNew, TokenNew]) : boolean{
    const [p1a, p1b] = pairs1;
    const [p2a, p2b] = pairs2;
    if(p1a.address === p2a.address && p1b.address === p2b.address){
        return true;
    }
    if(p1a.address === p2b.address && p1b.address === p2a.address){
        return true;
    }
    return false;
}

export function useV2Pairs1(currencyA?: Currency, currencyB?: Currency): [PairState, Pair | null][] {

    const { account, chainId } = useActiveWeb3React()

    const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined]
    const provider = useStarcoinProvider()

    const {data: allAswapPairs} = useAswapAllPairs();
    // const allAswapPairs = useMemo(() => {
    //     return getAswapAllPairs(chainId)
    // },[chainId])

    //计算交易对
    const resPairs = new Array()

    if(tokenA && tokenB && allAswapPairs){
        //判断是否存在直接交易对
        for (let i = 0; i < allAswapPairs.length; i++) {
            const [tokenX, tokenY] = allAswapPairs[i] as [TokenNew, TokenNew];
            if(isSamePairs([tokenX, tokenY], [tokenA, tokenB])){
                //如果存在则直接使用
                resPairs.push([tokenX, tokenY])
                break
            }
        }
        if(resPairs.length === 0){
            //判断是否存在跨路径（一层）
            for (let i = 0; i < allAswapPairs.length; i++) {
                if(resPairs.length > 0) break
                for (let j = 0; j < allAswapPairs.length; j++) {
                    if(i === j){
                        continue
                    }
                    //交易对1的Token地址
                    const [pair1a, pair1b] = allAswapPairs[i] as [TokenNew, TokenNew];
                    //交易对2的Token地址
                    const [pair2a, pair2b] = allAswapPairs[j] as [TokenNew, TokenNew];

                    //交易对内部不能相同
                    if(pair1a.address === pair2a.address || pair1b.address === pair2b.address) continue
                    //两个交易对之间不能完全相同
                    if(pair1a.address === pair2a.address && pair1b.address === pair2b.address) continue
                    if(pair1a.address === pair2b.address && pair1b.address === pair2a.address) continue

                    //todo 可能效率会比较低
                    let pairMap = new Map()
                    pairMap.set(pair1a.address, pair1a)
                    pairMap.set(pair1b.address, pair1b)
                    if(pairMap.has(pair2a.address)){
                        pairMap.delete(pair2a.address)
                    }else {
                        pairMap.set(pair2a.address, pair2a)
                    }
                    if(pairMap.has(pair2b.address)){
                        pairMap.delete(pair2b.address)
                    }else {
                        pairMap.set(pair2b.address, pair2b)
                    }
                    if(pairMap.size === 2){
                        const pairMapValues = Array.from(pairMap.values());
                        if(isSamePairs([pairMapValues[0],pairMapValues[1]], [tokenA, tokenB])){
                            resPairs.push([pair1a, pair1b])
                            resPairs.push([pair2a, pair2b])
                            break
                        }
                    }

                    // if(pair1a.address === pair2a.address){
                    //     if(isSamePairs([pair1b, pair2b], [tokenA, tokenB])){
                    //         resPairs.push([pair1a, pair1b])
                    //         resPairs.push([pair2a, pair2b])
                    //         break
                    //     }
                    // }
                    //
                    // if(pair1a.address === pair2b.address){
                    //     if(isSamePairs([pair1b, pair2a], [tokenA, tokenB])){
                    //         resPairs.push([pair1a, pair1b])
                    //         resPairs.push([pair2a, pair2b])
                    //         break
                    //     }
                    // }
                    //
                    // if(pair1b.address === pair2a.address){
                    //     if(isSamePairs([pair1a, pair2b], [tokenA, tokenB])){
                    //         resPairs.push([pair1a, pair1b])
                    //         resPairs.push([pair2a, pair2b])
                    //         break
                    //     }
                    // }
                    //
                    // if(pair1b.address === pair2b.address){
                    //     if(isSamePairs([pair1a, pair2a], [tokenA, tokenB])){
                    //         resPairs.push([pair1a, pair1b])
                    //         resPairs.push([pair2a, pair2b])
                    //         break
                    //     }
                    // }

                }
            }
        }
    }

    const currencies = resPairs;

    const tokens = useMemo(
        () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
        [currencies]
    )

    const pairAddresses = useMemo<([string, string] | undefined)[]>(
        () =>
            tokens.map(([tokenA, tokenB]) => {
                return tokenA &&
                tokenB &&
                tokenA.chainId === tokenB.chainId &&
                !tokenA.equals(tokenB) &&
                V2_FACTORY_ADDRESSES[tokenA.chainId]
                    ? // ? computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB })
                    [tokenA.address, tokenB.address]
                    : undefined
            }),
        [tokens]
    )

    // const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
    const { data: results, isValidating } = useBatchGetReserves(pairAddresses)

    // console.log("total999", currencies)

    return useMemo(() => {
        return (
            results?.map((result, i) => {
                // const { result: reserves, loading } = result
                const reserves = result
                const tokenA = tokens[i][0]
                const tokenB = tokens[i][1]

                // if (loading) return [PairState.LOADING, null]
                if (isValidating) return [PairState.LOADING, null]
                if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
                if (!reserves) return [PairState.NOT_EXISTS, null]
                // const { reserve0, reserve1 } = reserves
                const [reserve0, reserve1] = reserves
                // const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
                const [token0, token1] = [tokenA, tokenB]
                const [res1, res2] = [
                    PairState.EXISTS,
                    new Pair(
                        CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
                        CurrencyAmount.fromRawAmount(token1, reserve1.toString())
                    ),
                ]
                return [res1, res2]

            }) || [[PairState.NOT_EXISTS, null]]
        )
        // }, [results, tokens])
    }, [results, tokens, isValidating])
}

export function useV2Pair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB])
  return useV2Pairs(inputs)[0]
}
