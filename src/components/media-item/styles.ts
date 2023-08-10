import { rem, rgba } from 'polished';
import styled, { keyframes } from 'styled-components';
import { media } from '../../styles/breakpoints';
import theme, { boxShadows } from '../../styles/theme';
import Spinner from '../icons/spinner';

interface CardWrapperProps {
  index: number;
}

const showCard = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 1em, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const iconSize = 55;

export const CardWrapper = styled.div<CardWrapperProps>`
  position: relative;
  width: 100%;
  margin-bottom: ${rem(10)};
  padding: 0.85rem 1rem 0.5rem;
  align-items: center;
  background-color: ${theme.colors.white};
  box-shadow: ${boxShadows.elevation1};
  border-radius: ${rem(8)};
  box-sizing: border-box;
  opacity: 0;
  transform: translate3d(0, 1em, 0);
  animation: ${showCard} 450ms ease-in-out forwards;
  ${({ index }) => `animation-delay: ${index * 100 + 100}ms;`}

  ${media.tablet`
    margin-bottom: ${rem(7)};
    padding: 1.2rem 1rem 0.5rem;
  `}
`;

export const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr ${rem(iconSize)};
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: inline-block;
  height: auto;
  margin: 0;
  text-align: left;
  overflow: hidden;
`;

export const SubTitle = styled.h4`
  margin: ${rem(8)} 0;
  font-weight: 400;
  font-size: ${rem(16)};
  color: ${theme.colors.lightGrey};
`;

export const Title = styled.h3`
  margin: ${rem(8)} 0 ${rem(12)} 0;
  font-size: ${rem(24)};
  font-weight: 700;
  color: ${theme.colors.black};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const IconCircle = styled.div`
  position: relative;
  background-color: ${rgba(theme.colors.orangeBase, 0.4)};
  border-radius: 100%;
  width: ${rem(iconSize)};
  height: ${rem(iconSize)};

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ActionIconsWrapper = styled.div`
  height: ${rem(32)};
  text-align: right;
`;

export const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  display: inline-block;
  margin-right: ${rem(20)};
  opacity: 0.66;

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 1;
    > svg path {
      fill: ${theme.colors.orangeBase} !important;
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const IconSpinner = styled(Spinner)`
  position: absolute;
  top: -${rem(8)};
  left: 0;
`;
