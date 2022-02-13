import { Currency, Token } from '@uniswap/sdk-core'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'
import {
    BASES_TO_CHECK_TRADES_AGAINST,
    CUSTOM_BASES, getAswapAllPairs,
} from '../constants/routing'
import { useActiveWeb3React } from './web3'

//todo 是否是无用代码？？？
export function useAllCurrencyCombinations(currencyA?: Currency, currencyB?: Currency): [Token, Token][] {
  const { chainId } = useActiveWeb3React()

  const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined]

  const bases: Token[] = useMemo(() => {
    if (!chainId) return []

    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
    // const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : []
    // const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : []

    // return [...common, ...additionalA, ...additionalB]
    return [...common]
  }, [chainId, tokenA, tokenB])

  const basePairs: [Token, Token][] = useMemo(
    () => flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])),
    [bases]
  )

  const tmpss =  useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA, tokenB]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]

              const customBasesA: Token[] | undefined = customBases?.[tokenA.address]
              const customBasesB: Token[] | undefined = customBases?.[tokenB.address]

              if (!customBasesA && !customBasesB) return true

              if (customBasesA && !customBasesA.find((base) => tokenB.equals(base))) return false
              if (customBasesB && !customBasesB.find((base) => tokenA.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId]
  );
  return tmpss;
}


export function useAllCurrencyCombinations1(currencyA?: Currency, currencyB?: Currency): [Token, Token][] {
    const { account, chainId } = useActiveWeb3React()

    const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined]

    // if(!tokenA || !tokenB){
    //     return []
    // }

    const allAswapPairs = useMemo(() => {
        return getAswapAllPairs(chainId)
    },[chainId])
    // const allAswapPairs = getAswapAllPairs(chainId)
    //计算交易对
    //如果存在则直接返回
    const resPairs = new Array()
    for (let i = 0; i < allAswapPairs.length; i++) {
        if(
            (allAswapPairs[i][0].address === tokenA?.address && allAswapPairs[i][1].address === tokenB?.address) ||
            (allAswapPairs[i][0].address === tokenB?.address && allAswapPairs[i][1].address === tokenA?.address)
        ){
            resPairs.push(allAswapPairs[i])
            return resPairs
        }
    }
    //如果不存在则计算一层路径是否存在
    //所有支持的跨路径的交易对
    // const allTransPairs = new Array()
    for (let i = 0; i < allAswapPairs.length; i++) {
        for (let j = 0; j < allAswapPairs.length; j++) {
            if(i === j){
                continue
            }
            //交易对1的TokenA地址
            const p1a = allAswapPairs[i][0].address;
            //交易对1的TokenB地址
            const p1b = allAswapPairs[i][1].address;
            //交易对2的TokenA地址
            const p2a = allAswapPairs[j][0].address;
            //交易对2的TokenB地址
            const p2b = allAswapPairs[j][1].address;
            //todo 可以暂时注释
            // if(p1a === p1b || p2a === p2b){
            //     continue
            // }
            // if(p1a === p2a && p1b === p2b){
            //     continue
            // }
            // if(p1a === p2b && p1b === p2a){
            //     continue
            // }
            if(p1a === p2a){
                //判断p1b和p2b 是否和 [tokenA,tokenB]相同
                if(
                    (p1b === tokenA?.address && p2b === tokenB?.address) ||
                    (p1b === tokenB?.address && p2b === tokenA?.address)
                ){
                    // allTransPairs.push([[tokenA,tokenB],allAswapPairs[i],allAswapPairs[j]])
                    resPairs.push(allAswapPairs[i])
                    resPairs.push(allAswapPairs[j])
                    return resPairs
                }
            } else if(p1a === p2b){
                ////判断p1b和p2a
                if(
                    (p1b === tokenA?.address && p2a === tokenB?.address) ||
                    (p1b === tokenB?.address && p2a === tokenA?.address)
                ){
                    // allTransPairs.push([[tokenA,tokenB],allAswapPairs[i],allAswapPairs[j]])
                    resPairs.push(allAswapPairs[i])
                    resPairs.push(allAswapPairs[j])
                    return resPairs
                }
            }
        }
    }
    //否则返回空
    return []

    // const bizPairs = [[tokenA, tokenB],[tokenB, tokenA]]
    // const bizPairs = [[tokenA, tokenB],[tokenB, tokenA], ...allAswapPairs]
    // const bizPairs = useMemo(() => {
    //     if (!chainId) return []
    //     if(!tokenA || !tokenB){
    //         return []
    //     }
    //     const allTransPairs = TRANS_PAIRS[chainId];
    //     const transPairs1 = [[tokenA, tokenB],[tokenB, tokenA]];
    //     for (let index in allTransPairs){
    //         if(
    //             (allTransPairs[index][0][0].address === tokenA?.address && allTransPairs[index][0][1].address === tokenB?.address) ||
    //             (allTransPairs[index][0][1].address === tokenA?.address && allTransPairs[index][0][0].address === tokenB?.address)
    //         ){
    //             transPairs1.push([allTransPairs[index][1][0],allTransPairs[index][1][1]]);
    //             transPairs1.push([allTransPairs[index][2][0],allTransPairs[index][2][1]]);
    //         }
    //     }
    //     return transPairs1;
    //     }, [chainId, tokenA, tokenB]
    // )

    // const allPinnedPairs = useMemo(() => {
    //     return getAddressAllPairs(account, chainId)
    // },[account, chainId, tokenA, tokenB])
    // const allPinnedPairs = getAddressAllPairs(account, chainId)

    // console.log("router01")

    // const tmpss = useMemo(
    //     () =>
    //         tokenA && tokenB
    //             ? bizPairs
    //             // [
    //             //     [tokenA, tokenB],
    //             //     [tokenB, tokenA],
    //             //     // TRANS_PAIRS[251][0][1],
    //             //     // TRANS_PAIRS[251][0][2],
    //             // ]
    //                 .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
    //                 .filter(([t0, t1]) => t0.address !== t1.address)
    //                 .filter(([tokenA, tokenB]) => {
    //                     if (!chainId) return true
    //                     // return true;
    //                     // const allPinnedPairs = PINNED_PAIRS[chainId]
    //                     // for (let pinnedPairs of allPinnedPairs){
    //                     //     if(pinnedPairs[0].address === tokenA.address && pinnedPairs[1].address === tokenB.address){
    //                     //         return true;
    //                     //     }
    //                     // }
    //                     // trans路径的交易对
    //                     // const allTransPairs = TRANS_PAIRS[chainId]
    //                     for (let pairs of allAswapPairs){
    //                         if(transPairs[0][0].address === tokenA.address && transPairs[0][1].address === tokenB.address){
    //                             return true;
    //                         }
    //                     }
    //                     return false;
    //                 })
    //             : [],
    //     [tokenA, tokenB, chainId]
    // );
    //
    // return tmpss;
}