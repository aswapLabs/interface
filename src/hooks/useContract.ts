import { Contract } from '@ethersproject/contracts'
import { abi as GOVERNANCE_ABI } from '../constants/json/uniswapGov/GovernorAlpha.json'
import { abi as UNI_ABI } from '../constants/json/uniswapGov/Uni.json'
import { abi as STAKING_REWARDS_ABI } from '../constants/json/uniswapLiqudity/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '../constants/json/uniswapMarkle/MerkleDistributor.json'
import { abi as IUniswapV2PairABI } from '../constants/json/uniswapV2Core/IUniswapV2Pair.json'
import { abi as V3FactoryABI } from '../constants/json/uniswapV3Core/UniswapV3Factory.json'
import { abi as V3PoolABI } from '../constants/json/uniswapV3Core/UniswapV3Pool.json'
import { abi as QuoterABI } from '../constants/json/uniswapV3Periphery/Quoter.json'
import { abi as V2MigratorABI } from '../constants/json/uniswapV3Periphery/V3Migrator.json'
import { abi as IUniswapV2Router02ABI } from '../constants/json/uniswapV2Periphery/IUniswapV2Router02.json'

import ERC20_ABI from 'abis/erc20.json'
import MULTICALL_ABI from 'abis/multicall2.json'
import WETH_ABI from 'abis/weth.json'

import {
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  QUOTER_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
  V3_MIGRATOR_ADDRESSES,
  GOVERNANCE_ADDRESSES,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MULTICALL2_ADDRESSES,
  V2_ROUTER_ADDRESS,
} from 'constants/addresses'
import { abi as NFTPositionManagerABI } from '../constants/json/uniswapV3Periphery/NonfungiblePositionManager.json'
import { useMemo } from 'react'
import { Quoter, UniswapV3Factory, UniswapV3Pool } from 'types/v3'
import { NonfungiblePositionManager } from 'types/v3/NonfungiblePositionManager'
import { V3Migrator } from 'types/v3/V3Migrator'
import { getContract } from 'utils'
import { Erc20, Multicall2, Weth } from '../abis/types'
import { UNI, WETH9_EXTENDED } from '../constants/tokens'
import { useActiveWeb3React } from './web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  // const { library, account, chainId } = useActiveWeb3React()

  // return useMemo(() => {
  //   if (!addressOrAddressMap || !ABI || !library || !chainId) return null
  //   let address: string | undefined
  //   if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
  //   else address = addressOrAddressMap[chainId]
  //   if (!address) return null
  //   try {
  //     return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
  //   } catch (error) {
  //     console.error('Failed to get contract', error)
  //     return null
  //   }
  // }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
  return null
}

export function useV2MigratorContract() {
  return useContract<V3Migrator>(V3_MIGRATOR_ADDRESSES, V2MigratorABI, true)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH9_EXTENDED[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  // return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
  return null
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  // return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
  return null
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  // return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
  return null
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useV2RouterContract(): Contract | null {
  return useContract(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true)
}

export function useMulticall2Contract() {
  return useContract<Multicall2>(MULTICALL2_ADDRESSES, MULTICALL_ABI, false) as Multicall2
}

export function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceContracts(): (Contract | null)[] {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!library || !chainId) {
      return []
    }

    return GOVERNANCE_ADDRESSES.filter((addressMap) => Boolean(addressMap[chainId])).map((addressMap) => {
      try {
        return getContract(addressMap[chainId], GOVERNANCE_ABI, library, account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    })
  }, [library, chainId, account])
}

export function useUniContract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? UNI[chainId]?.address : undefined, UNI_ABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
  return useContract<NonfungiblePositionManager>(
    NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
    NFTPositionManagerABI,
    withSignerIfPossible
  )
}

export function useV3Factory() {
  return useContract<UniswapV3Factory>(V3_CORE_FACTORY_ADDRESSES, V3FactoryABI) as UniswapV3Factory | null
}

export function useV3Pool(address: string | undefined) {
  return useContract<UniswapV3Pool>(address, V3PoolABI)
}

export function useV3Quoter() {
  return useContract<Quoter>(QUOTER_ADDRESSES, QuoterABI)
}
