/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import theme from '../../styles/theme';

interface Props {
  fill?: string;
  size?: number;
}

export const Spinner = forwardRef<HTMLDivElement, Props>(
  ({ fill = theme.colors.black, size = 48, ...rest }: Props, ref) => (
    <div style={{ width: `${size}px`, height: `${size}px` }} {...rest} ref={ref}>
      <svg width="100%" height="100%" viewBox="0 0 50 50">
        <path
          fill={fill}
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  ),
);

export default Spinner;
