import { rgb } from 'polished';

const theme = {
  colors: {
    white: '#ffffff',
    offWhite: '#f5f5f5',
    black: '#282828',
    darkBlack: '#1e1e1e',
    darkerBlack: '#111111',
    matteBlack: '#000000',
    darkerGrey: '#242424',
    darkGrey: '#393939',
    grey: '#555555',
    lightGrey: rgb(150, 150, 150),
    error: '#E8233A',
    orangeBase: rgb(244, 117, 33),
  },
  fonts: {
    inconsolata: '"Inconsolata", "serif"',
  },
  animate: {
    easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeIn: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
    easeInOut: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    verySlow: '1000ms',
    slow: '750ms',
    moderate: '425ms',
    fast: '250ms',
  },
};

export default theme;
