// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import {
  STC,
  Coin101,
  // XCOIN,
  AMPL,
  DAI,
  ExtendedStar,
  WETH9_EXTENDED,
} from './tokens'
import {Token as TokenNew} from "@aswaporg/aswap-sdk-core";
import request from "sync-request";

type ChainTokenList = {
  readonly [chainId: number]: TokenNew[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

const WETH_ONLY: ChainTokenList = {
  [SupportedChainId.MAINNET]: [WETH9_EXTENDED[SupportedChainId.MAINNET]],
}
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  // [1]: [...WETH_ONLY[1], DAI, USDC, USDT, WBTC],
  [SupportedChainId.BARNARD]: [Coin101[SupportedChainId.BARNARD]],
  // [SupportedChainId.LOCAL]: [XCOIN[SupportedChainId.LOCAL]],
}
// export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
//   [1]: {
//     '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
//     '0xA948E86885e12Fb09AfEF8C52142EBDbDf73cD18': [UNI[1]],
//     '0x561a4717537ff4AF5c687328c0f7E90a319705C0': [UNI[1]],
//     '0xE0360A9e2cdd7d03B9408c7D3001E017BAc2EcD5': [UNI[1]],
//     '0xa6e3454fec677772dd771788a079355e43910638': [UMA],
//     '0xB46F57e7Ce3a284d74b70447Ef9352B5E5Df8963': [UMA],
//     [FEI.address]: [TRIBE],
//     [TRIBE.address]: [FEI],
//     [FRAX.address]: [FXS],
//     [FXS.address]: [FRAX],
//     [WBTC.address]: [renBTC],
//     [renBTC.address]: [WBTC],
//   },
// }
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: TokenNew[] } } = {
  [1]: {
    [AMPL.address]: [DAI, WETH9_EXTENDED[1]],
  },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  // [1]: [ExtendedStar.onChain(1), DAI, USDC, USDT, WBTC, WETH9_EXTENDED[1]],
  [SupportedChainId.BARNARD]: [ExtendedStar.onChain(SupportedChainId.BARNARD), Coin101[SupportedChainId.BARNARD]],
  // [SupportedChainId.LOCAL]: [ExtendedStar.onChain(SupportedChainId.LOCAL), XCOIN[SupportedChainId.LOCAL]],
  [3]: [ExtendedStar.onChain(3), WETH9_EXTENDED[3]],
  [4]: [ExtendedStar.onChain(4), WETH9_EXTENDED[4]],
  [5]: [ExtendedStar.onChain(5), WETH9_EXTENDED[5]],
  [42]: [ExtendedStar.onChain(42), WETH9_EXTENDED[42]],
}

export const PINNED_PAIRS: { readonly [chainId: number]: [TokenNew, TokenNew][] } = {
  // [SupportedChainId.BARNARD]: [
  //   [Coin101[SupportedChainId.BARNARD], STC[SupportedChainId.BARNARD]],
  //   [Coin102[SupportedChainId.BARNARD], STC[SupportedChainId.BARNARD]],
  //   [Coin102[SupportedChainId.BARNARD], Coin103[SupportedChainId.BARNARD]],
  // ],
}

/**
 * 跨路径的交易对（跨1级路径）
 */
// export const TRANS_PAIRS: { readonly [chainId: number]: [TokenNew, TokenNew][][] } = {
//   [SupportedChainId.BARNARD]: [
//     [
//       [Coin103[SupportedChainId.BARNARD], STC[SupportedChainId.BARNARD]],
//
//       [Coin102[SupportedChainId.BARNARD], STC[SupportedChainId.BARNARD]],
//       [Coin102[SupportedChainId.BARNARD], Coin103[SupportedChainId.BARNARD]],
//     ],
//   ],
// }

export function getAddressAllPairs(signerAddress: string | null | undefined, chainId: number | undefined) : [TokenNew, TokenNew][]{
  if(!signerAddress || !chainId){
    return []
  }
  const params = {
    "id":101,
    "jsonrpc":"2.0",
    "method":"state.list_resource",
    "params":[signerAddress, {"decode":true}]
  };
  const res = request('POST',"https://barnard-seed.starcoin.org", {
    json: params
  });
  const json = JSON.parse(res.getBody('utf8'));
  if(!json['result'] || !json['result']['resources']){
    return []
  }
  const map = json['result']['resources'];
  const pairList = new Array()
  for(let key in map){
    const index = key.indexOf('0x00000000000000000000000000000001::Token::TokenInfo<0x9bb5ace47e68616f64229b119f4c5d95::LiquidityToken::LiquidityToken<');
    if(index === -1){
      continue
    }
    const detail = map[key]['json']
    if(detail['total_value'] === 0){
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
    const t1 = new TokenNew(
        chainId,
        pairs[0].trim(),
        0, //todo 暂时写死，暂时没有用到
        pair0[2].trim(),
        pair0[2].trim()
    )
    const t2 = new TokenNew(
        chainId,
        pairs[1].trim(),
        0, //todo 暂时写死，暂时没有用到
        pair1[2].trim(),
        pair1[2].trim()
    )
    pairList.push([t1, t2])
  }

  // console.log("router")
  return pairList
}


export function getAswapAllPairs(chainId: number | undefined) : [TokenNew, TokenNew][]{
  if(!chainId){
    return []
  }
  const params = {
    "id":101,
    "jsonrpc":"2.0",
    "method":"contract.call",
    "params":[
      {
        "function_id":"0x9bb5ace47e68616f64229b119f4c5d95::Router02::all_pairs",
        "type_args":[],
        "args":[]
      }
    ]
  };
  const res = request('POST',"https://barnard-seed.starcoin.org", {
    json: params
  });
  const json = JSON.parse(res.getBody('utf8'));
  if(!json['result'] || !json['result'][0]['Vector']){
    return []
  }
  const allList = json['result'][0]['Vector'];
  const pairList = new Array()
  for (let i = 0; i < allList.length; i++) {
    const data = allList[i]['Struct']['value']
    const tokeA = data[0][1]
    const tokeAAccount = tokeA['Struct']['value'][0][1]['Address'].trim()
    const tokeAModuleName = hexCharCodeToStr(tokeA['Struct']['value'][1][1]['Bytes'].trim())
    const tokeAName = hexCharCodeToStr(tokeA['Struct']['value'][2][1]['Bytes'].trim())
    const tokeADecimals = data[1][1]['U128'].length-1
    const tokeB = data[2][1]
    const tokeBAccount = tokeB['Struct']['value'][0][1]['Address'].trim()
    const tokeBModuleName = hexCharCodeToStr(tokeB['Struct']['value'][1][1]['Bytes'].trim())
    const tokeBName = hexCharCodeToStr(tokeB['Struct']['value'][2][1]['Bytes'].trim())
    const tokeBpair0Decimals = data[3][1]['U128'].length-1
    const t1 = new TokenNew(
        chainId,
        `${tokeAAccount}::${tokeAModuleName}::${tokeAName}`,
        tokeADecimals,
        tokeAName,
        tokeAName
    )
    const t2 = new TokenNew(
        chainId,
        `${tokeBAccount}::${tokeBModuleName}::${tokeBName}`,
        tokeBpair0Decimals,
        tokeBName,
        tokeBName
    )
    pairList.push([t1, t2])
  }

  // console.log("router")
  return pairList
}

export function isSamePairs(pairs1: [TokenNew, TokenNew], pairs2: [TokenNew, TokenNew]) : boolean {
  if(pairs1.length !== pairs2.length){
    return false
  }
  if(pairs1[0].address === pairs2[0].address && pairs1[1].address === pairs2[1].address){
    return true;
  }
  if(pairs1[0].address === pairs2[1].address && pairs1[1].address === pairs2[0].address){
    return true;
  }
  return false;
}

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