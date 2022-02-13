import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
import { Redirect } from 'react-router';
import AllBackground from '../assets/images/wall/background.png'
import BlueBall from '../assets/images/wall/blueBall.png'
import PurpleBall from '../assets/images/wall/purpleBall.png'
import Rocket from '../assets/images/wall/rocket.png'
import YellowBall from '../assets/images/wall/yellowBall.png'
// import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
// import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'

// import { RedirectDuplicateTokenIds } from './AddLiquidity/redirects'
// import Pool from './Pool'
// import PoolV2 from './Pool/v2'
// import PoolFinder from './PoolFinder'
// import RemoveLiquidity from './RemoveLiquidity'
// import RemoveLiquidityV3 from './RemoveLiquidity/V3'
// import Swap from './Swap'
// import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
// import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
// import { PositionPage } from './Pool/PositionPage'
// import AddLiquidity from './AddLiquidity'

import loadable from '../utils/loadable';
// const Load_RedirectPathToSwapOnly = loadable(() => import('./Swap/redirects'));
// const Load_RedirectToSwap = loadable(() => import('./Swap/redirects'));
const Load_Swap = loadable(() => import('./Swap'));
// const Load_PoolFinder = loadable(() => import('./PoolFinder'));
const Load_PoolV2 = loadable(() => import('./Pool/v2'));
// const Load_Pool = loadable(() => import('./Pool'));
// const Load_PositionPage = loadable(() => import('./Pool/PositionPage'));
// const Load_RedirectDuplicateTokenIdsV2 = loadable(() => import('./AddLiquidityV2/redirects'));
// const Load_RedirectDuplicateTokenIds = loadable(() => import('./AddLiquidity/redirects'));
// const Load_AddLiquidity = loadable(() => import('./AddLiquidity'));
const Load_AddLiquidityV2 = loadable(() => import('./AddLiquidityV2'));
const Load_RemoveLiquidity = loadable(() => import('./RemoveLiquidity'));
// const Load_RemoveLiquidityV3 = loadable(() => import('./RemoveLiquidity/V3'));


const Load_DarkModeQueryParamReader = loadable(() => import('../theme/DarkModeQueryParamReader'));
const Load_ApeModeQueryParamReader = loadable(() => import('hooks/useApeModeQueryParamReader'));


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  background: url(${AllBackground});
  min-height: 100vh;
  &:before {
    content: '';
    display: block;
    width: 12vh;
    height: 12vh;
    background: url(${BlueBall}) no-repeat;
    background-size: contain;
    position: fixed;
    top: 23vh;
    left: 9vw;
  }
  &:after {
    content: '';
    display: block;
    width: 7vh;
    height: 7vh;
    background: url(${YellowBall}) no-repeat;
    background-size: contain;
    position: fixed;
    top: 15vh;
    right: 16vw;
  }
  
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  &:before {
    content: '';
    display: block;
    width: 10vw;
    height: 20vh;
    background: url(${Rocket}) no-repeat;
    background-size: contain;
    position: fixed;
    top: 62vh;
    left: 19vw;
    opacity: 0.8;
  }
  &:after {
    content: '';
    display: block;
    width: 16vh;
    height: 16vh;
    background: url(${PurpleBall}) no-repeat;
    background-size: contain;
    position: fixed;
    top: 60vh;
    right: 10vw;
    z-index: -1;
    opacity: 0.9;
    
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 6rem 16px 16px 16px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`
const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <ErrorBoundary>
      <Route component={Load_DarkModeQueryParamReader} />
      <Route component={Load_ApeModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Web3ReactManager>
            <Switch>
              {/*<Route exact strict path="/send" component={Load_RedirectPathToSwapOnly} />*/}
              {/*<Route exact strict path="/swap/:outputCurrency" component={Load_RedirectToSwap} />*/}
              <Route exact strict path="/swap" component={Load_Swap} />

              {/*<Route exact strict path="/pool/v2/find" component={Load_PoolFinder} />*/}
              <Route exact strict path="/pool" component={Load_PoolV2} />
              {/*<Route exact strict path="/pool" component={Load_Pool} />*/}
              {/*<Route exact strict path="/pool/:tokenId" component={PositionPage} />*/}

              {/*<Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />*/}
              <Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={Load_AddLiquidityV2} />
              {/*<Route exact strict path="/add/:currencyIdA?/:currencyIdB?/:feeAmount?" component={RedirectDuplicateTokenIds} />*/}
              {/*<Route exact strict path="/increase/:currencyIdA?/:currencyIdB?/:feeAmount?/:tokenId?" component={Load_AddLiquidity} />*/}
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={Load_RemoveLiquidity} />
              {/*<Route exact strict path="/remove/:tokenId" component={RemoveLiquidityV3} />*/}

              {/*<Route component={Load_RedirectPathToSwapOnly} />*/}
              <Route
                                exact
                                path="/"
                                render={() => (<Redirect to="/swap" />)}
              />;
              <Route component={Load_Swap} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </ErrorBoundary>
  )
}
