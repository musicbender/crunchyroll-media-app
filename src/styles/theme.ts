import { rem, rgb } from 'polished';

const theme = {
  colors: {
    orangeBase: rgb(244, 117, 33),
    orangeDark: rgb(229, 106, 23),
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

export const boxShadows = {
  elevation1: `0 0 ${rem(2)} rgba(0, 0, 0, 0.14), 0 ${rem(2)} ${rem(
    2,
  )} rgba(0, 0, 0, 0.12), 0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.2)`,
  elevation2: `0 ${rem(2)} ${rem(4)} rgba(0, 0, 0, 0.14), 0 ${rem(4)} ${rem(
    5,
  )} rgba(0, 0, 0, 0.12), 0 ${rem(1)} ${rem(10)} rgba(0, 0, 0, 0.2)`,
  elevation3: `0 ${rem(9)} ${rem(12)} rgba(0, 0, 0, 0.14), 0 ${rem(3)} ${rem(
    16,
  )} rgba(0, 0, 0, 0.12), 0 ${rem(5)} ${rem(6)} rgba(0, 0, 0, 0.2)`,
  elevation4: `0 ${rem(24)} ${rem(38)} rgba(0, 0, 0, 0.14), 0 ${rem(9)} ${rem(
    46,
  )} rgba(0, 0, 0, 0.12), 0 ${rem(11)} ${rem(15)} rgba(0, 0, 0, 0.2)`,
};

export default theme;
