import { ChangeEvent, FC } from 'react';
import Button from '../common/button';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { rem } from 'polished';
import { AddItemText, BarWrapper, RightWrapper } from './styles';
import { useStore } from '../../stores';
import SelectInput from '../common/select-input';
import { filterTypes } from '../../constants/form-input-config';
import { mediaFilterContent } from '../../constants/content';
import { MediaContentType } from '../../types';
import { Box } from '@rebass/grid';
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

  const debouncedSearch = useDebounce(handleSearch, 100);

  return (
    <BarWrapper>
      <Box width={rem(48)}>
        <Button handleClick={handleAdd} disabled={mediaData.isLoading}>
          <PlusIcon width={rem(18)} height={rem(18)} /> <AddItemText>Add Item</AddItemText>
        </Button>
      </Box>
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
