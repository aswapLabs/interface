import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import {providers} from "@starcoin/starcoin";
import {useCallback} from "react";
import {Currency, Token} from "@aswaporg/aswap-sdk-core";
import {useActiveWeb3React} from "./web3";
import {isAddress} from "../utils";
import {useAllTokens} from "./Tokens";
import {STC} from '../constants/tokens'

const PREFIX = '0x9bb5ace47e68616f64229b119f4c5d95::Router02::'

/**
 * 查询当前签名者在某代币对下的流动性
 */
// export function useLiquidity(signer?: string, x?: string, y?: string) {
//   const provider = useStarcoinProvider()
//   return useSWR(
//     signer && x && y ? [provider, 'liquidity', signer, x, y] : null,
//     async () =>
//       (await provider.call({
//         function_id: `${PREFIX}liquidity`,
//         type_args: [x!, y!],
//         args: [signer!],
//       })) as [number]
//   )
// }

/**
 * 查询某Token代币对总流动性
 */
export function useTotalLiquidity(x?: string, y?: string) {
    const provider = useStarcoinProvider()
    return useSWR(
        x && y ? [provider, 'total_liquidity', x, y] : null,
        async () =>
            (await provider.call({
                function_id: `${PREFIX}total_liquidity`,
                type_args: [x!, y!],
                args: [],
            })) as [number]
    )
}

/**
 * 通过是否存在精度来 检查token是否有效
 */
export function useTokenDecimals(address?: string){
    const provider = useStarcoinProvider()
    // const provider = new providers.Web3Provider(window.starcoin!, 'any')
    return useSWR(
        address ? [provider, 'scaling_factor', address] : null,
        async () =>
            (await provider.call({
                function_id: `0x1::Token::scaling_factor`,
                type_args: [address!],
                args: [],
            })) as [number]
    )
}
/**
 * 通过是否存在精度来 检查token是否有效
 */
export function useTokenDecimals1(address: string) {
    const provider = useStarcoinProvider()
    // const provider = new providers.Web3Provider(window.starcoin!, 'any')
    const { chainId } = useActiveWeb3React()
    return provider.send(
        'contract.call',
        [
            {
                function_id: '0x1::Token::scaling_factor',
                type_args: [address],
                args: [],
            },
        ],
    ).then((result: any) => {
        const addressArr = address.split('::')
        if(addressArr.length !== 3){
            return undefined
        }
        return new Token(
            chainId!,
            // address,
            addressArr[0].toLowerCase()+"::"+addressArr[1]+"::"+addressArr[2],
            result.length-1,
            addressArr[2],
            addressArr[2]
        )
    })
}

export function useTokenDecimals2(tokenAddress: string|undefined) {
    const provider = useStarcoinProvider()
    const { chainId } = useActiveWeb3React()
    const tokens = useAllTokens()

    console.log("sca")
    return useSWR(
        [provider, 'scaling_factor'],
        async () => {
            if(tokenAddress?.toUpperCase()==='STC'){
                return STC[chainId!]
            }
            const address = isAddress(tokenAddress)
            const token: Token | undefined = address ? tokens[address] : undefined
            if(token){
                return token
            }
            if (!chainId || !address || address==='') return undefined

            const res = (await provider.call({
                function_id: `0x1::Token::scaling_factor`,
                type_args: [address],
                args: [],
            }))[0] as string
            const addressArr = address?.split('::') || new Array()
            if(addressArr.length !== 3 || !res){
                return undefined
            }
            return new Token(
                chainId,
                // address,
                addressArr[0].toLowerCase()+"::"+addressArr[1]+"::"+addressArr[2],
                (res+'').length-1,
                addressArr[2],
                addressArr[2]
            )
        }
    )
}

export function useTokenDecimals3(tokenAddress: string|undefined) : Promise<Token | undefined>{
    const provider = useStarcoinProvider()
    const { chainId } = useActiveWeb3React()
    const tokens = useAllTokens()

    const address = isAddress(tokenAddress)
    const token: Token | undefined = address ? tokens[address] : undefined
    if(token){
        return new Promise<Token>(()=>{return token})
    }
    if (!chainId || !address || address==='') return new Promise<undefined>(()=>{return undefined})

    return provider.send(
        'contract.call',
        [
            {
                function_id: '0x1::Token::scaling_factor',
                type_args: [address],
                args: [],
            },
        ],
    ).then((result: any) => {
        const addressArr = address.split('::')
        if(addressArr.length !== 3){
            return undefined
        }
        const decimals = result[0]['U128'].length-1
        return new Token(
            chainId,
            // address,
            addressArr[0].toLowerCase()+"::"+addressArr[1]+"::"+addressArr[2],
            decimals,
            addressArr[2],
            addressArr[2]
        )
    })
}

/**
 * 获取当前的账户全部Resource（筛选是Aswap交易对且LPT>0 的交易对）
 */
export function useAccountAllResource() {
    const provider = useStarcoinProvider()
    const { account,chainId } = useActiveWeb3React()
    return useSWR(
        [provider, 'account_all_resource'],
        async () => {
            const res = (await provider.getResources(account??"")) as any
            const list = new Array();
            for (const key in res){
                const index = key.indexOf('0x00000000000000000000000000000001::Token::TokenInfo<0x9bb5ace47e68616f64229b119f4c5d95::LiquidityToken::LiquidityToken<');
                if(index === -1){
                    continue
                }
                if(res[key]['total_value'] === 0){
                    continue
                }
                let pairStr = key.substring(index+120)
                // 0x9bb5ace47e68616f64229b119f4c5d95::Coin101::Coin101, 0x00000000000000000000000000000001::STC::STC
                pairStr = pairStr.substring(0,pairStr.length-2)
                const pairs = pairStr.split(",")
                if(pairs.length !== 2){
                    continue
                }
                const pair0 = pairs[0].split("::");
                const pair1 = pairs[1].split("::");
                const t1 = new Token(
                    chainId!,
                    pairs[0].trim(),
                    0, //todo 暂时写死，暂时没有用到
                    pair0[2].trim(),
                    pair0[2].trim()
                )
                const t2 = new Token(
                    chainId!,
                    pairs[1].trim(),
                    0, //todo 暂时写死，暂时没有用到
                    pair1[2].trim(),
                    pair1[2].trim()
                )
                // const t1 = [
                //     chainId!,
                //     pairs[0].trim(),
                //     0, //todo 暂时写死，暂时没有用到
                //     pair0[2].trim(),
                //     pair0[2].trim()
                // ]
                // const t2 = [
                //     chainId!,
                //     pairs[1].trim(),
                //     0, //todo 暂时写死，暂时没有用到
                //     pair1[2].trim(),
                //     pair1[2].trim()
                // ]
                list.push([t1, t2])
            }
            return list
        }
    )
}

/**
 * 获取Aswap全部交易对（todo 目前无法交易对余额）
 */
export function useAswapAllPairs() {
    const provider = useStarcoinProvider()
    const { chainId } = useActiveWeb3React()
    // return useSWR(
    //     [provider, 'all_pairs'],
    //     async () =>
    //         (await provider.call({
    //             function_id: `${PREFIX}all_pairs`,
    //             type_args: [],
    //             args: [],
    //         }))[0] as [any]
    // )
    return useSWR(
        [provider, 'all_pairs'],
        async () => {
            const res = (await provider.call({
                function_id: `${PREFIX}all_pairs`,
                type_args: [],
                args: [],
            }))[0] as [any]
            return res.map((pairInfo, i) => {
                const {token_x_precision, token_y_precision, tokencode_x, tokencode_y} = pairInfo
                const token_x_addr = tokencode_x['addr']
                const token_x_module = hexCharCodeToStr(tokencode_x['module_name'])
                const token_x_name = hexCharCodeToStr(tokencode_x['name'])
                const token_y_addr = tokencode_y['addr']
                const token_y_module = hexCharCodeToStr(tokencode_y['module_name'])
                const token_y_name = hexCharCodeToStr(tokencode_y['name'])
                const tokenX = new Token(
                    chainId!,
                    `${token_x_addr}::${token_x_module}::${token_x_name}`,
                    (token_x_precision+'').length-1,
                    token_x_name,
                    token_x_name
                )
                const tokenY = new Token(
                    chainId!,
                    `${token_y_addr}::${token_y_module}::${token_y_name}`,
                    (token_y_precision+'').length-1,
                    token_y_name,
                    token_y_name
                )
                // const tokenX = [
                //     chainId,
                //     `${token_x_addr}::${token_x_module}::${token_x_name}`,
                //     (token_x_precision+'').length-1,
                //     token_x_name,
                //     token_x_name
                // ]
                // const tokenY = [
                //     chainId,
                //     `${token_y_addr}::${token_y_module}::${token_y_name}`,
                //     (token_y_precision+'').length-1,
                //     token_y_name,
                //     token_y_name
                // ]
                return [tokenX, tokenY]
            })
        }
    )
}

/**
 * 查询代币对池中的总额度
 */
// export function useGetReserves(x?: string, y?: string) {
//   const provider = useStarcoinProvider()
//   return useSWR(
//     x && y ? [provider, 'get_reserves', x, y] : null,
//     async () =>
//       (await provider.call({
//         function_id: `${PREFIX}get_reserves`,
//         type_args: [x!, y!],
//         args: [],
//       })) as [number, number]
//   )
// }

export function useBatchGetReserves(pairs: ([string, string] | undefined)[]) {
    const provider = useStarcoinProvider()
    return useSWR(
        pairs.length
            ? [provider, 'batch_get_reserves', ...pairs.map((pair) => (pair ? `${pair[0]}${pair[1]}` : ''))]
            : null,
        () =>
            Promise.all(
                pairs.map(async (pair) =>
                    pair
                        ? ((await provider.call({
                            function_id: `${PREFIX}get_reserves`,
                            type_args: pair,
                            args: [],
                        })) as [number, number])
                        : []
                )
            )
    )
}

/**
 * 根据x计算y (无手续费)
 */
// export function useQuote(amount_x?: number | string, reverse_x?: number, reverse_y?: number) {
//   const provider = useStarcoinProvider()
//   return useSWR(
//     amount_x && reverse_x && reverse_y ? [provider, 'quote', amount_x, reverse_x, reverse_y] : null,
//     async () =>
//       (await provider.call({
//         function_id: `${PREFIX}quote`,
//         type_args: [],
//         args: [`${amount_x!.toString()}u128`, `${reverse_x!.toString()}u128`, `${reverse_y!.toString()}u128`],
//       })) as [number]
//   )
// }

/**
 * 根据换入额度计算换出额度，固定千分之三手续费
 */
// export function useGetAmountOut(amount_in?: number | string, reverse_in?: number, reverse_out?: number) {
//   const provider = useStarcoinProvider()
//   return useSWR(
//     amount_in && reverse_in && reverse_out ? [provider, 'get_amount_out', amount_in, reverse_in, reverse_out] : null,
//     async () =>
//       (await provider.call({
//         function_id: `${PREFIX}get_amount_out`,
//         type_args: [],
//         args: [`${amount_in!.toString()}u128`, `${reverse_in!.toString()}u128`, `${reverse_out!.toString()}u128`],
//       })) as [number]
//   )
// }

/**
 * 根据换出额度计算换入额度，固定千分之三手续费
 */
// export function useGetAmountIn(amount_out?: number | string, reverse_in?: number, reverse_out?: number) {
//   const provider = useStarcoinProvider()
//   return useSWR(
//     amount_out && reverse_in && reverse_out ? [provider, 'get_amount_in', amount_out, reverse_in, reverse_out] : null,
//     async () =>
//       (await provider.call({
//         function_id: `${PREFIX}get_amount_in`,
//         type_args: [],
//         args: [`${amount_out!.toString()}u128`, `${reverse_in!.toString()}u128`, `${reverse_out!.toString()}u128`],
//       })) as [number]
//   )
// }


//16进制转ASCII字符串
function hexCharCodeToStr(hexCharCodeStr : any) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        alert("存在非法字符!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}