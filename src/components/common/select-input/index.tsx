import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { FC, forwardRef, ReactNode } from 'react';
import {
  SelectContent,
  SelectIcon,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectViewport,
  StyledItem,
  StyledItemIndicator,
} from './styles';

type ItemProps = Omit<JSX.IntrinsicElements['input'], 'ref'> &
  Select.SelectItemProps & {
    children: ReactNode;
  };

interface Props {
  items: string[];
  content: { [key: string]: string };
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ children, ...rest }, forwardedRef) => {
  return (
    <StyledItem {...rest} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const SelectInput: FC<Props> = ({ items, content, label, placeholder, value, onChange }) => (
  <Select.Root value={value} onValueChange={onChange}>
    {label && <label>{label}</label>}
    <SelectTrigger>
      <Select.Value placeholder={placeholder || 'Make a selection'} />
      <SelectIcon>
        <ChevronDownIcon />
      </SelectIcon>
    </SelectTrigger>
    <SelectContent position={'popper'}>
      <SelectScrollUpButton>
        <ChevronUpIcon />
      </SelectScrollUpButton>
      <SelectViewport>
        <Select.Group>
          {!!items?.length &&
            items.map((item: string) => (
              <SelectItem value={item} key={item + 'select'}>
                {content[item]}
              </SelectItem>
            ))}
        </Select.Group>
      </SelectViewport>
      <SelectScrollDownButton>
        <ChevronDownIcon />
      </SelectScrollDownButton>
    </SelectContent>
  </Select.Root>
);

export default SelectInput;
