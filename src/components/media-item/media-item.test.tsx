import { render, screen } from '@testing-library/react';
import MediaItem from '.';
import MediaContent from '../../models/media-content';
import userEvent from '@testing-library/user-event';

const handleEdit = jest.fn();

const setup = () => {
  const props = {
    item: new MediaContent({
      id: 123,
      title: 'Test Media',
      type: 'movie',
      genre: 'action',
      releaseYear: 1982,
      rating: 7,
    }),
    index: 0,
    handleEdit,
  };

  render(<MediaItem {...props} />);
};

describe('MediaItem', () => {
  it('renders the media item', () => {
    setup();
    expect(screen.getByTestId('media-item')).toBeInTheDocument();
  });

  it('renders correct content', () => {
    setup();
    expect(screen.getByText('Test Media')).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
    expect(screen.getByText('Genre: Action')).toBeInTheDocument();
    expect(screen.getByText('Rating: 7/10')).toBeInTheDocument();
  });

  it('fires edit handler when clicking edit icon', async () => {
    setup();
    const editIcon = screen.getByTestId('edit');
    await userEvent.click(editIcon);
    expect(handleEdit).toHaveBeenCalledWith(true, 123);
  });
});
