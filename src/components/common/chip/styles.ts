import { rem, rgba } from 'polished';
import styled from 'styled-components';
import theme from '../../../styles/theme';

export const ChipWrapper = styled.p`
  display: inline-block;
  min-width: ${rem(60)};
  margin: 0;
  background-color: ${rgba(theme.colors.grey, 0.1)};
  border-radius: ${rem(20)};
  font-size: ${rem(10)};
  font-weight: 700;
  color: ${rgba(theme.colors.grey, 0.7)};
  letter-spacing: ${rem(0.1)};
  padding: 0 ${rem(8)};
  white-space: nowrap;
  text-align: center;
  line-height: 1.8;

  &:not(:last-of-type) {
    margin-right: ${rem(4)};
  }
`;
