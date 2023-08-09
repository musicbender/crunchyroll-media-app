import { rem } from 'polished';
import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

export type InputFieldProps = {
  hasError?: boolean;
};

export const InputWrapper = styled.div`
  width: 100%;
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
      border-color: ${theme.colors.black};
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
  padding: ${rem(8)} 0 0 ${rem(16)};
  color: ${theme.colors.error};
`;
