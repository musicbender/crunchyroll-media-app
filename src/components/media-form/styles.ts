import styled from 'styled-components';
import theme from '../../styles/theme';
import { rem } from 'polished';
import { Box } from '@rebass/grid';

export const MediaFormWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 1rem 2rem;
  background-color: ${theme.colors.white};
  border-radius: ${rem(8)};
  box-sizing: border-box;
  box-shadow:
    0 ${rem(10)} ${rem(20)} rgba(0, 0, 0, 0.19),
    0 ${rem(6)} ${rem(6)} rgba(0, 0, 0, 0.23);
  z-index: 1;
`;

export const FormTitle = styled.h2`
  margin: ${rem(8)} 0 ${rem(24)};
  font-weight: 700;
`;

export const SelectWrapper = styled(Box)`
  display: inline-block;
  width: calc(50% - ${rem(9)});
`;

export const CloseButton = styled.button`
  position: absolute;
  right: ${rem(24)};
  top: ${rem(24)};
  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;
