import { FC, ReactNode } from 'react';
import { ChipWrapper } from './styles';

interface Props {
  children?: ReactNode;
}

const Chip: FC<Props> = ({ children }) => <ChipWrapper>{children}</ChipWrapper>;

export default Chip;
