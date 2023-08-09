import { FC } from 'react';
import theme from '../../styles/theme';

interface Props {
  size?: number;
  fill?: string;
}

export const Edit: FC<Props> = ({ fill = theme.colors.grey, size = 20 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox="0 -960 960 960">
    <path
      fill={fill}
      d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
    />
  </svg>
);

export default Edit;
