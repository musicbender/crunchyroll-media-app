import styled from 'styled-components';
import theme, { boxShadows } from '../../styles/theme';
import { rem } from 'polished';
import { Box } from '@rebass/grid';
import { media } from '../../styles/breakpoints';

export const MediaFormWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  background-color: ${theme.colors.white};
  border-radius: ${rem(8)};
  box-sizing: border-box;
  box-shadow: ${boxShadows.elevation4};
  z-index: 1;

  ${media.tablet`
    height: auto;
  `}
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

export const ErrorText = styled.p`
  margin: ${rem(16)} 0;
  font-size: ${rem(16)};
  font-weight: 700;
  line-height: 1;
  color: ${theme.colors.error};
`;
