import { ReactNode } from 'react';
import { BtnWrapper } from './styles';

type Props = {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  children: ReactNode;
  handleClick?: (event: React.MouseEvent) => any;
};

const Button = ({
  type = 'button',
  disabled = false,
  handleClick = () => null,
  children,
}: Props) => {
  return (
    <BtnWrapper type={type} disabled={disabled} onClick={handleClick}>
      {children}
    </BtnWrapper>
  );
};

export default Button;
