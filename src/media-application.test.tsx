import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaApplication from './media-application';

test('renders learn react link', () => {
  render(<MediaApplication />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
