import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

import * as Select from '@radix-ui/react-select';
import { rem } from 'polished';

export const SelectTrigger = styled(Select.SelectTrigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5;
  background-color: white;
  color: black;
  box-shadow: 0 2px 10px ${theme.colors.black};
`;

export const SelectIcon = styled(Select.SelectIcon)`
  color: ${theme.colors.black};
`;

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: ${rem(8)};
  z-index: 3;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: ${rem(5)};
`;

export const StyledItem = styled(Select.Item)`
  font-size: 13;
  line-height: 1;
  border-radius: 3;
  display: flex;
  align-items: center;
  height: 25;
  padding: 0 35px 0 25px;
  position: relative;

  &[data-highlighted] {
    outline: 'none';
    background-color: ${theme.colors.orangeBase};
    color: ${theme.colors.black};
  }
`;

export const SelectLabel = styled(Select.Label)`
  padding: 0 25px;
  font-size: 12;
  line-height: 25px;
`;

export const SelectSeparator = styled(Select.Separator)`
  height: ${rem(1)};
  background-color: ${theme.colors.grey};
  margin: ${rem(5)};
`;

export const StyledItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const scrollButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25;
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
