import { render, screen } from '@testing-library/react';

import { InputField } from '.';

const setup = (propsOverride = {}) => {
  const props = {
    id: 'test-input',
    onChange: jest.fn(),
    ...propsOverride,
  };

  render(<InputField {...props} />);
};

describe('InputField', () => {
  it('renders the input field', () => {
    setup();
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
  });

  it('renders label if geiven', () => {
    setup({ label: 'Favorite pokemon' });
    expect(screen.getByText('Favorite pokemon')).toBeInTheDocument();
  });
});
