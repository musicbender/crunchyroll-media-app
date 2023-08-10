import { rem } from 'polished';
import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export type InputWrapperProps = {
  hasIcon?: boolean;
};

export type InputFieldProps = {
  hasError?: boolean;
};

export const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;

  ${({ hasIcon }) =>
    hasIcon &&
    css`
      ${Input} {
        &[type] {
          padding-left: ${rem(42)};
        }
      }
    `}
`;

export const InputLabel = styled.label<InputFieldProps>`
  display: inline-block;
  margin-bottom: ${rem(8)};
  color: ${theme.colors.black};
  font-weight: 500;
  font-size: ${rem(16)};
  line-height: ${rem(20)};

  ${({ hasError }) =>
    hasError &&
    css`
      color: ${theme.colors.error};
    `}
`;

export const InnerWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<InputFieldProps>`
  &[type] {
    display: block;
    width: 100%;
    padding: ${rem(11)} ${rem(16)};
    font-size: ${rem(18)};
    box-shadow: none;
    background-color: ${theme.colors.white};
    border: ${rem(1)} solid ${theme.colors.grey};
    border-radius: ${rem(8)};
    line-height: ${rem(24)};

    &::placeholder {
      color: ${theme.colors.grey};
      font-size: ${rem(18)};
      opacity: 1;
    }

    &:focus,
    &:active {
      border-color: ${theme.colors.orangeDark};
    }

    &:focus-visible {
      outline-color: ${theme.colors.orangeDark};
      outline-width: ${rem(2)};
    }

    ${({ hasError }) =>
      hasError &&
      css`
        &,
        &:focus,
        &:active {
          border-color: ${theme.colors.error};
        }

        &::placeholder {
          color: ${theme.colors.error};
        }
      `}
  }

  &:-webkit-autofill {
    &:hover,
    &:focus,
    &:active {
      box-shadow: 0 0 0 ${rem(50)} ${theme.colors.white} inset;
      transition: none;
    }
  }
`;

export const ErrorText = styled.p`
  margin: ${rem(4)} 0 0 0;
  padding: ${rem(8)} 0 0 ${rem(16)};
  font-size: ${rem(12)};
  line-height: 1;
  color: ${theme.colors.error};
`;

export const IconWrapper = styled.div`
  left: ${rem(16)};
  height: auto;

  &,
  > svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;
