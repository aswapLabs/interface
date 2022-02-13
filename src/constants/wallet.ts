import { AbstractConnector } from '@web3-react/abstract-connector'
import STARMASK_ICON_URL from '../assets/images/starmask.png'
import {  injected,} from '../connectors'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  STARMASK: {
    connector: injected,
    name: 'StarMask',
    iconURL: STARMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
}
