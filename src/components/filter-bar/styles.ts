import { rem } from 'polished';
import styled from 'styled-components';

export const BarWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-bottom: ${rem(32)};
`;

export const AddItemText = styled.span`
  vertical-align: ${rem(3)};
`;

export const RightWrapper = styled.div`
  justify-self: end;

  > button {
    width: ${rem(168)};
  }
`;
