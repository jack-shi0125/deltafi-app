import { useState, useCallback, useEffect } from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import Switch from "react-switch";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';

import { SolflareIcon, SolletIcon } from 'components';
import { Text } from 'components/Text';
import { WALLETS } from 'config/constants/constant'

import useTheme from 'hooks/useTheme'

interface MenuProps {
  readonly open: boolean;
  readonly full: boolean;
};

interface CloseProps {
  readonly show: boolean;
};

const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ full }) => full ? 'flex-start' : 'center'};
  background: ${({ theme }) => theme.colors.menuBackground};
  transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(100%)'};
  width: 100vw;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
  top: ${({ full }) => full ? 0 : 'unset'};
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  ${({ theme }) => theme.mediaQueries.md} {
		transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    width: inherit;
    max-width: 405px;
    height: 100vh;
    top: 0;
    right: 0;
    left: auto;
    flex-direction: row;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  padding: 27px 19px 0;
  ${({ theme }) => theme.mediaQueries.md} {
		padding: 27px 32px 0;
  }
`
const DropMenu = styled.div`
  width: 30px;
  height: 0;
  border: 2px solid rgba(154, 154, 154, 0.4); 
  border-radius: 5px;
  position: absolute;
  top: -10px;
  left: calc(50% - 15px);
  ${({ theme }) => theme.mediaQueries.md} {
		display: none;
  }
`
const Container = styled.div`
  padding: 0;
  .connect-wallet {
    font-size: 16px;
    font-weight: bold;
    font-family: 'DM Sans', sans-serif;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
  .agree-service {
    font-size: 14px;
    font-weight: 500;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
    }
  }
`
const ExternalLink = styled.a`
  color: #0177FB;
  outline: none;
`
const ConnectList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`
const ConnectItem = styled.div`
  background: ${({ theme }) => theme.colors.connectItem};
  border-radius: 8px;
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
  position: relative;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 138px;
    height: 138px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 160px;
    height: 160px; 
  }
  .connect-type {
    font-size: 14px;
    font-weight: 700;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 16px;
    }
  }
`
const Img = styled.img`
  width: 40px;
  height: 40px;
  // border-radius:50%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50px;
    height: 50px; 
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 60px;
    height: 60px; 
  }
`
const Wrapper = styled.div`
  padding: 27px;
`
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 28px 19px;
  border-radius: 20px 20px 0 0;
  background: ${({theme}) => theme.colors.footerMain};
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 0;
    justify-content: space-between;
    padding: 38px 32px;
  }
`
const Close = styled.div<CloseProps>`
  cursor: pointer;
  display: ${({ show }) => show ? 'block' : 'none'};
  position: absolute;
  left: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    position: unset;
  }
`

const BlurBackground = styled.div`
  position: absolute;
  width: 100vw;
  backdrop-filter: blur(10px);
  height: 100vh;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.blurBackground};
  z-index: 100;
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: none;
  }
`
let ts
const Menu = ({ open, setOpen, ...props }) => {
  const { select } = useWallet();
  const network = WalletAdapterNetwork.Devnet;

  const isHidden = open ? true : false;
  const { isDark } = useTheme()
  const [isAccept, setAccept] = useState(false)
  const [isFullNavigation, setFullNavigation] = useState(false)

  useEffect(() => {
    if (open) {
      setFullNavigation(false)
    }
  }, [open])

  const onClose = useCallback(() => {
    setFullNavigation(false)
    setOpen(false, 0)
  }, [setOpen])

  const onConnectWallet = (type: any) => {
    let wallet = null
    switch (type) {
      case WALLETS.LEDGER:
        break
      case WALLETS.SOLFLARE:
        wallet = getSolflareWebWallet({ network })
        break
      case WALLETS.SOLFLARE_EXTENSION:
        wallet = getSolflareWallet()
        break
      case WALLETS.SOLLET:
        wallet = getSolletWallet()
        break
      case WALLETS.SOLLET_EXTENSION:
        wallet = getSolletExtensionWallet({ network })
        break
      case WALLETS.PHANTOM:
        wallet = getPhantomWallet()
        break
      case WALLETS.MATHWALLLET:
        break
      default:
        break
    }

    if (wallet) {
      select(wallet.name)
    }
  }

  const onTouchStart = (e) => {
    ts = e.touches[0].clientY;
  }

  const onTouchEnd = (e) => {
    var te = e.changedTouches[0].clientY;
    if (ts > te + 5) {
      setFullNavigation(true)
    } else if (ts < te - 5) {
      if (isFullNavigation)
        setFullNavigation(false)
      else onClose()
    }
  }

  return (
    <>
      <StyledMenu open={open} full={isFullNavigation} aria-hidden={!isHidden} {...props}>
        <Container onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <DropMenu />
          <StyledDiv>
            <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} textTransform='uppercase' fontFamily="'DM Sans', sans-serif" className="connect-wallet">Connect Wallet</Text>
            <Close show={isFullNavigation} onClick={() => setOpen(false)}>
              <Text color={isDark ? "#FFFFFF" : "#1B0D3F"} fontFamily="'DM Sans', sans-serif" className="connect-wallet">&#10006;</Text>
            </Close>
          </StyledDiv>
          <FlexWrapper>
            <Text
              color={isDark ? "rgb(255, 255, 255, 0.5)" : "rgba(29, 29, 29, 0.84)"}
              fontFamily="'DM Sans', sans-serif"
              className="agree-service">
              I have read, understand, and agree to the <ExternalLink href="/terms" target="_blank" rel="noreferrer noopener">Terms of Service</ExternalLink>
            </Text>
            <Switch
              onColor="#76EE59"
              offColor="#DFDFDF"
              width={50}
              checkedIcon={false}
              uncheckedIcon={false}
              checked={isAccept}
              onChange={(value) => setAccept(value)}
            />
          </FlexWrapper>
          <Wrapper>
            <ConnectList>
              <ConnectItem>
                <Img src={isDark ? '/images/dark-ledger.png' : '/images/light-ledger.png'}  alt="Ledger Connect"/>
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.LEDGER}
                </Text>
              </ConnectItem>
              <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLFLARE)}>
                <SolflareIcon />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.SOLFLARE}
                </Text>
              </ConnectItem>
              <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLFLARE_EXTENSION)}>
                <SolflareIcon />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.SOLFLARE_EXTENSION}
                </Text>
              </ConnectItem>
              <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLLET)}>
                <SolletIcon />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.SOLLET}
                </Text>
              </ConnectItem>
              <ConnectItem onClick={() => onConnectWallet(WALLETS.SOLLET_EXTENSION)}>
                <SolletIcon />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.SOLLET_EXTENSION}
                </Text>
              </ConnectItem>
              <ConnectItem onClick={() => onConnectWallet(WALLETS.PHANTOM)}>
                <img alt="Phantom" width="20" height="20" src="https://www.phantom.app/img/logo.png" style={{ width: 60 }} />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.PHANTOM}
                </Text>
              </ConnectItem>
              <ConnectItem>
                <img alt="MathWallet" width="20" height="20" src="https://cdn.jsdelivr.net/gh/solana-labs/oyster@main/assets/wallets/mathwallet.svg" style={{ width: 60 }} />
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >
                  {WALLETS.MATHWALLLET}
                </Text>
              </ConnectItem>
              <ConnectItem>
                <Text 
                  color="#88809C"
                  fontFamily="'DM Sans', sans-serif" className="connect-type"
                >More <br/> Coming Soon</Text>
              </ConnectItem>
            </ConnectList>
          </Wrapper>
        </Container>
      </StyledMenu>
      {open && <BlurBackground onClick={() => setOpen(false)}/>}
    </>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Menu;
