import { rem } from 'polished';
import styled from 'styled-components';
import theme from '../../../styles/theme';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  height: 4rem;
  padding: ${rem(8)} ${rem(16)};
  background-color: ${theme.colors.darkBlack};
  width: 100%;
  z-index: 2;

  h1 {
    position: absolute;
    top: 50%;
    left: ${rem(16)};
    color: ${theme.colors.orangeBase};
    font-size: ${rem(20)};
    font-weight: 700;
    transform: translateY(-50%);
    margin: 0;
  }
`;
