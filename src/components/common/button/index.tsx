import { ReactNode } from 'react';
import { BtnWrapper, InnerWrapper, StyledSpinner } from './styles';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  handleClick?: (event: React.MouseEvent) => any;
}

const Button = ({
  type = 'button',
  disabled = false,
  isLoading = false,
  handleClick = () => null,
  children,
}: Props) => {
  return (
    <BtnWrapper type={type} disabled={disabled} isLoading={isLoading} onClick={handleClick}>
      <InnerWrapper isLoading={isLoading}>
        {isLoading && <StyledSpinner />}
        {children}
      </InnerWrapper>
    </BtnWrapper>
  );
};

export default Button;
