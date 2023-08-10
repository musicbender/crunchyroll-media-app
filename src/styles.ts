import { rem } from 'polished';
import styled from 'styled-components';

export const MainWrapper = styled.main`
  position: relative;
  padding: ${rem(16)};
  min-height: calc(100vh - ${rem(64)});
`;
