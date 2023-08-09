import styled from 'styled-components';
import theme from '../../styles/theme';
import { rem } from 'polished';

export const MediaFormWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30rem;
  padding: 4rem 2rem 1rem;
  background-color: ${theme.colors.white};
  border-radius: ${rem(8)};
  box-sizing: border-box;
  box-shadow:
    0 ${rem(10)} ${rem(20)} rgba(0, 0, 0, 0.19),
    0 ${rem(6)} ${rem(6)} rgba(0, 0, 0, 0.23);
  z-index: 1;
`;
