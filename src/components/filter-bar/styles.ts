import { rem } from 'polished';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

export const BarWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  grid-gap: ${rem(16)};
  margin: 0 auto ${rem(32)};
  width: 100%;
  max-width: ${rem(400)};

  ${media.tablet`
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    max-width: 100%;
  `}

  ${media.desktopM`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  `}
`;

export const ButtonWrapper = styled.div`
  width: 100%;

  > button {
    width: 100%;
  }

  ${media.tablet`
    width: ${rem(48)};
    > button {
      width: auto;
    }
  `}
`;

export const AddItemText = styled.span`
  vertical-align: ${rem(3)};
`;

export const RightWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: ${rem(16)};
  justify-self: center;
  width: 100%;

  ${media.tablet`
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
    justify-self: end;
    width: auto;
  `}

  > button {
    width: 100%;

    ${media.tablet`
      width: ${rem(168)};
    `}
  }
`;
