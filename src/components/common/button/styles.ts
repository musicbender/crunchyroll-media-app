import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';
import { rem, rgba } from 'polished';
import Spinner from '../../icons/spinner';

interface BtnProps {
  isLoading?: boolean;
}

export const BtnWrapper = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: ${rem(16)};
  background-color: ${rgba(theme.colors.orangeBase, 0.75)};
  border-radius: ${rem(25)};
  outline: none;
  align-items: center;
  justify-content: center;
  min-width: ${rem(120)};
  border: none;
  box-shadow: inset 0 0 0 0 transparent;
  transition: all 200ms ease-in-out;
  opacity: 1;

  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.orangeBase};
  }

  &:focus {
    cursor: pointer;
    outline: 1px solid ${theme.colors.orangeDark};
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const InnerWrapper = styled.span<BtnProps>`
  position: relative;

  ${({ isLoading }) =>
    isLoading &&
    css`
      margin-left: 1.5rem;
    `}
`;

export const StyledSpinner = styled(Spinner).attrs({
  size: 24,
})`
  display: inline-block;
  position: absolute;
  left: -${rem(28)};
`;
