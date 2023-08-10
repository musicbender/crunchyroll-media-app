import { rem, rgba } from 'polished';
import styled, { keyframes, css } from 'styled-components';
import theme from '../../../styles/theme';

interface ModalProps {
  show?: boolean;
}

const duration = '325';

const showOverlay = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const showInner = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-50%, calc(-50% + 2rem), 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
`;

const showInnerMobile = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-50%, 2rem, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 10;
`;

export const ModalOverlay = styled.div<ModalProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(theme.colors.black, 0.65)};
  transition: opacity ${duration}ms ease-out;
  animation: ${showOverlay} ${duration}ms ease-in-out;
  z-index: 1;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
    `}
  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      animation: none;
    `}
`;

export const ModalInner = styled.div<ModalProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate3d(-50%, 2rem, 0);
  transition:
    transform ${duration}ms ease-in-out,
    opacity ${duration}ms ease-in-out;
  animation: ${showInnerMobile} ${duration}ms ease-in-out;
  z-index: 2;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    `}

  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      transform: translate3d(-50%, 2em, 0);
      animation: none;
    `}

  @media (min-width: ${rem(767)}), (orientation: landscape) {
    top: 25%;
    width: 80%;
    height: 23.75rem;
    max-width: 38rem;
    transform: translate3d(-50%, -50%, 0);
    animation: ${showInner} ${duration}ms ease-in-out;

    ${({ show }) =>
      show &&
      css`
        transform: translate3d(-50%, -50%, 0);
      `}

    ${({ show }) =>
      !show &&
      css`
        transform: translate3d(-50%, calc(-50% + 2rem), 0);
      `}
  }
`;
