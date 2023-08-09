import { FC } from 'react';
import theme from '../../styles/theme';

interface Props {
  size?: number;
  fill?: string;
}

export const TV: FC<Props> = ({ fill = theme.colors.grey, size = 20 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox="0 -960 960 960">
    <path
      fill={fill}
      d="m383-350 267-170-267-170v340Zm-53 230v-80H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H630v80H330ZM140-260h680v-520H140v520Zm0 0v-520 520Z"
    />
  </svg>
);

export default TV;
