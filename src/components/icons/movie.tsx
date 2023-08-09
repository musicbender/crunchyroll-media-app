import { FC } from 'react';
import theme from '../../styles/theme';

interface Props {
  size?: number;
  fill?: string;
}

export const Movie: FC<Props> = ({ fill = theme.colors.grey, size = 20 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox="0 -960 960 960">
    <path
      fill={fill}
      d="m140-800 74 152h130l-74-152h89l74 152h130l-74-152h89l74 152h130l-74-152h112q24 0 42 18t18 42v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18Zm0 212v368h680v-368H140Zm0 0v368-368Z"
    />
  </svg>
);

export default Movie;
