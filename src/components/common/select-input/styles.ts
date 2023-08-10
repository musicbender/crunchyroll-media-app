import styled, { css } from 'styled-components';
import theme, { boxShadows } from '../../../styles/theme';

import * as Select from '@radix-ui/react-select';
import { rem, rgba } from 'polished';

export const SelectTrigger = styled(Select.SelectTrigger)`
  display: inline-flex;
  width: 100%;
  padding: ${rem(12)} ${rem(16)};
  align-items: center;
  justify-content: center;
  font-size: ${rem(14)};
  height: ${rem(48)};
  gap: ${rem(4)};
  color: black;
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

  &:focus-visible,
  &[data-state='open'] {
    border-color: ${theme.colors.orangeDark};
    outline: 1px solid ${theme.colors.orangeDark};
  }
`;

export const SelectIcon = styled(Select.SelectIcon)`
  color: ${theme.colors.black};
`;

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  width: ${rem(250)};
  background-color: white;
  border-radius: ${rem(8)};
  z-index: 3;
  box-shadow: ${boxShadows.elevation2};
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: ${rem(4)};
`;

export const StyledItem = styled(Select.Item)`
  display: flex;
  position: relative;
  height: ${rem(24)};
  padding: ${rem(8)} ${rem(36)} ${rem(8)} ${rem(24)};
  margin-bottom: ${rem(8)};
  font-size: ${rem(16)};
  line-height: 1;
  border-radius: ${rem(8)};
  align-items: center;
  outline: none;

  &:first-child {
    margin-top: ${rem(8)};
  }

  &[data-highlighted] {
    background-color: ${rgba(theme.colors.orangeBase, 0.33)};
    color: ${theme.colors.black};
  }
`;

export const StyledItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: ${rem(24)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const scrollButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${rem(24)};
  background-color: white;
  color: ${theme.colors.grey};
  cursor: default;
`;

export const SelectScrollUpButton = styled(Select.ScrollUpButton)`
  ${scrollButtonStyles}
`;

export const SelectScrollDownButton = styled(Select.ScrollDownButton)`
  ${scrollButtonStyles}
`;
