import { createGlobalStyle } from 'styled-components';
import { media } from './breakpoints';
import { normalize } from 'styled-normalize';
import { Theme } from '../types';
import theme from './theme';
import { rem } from 'polished';

type GlobalStyles = {
  theme: Theme;
  media?: any;
};

export default createGlobalStyle<GlobalStyles>`
  ${normalize}

  html {
    -webkit-font-smoothing: antialiased;
    margin: 0;
    background: ${theme.colors.offWhite};
    box-sizing: border-box;
    font-size: ${rem(16)};

    ${media.tablet`
     font-size: ${rem(17)};
    `}
  }

  body {
    position: relative;
    padding: 0;

    &::-webkit-scrollbar {
      width: ${rem(0)};
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.17);
    }

    &.modal-open {
      overflow: hidden;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  p, h1, h2, h3, h4, h5, h6, div, input, form, span {
    font-family: "Lato", "sans-serif";
    font-weight: 400;
    color: ${theme.colors.darkBlack};
  }

  p {
    font-size: 1rem;
    line-height: 2.5;
    letter-spacing: ${rem(2)};
  }
`;
