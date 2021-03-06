import { Currency, CurrencyAmount, Percent } from '@aswaporg/aswap-sdk-core'
import { useCallback, useContext, useState } from 'react'
import { Plus } from 'react-feather'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components/macro'
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button'
import { BlueCard, LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row, { RowBetween, RowFlat } from '../../components/Row'

import { ZERO_PERCENT } from '../../constants/misc'
import { useV2RouterContract } from '../../hooks/useContract'
import { PairState } from '../../hooks/useV2Pairs'
import { useActiveWeb3React } from '../../hooks/web3'
import {regPair, regPair1, useCurrency} from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'

import { useIsExpertMode, useUserSlippageToleranceWithDefault } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { calculateSlippageAmount } from '../../utils/calculateSlippageAmount'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import AppBody from '../AppBody'
import { Dots, Wrapper } from '../Pool/styleds'
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom'
import { currencyId } from '../../utils/currencyId'
import { PoolPriceBar } from './PoolPriceBar'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { SwitchLocaleLink } from 'components/SwitchLocaleLink'
import { t, Trans } from '@lingui/macro'
import { useAddLiquidity } from 'hooks/useTokenSwapScript'
import {useTokenDecimals2, useTokenDecimals3} from "../../hooks/useTokenSwapRouter";
import {Token as TokenNew} from "@aswaporg/aswap-sdk-core/dist/entities/token";

const DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const currencyA_1 = useCurrency(currencyIdA)
  const currencyB_1 = useCurrency(currencyIdB)

  const [currencyA, setCurrencyA] = useState<Currency|null|undefined>(currencyA_1);
  const [currencyB, setCurrencyB] = useState<Currency|null|undefined>(currencyB_1);
  // const {data:currencyA1} = useTokenDecimals2(currencyIdA)
  // const {data:currencyB1} = useTokenDecimals2(currencyIdB)
  const asyncSearchTokenA = useTokenDecimals3(currencyIdA);
  asyncSearchTokenA.then((sss)=> {
    if(currencyA_1===undefined){
      setCurrencyA(sss)
    }
  })
  const asyncSearchTokenB = useTokenDecimals3(currencyIdB);
  asyncSearchTokenB.then((sss)=> {
    if(currencyB_1 === undefined){
      setCurrencyB(sss)
    }
  })

  if(currencyIdB!==undefined && currencyB!==undefined){
    console.log("addd")
  }

  // const oneCurrencyIsWETH = Boolean(
  //   chainId &&
  //     ((currencyA && currencyA.equals(WETH9_EXTENDED[chainId])) ||
  //       (currencyB && currencyB.equals(WETH9_EXTENDED[chainId])))
  // )
  const oneCurrencyIsWETH = false

  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected

  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE) // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {}
  )

  const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {}
  )

  const router = useV2RouterContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], router?.address)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], router?.address)

  // const addTransaction = useTransactionAdder()

  const handleAddLiquidity = useAddLiquidity(account ?? undefined)

  //firstAdd????????????????????????
  async function onAddFunc(firstAdd: boolean|undefined) {
    if(firstAdd === undefined) return
    // if (!chainId || !library || !account || !router) return
    if (!chainId || !library || !account) return

    // console.log("adddd")
    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    // if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
    }

    setAttemptingTxn(true)

    if(firstAdd){
      //???????????????
      const regPairRes = regPair1(chainId, currencyA?.wrapped?.address, currencyB?.wrapped?.address)

      regPairRes.then((regFlag)=>{
        if(!regFlag){
          //todo ??????????????????????????????
          // console.log("?????????????????????")
          setAttemptingTxn(false)
          return
        }
        // console.log("?????????????????????")

        handleAddLiquidity(
            currencyA?.wrapped?.address ?? '',
            currencyB?.wrapped?.address ?? '',
            parsedAmountA.quotient.toString(),
            parsedAmountB.quotient.toString(),
            amountsMin[Field.CURRENCY_A].toString(),
            amountsMin[Field.CURRENCY_B].toString()
        ).then((hash) => {
              setAttemptingTxn(false)
              setTxHash(hash)
            })
            .catch((error) => {
              setAttemptingTxn(false)
              if (error?.code !== 4001) {
                console.error(error)
              }
            })
      })

    }else {
      // await estimate(...args, value ? { value } : {})
      //   .then((estimatedGasLimit) =>
      //     method(...args, {
      //       ...(value ? { value } : {}),
      //       gasLimit: calculateGasMargin(estimatedGasLimit),
      //     }).then((response) => {
      handleAddLiquidity(
          currencyA?.wrapped?.address ?? '',
          currencyB?.wrapped?.address ?? '',
          parsedAmountA.quotient.toString(),
          parsedAmountB.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString()
      )
          // .then((response) => {
          .then((hash) => {
            setAttemptingTxn(false)

            // addTransaction(response, {
            //   summary: t`Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
            //     currencies[Field.CURRENCY_A]?.symbol
            //   } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
            // })

            // setTxHash(response.hash)
            setTxHash(hash)

          })
          .catch((error) => {
            setAttemptingTxn(false)
            // we only care if the error is something _other_ than the user rejected the tx
            if (error?.code !== 4001) {
              console.error(error)
            }
          })
    }

  }

  const modalHeader = () => {
    return noLiquidity ? (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <Text fontSize={[ 24, 36, 42]} fontWeight={500} lineHeight="42px" marginRight={10}>
              {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}
            </Text>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={30}
            />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    ) : (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px'}}>
          <Text fontSize={[ 24, 36, 42]} fontWeight={500} lineHeight="42px" marginRight={10} style={{marginRight: '20px'}}>
            {liquidityMinted?.toSignificant(6)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
        <Row>
          <Text fontSize="24px">
            {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol + ' Pool Tokens'}
          </Text>
        </Row>
        <TYPE.italic fontSize={12} textAlign="left" padding={'0 0 15px 0 '}>
          <Trans>
            Output is estimated. If the price changes by more than {allowedSlippage.toSignificant(4)}% your transaction
            will revert.
          </Trans>
        </TYPE.italic>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={()=>onAddFunc(noLiquidity)}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = t`Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        //todo
        setCurrencyA(currencyA)
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA]
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        //todo
        setCurrencyB(currencyB)
        history.push(`/add/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB]
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const isCreate = history.location.pathname.includes('/create')

  const addIsUnsupported = useIsSwapUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  return (
    <>
      <AppBody>
        <AddRemoveTabs creating={isCreate} adding={true} defaultSlippage={DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE} />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={() => (
              <ConfirmationModalContent
                title={noLiquidity ? <Trans>You are creating a pool</Trans> : <Trans>You will receive</Trans>}
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
            currencyToAdd={pair?.liquidityToken}
          />
          <AutoColumn gap="20px">
            {noLiquidity ||
              (isCreate ? (
                <ColumnCenter>
                  <BlueCard>
                    <AutoColumn gap="10px">
                      <TYPE.link fontWeight={600} color={'primaryText1'}>
                        <Trans>You are the first liquidity provider.</Trans>
                      </TYPE.link>
                      <TYPE.link fontWeight={400} color={'primaryText1'}>
                        <Trans>The ratio of tokens you add will set the price of this pool.</Trans>
                      </TYPE.link>
                      <TYPE.link fontWeight={400} color={'primaryText1'}>
                        <Trans>Once you are happy with the rate click supply to review.</Trans>
                      </TYPE.link>
                    </AutoColumn>
                  </BlueCard>
                </ColumnCenter>
              ) : (
                <ColumnCenter>
                  <BlueCard>
                    <AutoColumn gap="10px">
                      <TYPE.link fontWeight={400} color={'primaryText1'}>
                        <Trans>
                          <b>
                            <Trans>Tip:</Trans>
                          </b>{' '}
                          When you add liquidity, you will receive pool tokens representing your position. These tokens
                          automatically earn fees proportional to your share of the pool, and can be redeemed at any
                          time.
                        </Trans>
                      </TYPE.link>
                    </AutoColumn>
                  </BlueCard>
                </ColumnCenter>
              ))}
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              onMax={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
              }}
              onCurrencySelect={handleCurrencyASelect}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-tokena"
              showCommonBases
            />
            <ColumnCenter>
              <Plus size="16" color={theme.text2} />
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onCurrencySelect={handleCurrencyBSelect}
              onMax={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
              }}
              showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-tokenb"
              showCommonBases
            />
            {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
              <>
                <LightCard padding="0px" borderRadius={'20px'}>
                  <RowBetween padding="1rem">
                    <TYPE.subHeader fontWeight={500} fontSize={14}>
                      {noLiquidity ? (
                        <Trans>Initial prices and pool share</Trans>
                      ) : (
                        <Trans>Prices and pool share</Trans>
                      )}
                    </TYPE.subHeader>
                  </RowBetween>{' '}
                  <LightCard padding="1rem" borderRadius={'20px'}>
                    <PoolPriceBar
                      currencies={currencies}
                      poolTokenPercentage={poolTokenPercentage}
                      noLiquidity={noLiquidity}
                      price={price}
                    />
                  </LightCard>
                </LightCard>
              </>
            )}

            {addIsUnsupported ? (
              <ButtonPrimary disabled={true}>
                <TYPE.main mb="4px">
                  <Trans>Unsupported Asset</Trans>
                </TYPE.main>
              </ButtonPrimary>
            ) : !account ? (
              <ButtonLight onClick={toggleWalletModal}>
                <Trans>Connect Wallet</Trans>
              </ButtonLight>
            ) : (
              <AutoColumn gap={'md'}>
                {(approvalA === ApprovalState.NOT_APPROVED ||
                  approvalA === ApprovalState.PENDING ||
                  approvalB === ApprovalState.NOT_APPROVED ||
                  approvalB === ApprovalState.PENDING) &&
                  isValid && (
                    <RowBetween>
                      {approvalA !== ApprovalState.APPROVED && (
                        <ButtonPrimary
                          onClick={approveACallback}
                          disabled={approvalA === ApprovalState.PENDING}
                          width={approvalB !== ApprovalState.APPROVED ? '48%' : '100%'}
                        >
                          {approvalA === ApprovalState.PENDING ? (
                            <Dots>
                              <Trans>Approving {currencies[Field.CURRENCY_A]?.symbol}</Trans>
                            </Dots>
                          ) : (
                            <Trans>Approve {currencies[Field.CURRENCY_A]?.symbol}</Trans>
                          )}
                        </ButtonPrimary>
                      )}
                      {approvalB !== ApprovalState.APPROVED && (
                        <ButtonPrimary
                          onClick={approveBCallback}
                          disabled={approvalB === ApprovalState.PENDING}
                          width={approvalA !== ApprovalState.APPROVED ? '48%' : '100%'}
                        >
                          {approvalB === ApprovalState.PENDING ? (
                            <Dots>
                              <Trans>Approving {currencies[Field.CURRENCY_B]?.symbol}</Trans>
                            </Dots>
                          ) : (
                            <Trans>Approve {currencies[Field.CURRENCY_B]?.symbol}</Trans>
                          )}
                        </ButtonPrimary>
                      )}
                    </RowBetween>
                  )}
                <ButtonError
                  onClick={() => {
                    expertMode ? onAddFunc(undefined) : setShowConfirm(true)
                  }}
                  // disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                  disabled={!isValid}
                  error={!isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]}
                >
                  <Text fontSize={20} fontWeight={500}>
                    {error ?? <Trans>Supply</Trans>}
                  </Text>
                </ButtonError>
              </AutoColumn>
            )}
          </AutoColumn>
        </Wrapper>
      </AppBody>
      <SwitchLocaleLink />

      {!addIsUnsupported ? (
        pair && !noLiquidity && pairState !== PairState.INVALID ? (
          <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
            <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
          </AutoColumn>
        ) : null
      ) : (
        <UnsupportedCurrencyFooter
          show={addIsUnsupported}
          currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]}
        />
      )}
    </>
  )
}
