import { Currency, Token } from '@uniswap/sdk-core'
import { Currency as CurrencyNew, Token as TokenNew } from '@aswaporg/aswap-sdk-core'
import { KeyboardEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import {ExtendedStar, STC} from '../../constants/tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import {
  useAllTokens,
  useToken,
  useIsUserAddedToken,
  useSearchInactiveTokenLists,
  useToken1,
} from '../../hooks/Tokens'
import { CloseIcon, TYPE, ButtonText, IconWrapper } from '../../theme'
import {isAddress, toLowerCaseAddress} from '../../utils'
import Column from '../Column'
import Row, { RowBetween, RowFixed } from '../Row'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import {filterTokens, useSortedTokensByQuery} from './filtering'
import { useTokenComparator } from './sorting'
import { PaddedColumn, SearchInput, Separator } from './styleds'
import AutoSizer from 'react-virtualized-auto-sizer'
import styled from 'styled-components/macro'
import useToggle from 'hooks/useToggle'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useTheme from 'hooks/useTheme'
import ImportRow from './ImportRow'
import { Edit } from 'react-feather'
import useDebounce from 'hooks/useDebounce'
import {
  useTokenDecimals,
  useTokenDecimals1,
  useTokenDecimals2,
  useTokenDecimals3
} from "../../hooks/useTokenSwapRouter";
import {Field} from "../../state/mint/actions";

const ContentWrapper = styled(Column)`
  width: 100%;
  flex: 1 1;
  position: relative;
`

const Footer = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme }) => theme.bg1};
  border-top: 1px solid ${({ theme }) => theme.bg2};
`

interface CurrencySearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
  showManageView: () => void
  showImportView: () => void
  setImportToken: (token: Token) => void
}

export default function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  showCurrencyAmount,
  disableNonToken,
  onDismiss,
  isOpen,
  showManageView,
  showImportView,
  setImportToken,
}: CurrencySearchProps) {
  const { chainId } = useActiveWeb3React()
  const theme = useTheme()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const [searchToken, setSearchToken] = useState<TokenNew|undefined>(undefined);

  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  // if they input an address, use it
  const isAddressSearch = isAddress(debouncedQuery)

  // let searchToken = useToken1(debouncedQuery)

  // const {data:searchToken} = useTokenDecimals2(debouncedQuery)

  const asyncSearchToken = useTokenDecimals3(debouncedQuery);
  asyncSearchToken.then((sss)=> {
    setSearchToken(sss)
  })

  useEffect(() => {
    if (isAddressSearch) {

    }
  }, [isAddressSearch])

  // const searchToken = useTokenDecimals3(debouncedQuery)

  // const data = useTokenDecimals1(searchQuery)

  console.log("data")

  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const tokenComparator = useTokenComparator(invertSearchOrder)

  //asdf1 ??????token
  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), toLowerCaseAddress(debouncedQuery))
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  //asdf1 ??????token
  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const star = useMemo(() => chainId && ExtendedStar.onChain(chainId), [chainId])

  const filteredSortedTokensWithSTC: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    if (s === '' || s === 's' || s === 'st' || s === 'stc') {
      return star ? [star, ...filteredSortedTokens] : filteredSortedTokens
    }
    return filteredSortedTokens
  }, [debouncedQuery, star, filteredSortedTokens])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen])

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    // console.log("sss")
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'stc' && star) {
          handleCurrencySelect(star)
        } else if (filteredSortedTokensWithSTC.length > 0) {
          if (filteredSortedTokensWithSTC.length > 0) {
            if (
              filteredSortedTokensWithSTC[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
              filteredSortedTokensWithSTC.length === 1
            ) {
              handleCurrencySelect(filteredSortedTokensWithSTC[0])
            }
          }
        }
      }
    },
    [debouncedQuery, star, filteredSortedTokensWithSTC, handleCurrencySelect]
  )

  // menu ui
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined
  )

  return (
    <ContentWrapper>
      <PaddedColumn gap="16px">
        <RowBetween>
          <Text fontWeight={500} fontSize={16}>
            <Trans>Select a token</Trans>
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        <Row>
          <SearchInput
            type="text"
            id="token-search-input"
            placeholder={t`Search name or paste address`}
            autoComplete="off"
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
        </Row>
        {showCommonBases && (
          <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
        )}
      </PaddedColumn>
      <Separator />
      {searchToken && !searchTokenIsAdded ? (
        <Column style={{ padding: '20px 0', height: '100%' }}>
          <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
        </Column>
      ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
        <div style={{ flex: '1' }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <CurrencyList
                height={height}
                currencies={disableNonToken ? filteredSortedTokens : filteredSortedTokensWithSTC}
                otherListTokens={filteredInactiveTokens}
                onCurrencySelect={handleCurrencySelect}
                otherCurrency={otherSelectedCurrency}
                selectedCurrency={selectedCurrency}
                fixedListRef={fixedList}
                showImportView={showImportView}
                setImportToken={setImportToken}
                showCurrencyAmount={showCurrencyAmount}
              />
            )}
          </AutoSizer>
        </div>
      ) : (
        <Column style={{ padding: '20px', height: '100%' }}>
          <TYPE.main color={theme.text3} textAlign="center" mb="20px">
            <Trans>No results found.</Trans>
          </TYPE.main>
        </Column>
      )}
      <Footer>
        <Row justify="center">
          <ButtonText onClick={showManageView} color={theme.primary1} className="list-token-manage-button">
            <RowFixed>
              <IconWrapper size="16px" marginRight="6px" stroke={theme.primaryText1}>
                <Edit />
              </IconWrapper>
              <TYPE.main color={theme.primaryText1}>
                <Trans>Manage Token Lists</Trans>
              </TYPE.main>
            </RowFixed>
          </ButtonText>
        </Row>
      </Footer>
    </ContentWrapper>
  )
}
