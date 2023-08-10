import { ChangeEvent, FC } from 'react';
import Button from '../common/button';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { rem } from 'polished';
import { AddItemText, BarWrapper, ButtonWrapper, RightWrapper } from './styles';
import { useStore } from '../../stores';
import SelectInput from '../common/select-input';
import { filterTypes } from '../../constants/form-input-config';
import { mediaFilterContent } from '../../constants/content';
import { MediaContentType } from '../../types';
import InputField from '../common/input-field';
import useDebounce from '../../hooks/use-debounce';

interface Props {
  handleAdd: () => void;
}

const FilterBar: FC<Props> = ({ handleAdd }) => {
  const { mediaData } = useStore();
  const filters: string[] | MediaContentType = ['all', ...filterTypes];

  const handleFilter = (value: string) => {
    mediaData.filters = value === 'all' ? [] : [value as MediaContentType];
  };

  const handleSearch = (value: string) => {
    mediaData.searchQuery = value || null;
  };

  /** Updating the global mobx state is a relatively heavy oporation. Let's
   * debounce the search input for better performance.
   */
  const debouncedSearch = useDebounce(handleSearch, 100);

  return (
    <BarWrapper>
      <ButtonWrapper>
        <Button handleClick={handleAdd} disabled={mediaData.isLoading}>
          <PlusIcon width={rem(18)} height={rem(18)} /> <AddItemText>Add Item</AddItemText>
        </Button>
      </ButtonWrapper>
      <RightWrapper>
        <InputField
          value={mediaData.searchQuery || ''}
          id="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value)}
          disabled={mediaData.isLoading}
          icon={<MagnifyingGlassIcon width={rem(20)} height={rem(20)} />}
        />
        <SelectInput
          items={filters}
          content={mediaFilterContent}
          placeholder="Fitler"
          onChange={handleFilter}
          defaultValue="all"
        />
      </RightWrapper>
    </BarWrapper>
  );
};

export default FilterBar;
