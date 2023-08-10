import { render, screen } from '@testing-library/react';
import MediaApplication from './media-application';

test('MediaApplication', () => {
  render(<MediaApplication />);
  const linkElement = screen.getByText('Media Content');
  expect(linkElement).toBeInTheDocument();
});
