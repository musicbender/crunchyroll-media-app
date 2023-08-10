import styled from 'styled-components';
import { media, sizes } from '../../styles/breakpoints';
import { rem } from 'polished';
import theme from '../../styles/theme';

export const MediaListWrapper = styled.div`
  margin: 1rem auto 1.45rem;
  max-width: ${rem(sizes.desktopS)};
  width: 100%;

  ${media.tablet`
    margin: 1.15rem auto 3rem;
  `}
`;

export const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-row-gap: rem;
  grid-column-gap: 1rem;
  margin-bottom: ${rem(64)};

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 2rem;
  `}
`;

export const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
`;

export const NoItemsText = styled.h2`
  font-size: ${rem(36)};
  color: ${theme.colors.lightGrey};
`;

export const ResetButton = styled.div`
  position: absolute;
  bottom: ${rem(16)};
  left: ${rem(16)};

  &:hover {
    cursor: pointer;
  }
`;
