import { createGlobalStyle } from 'styled-components';
import { media } from './breakpoints';
import { normalize } from 'styled-normalize';
import { Theme } from '@types';

type GlobalStyles = {
  theme: Theme;
  media?: any;
};

export default createGlobalStyle<GlobalStyles>`
  ${normalize}
  html {
    -webkit-font-smoothing: antialiased;
    margin: 0;
    background: ${(props) => props.theme.modes.dark.bg}; 
    box-sizing: border-box;
    font-size: 16px;
    ${media.tablet`
     font-size: 17px;
    `}
  }
  body {
    position: relative;
    padding: 0;
    &::-webkit-scrollbar {
      width: 3px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.17);
    }
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  p, h1, h2, h3, h4, h5, h6, div, input, form, span {
    font-family: "Inconsolata", "serif";
    color: rgba(255, 255, 255, 0.87);
  }
  p {
    font-size: 1rem;
    line-height: 2.5;
    letter-spacing: 2px;
  }
`;
