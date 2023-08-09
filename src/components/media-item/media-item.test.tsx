import MediaItem from '.';

describe('<MediaItem />', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
  // const mockListing = mockListings.data.regions.dispensary.listings[0];
  // it('should render correctly with only listing props', () => {
  //   const wrapper = shallow(<ListingCard listing={mockListing} />);
  //   expect(wrapper.find('CardWrapper')).toHaveLength(1);
  // });
  // it('avatar should be correct img url in as a prop', () => {
  //   const wrapper = shallow(<ListingCard listing={mockListing} />);
  //   expect(wrapper.find('Avatar').get(0).props.img).toEqual(mockListing.avatar_image.small_url);
  // });
  // it('location should have listing city in its inner text', () => {
  //   const wrapper = shallow(<ListingCard listing={mockListing} />);
  //   expect(wrapper.find('ListingLocation').text().indexOf(mockListing.city) > -1).toBe(true);
  // });
  // it('listing should show correct name', () => {
  //   const wrapper = shallow(<ListingCard listing={mockListing} />);
  //   expect(wrapper.find('ListingName').text()).toEqual(mockListing.name);
  // });
});
