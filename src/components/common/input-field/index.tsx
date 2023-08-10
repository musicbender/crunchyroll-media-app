import { ChangeEvent, forwardRef } from 'react';
import { ErrorText, IconWrapper, InnerWrapper, Input, InputLabel, InputWrapper } from './styles';

export type Props = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  type?: string;
  value?: unknown;
  id?: string;
  error?: string | null;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', value, id, error, label, icon, className, onChange, ...rest }, ref) => {
    return (
      <InputWrapper hasIcon={!!icon} aria-live="polite" className={className}>
        {label && (
          <InputLabel htmlFor={id} hasError={!!error}>
            {label}
          </InputLabel>
        )}
        <InnerWrapper>
          {!!icon && <IconWrapper>{icon}</IconWrapper>}
          <Input
            data-testid="input-field"
            type={type}
            id={id}
            aria-invalid={!!error}
            ref={ref}
            onChange={(e) => onChange?.(e)}
            hasError={!!error}
            {...(value !== undefined && { value })}
            {...rest}
          />
        </InnerWrapper>
        {!!error && (
          <ErrorText data-testid="input-field-error" role="alert">
            {error}
          </ErrorText>
        )}
      </InputWrapper>
    );
  },
);

export default InputField;
