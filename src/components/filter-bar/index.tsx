import { FC } from 'react';
import Button from '../common/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { rem } from 'polished';
import { AddItemText, BarWrapper, RightWrapper } from './styles';
import { useStore } from '../../stores';
import SelectInput from '../common/select-input';
import { filterTypes } from '../../constants/form-input-config';
import { mediaFilterContent } from '../../constants/content';
import { MediaContentType } from '../../types';
import { Box } from '@rebass/grid';

interface Props {
  handleAdd: () => void;
}

const FilterBar: FC<Props> = ({ handleAdd }) => {
  const { mediaData } = useStore();
  const filters: string[] | MediaContentType = ['all', ...filterTypes];

  const handleFilter = (value: string) => {
    mediaData.filters = value === 'all' ? [] : [value as MediaContentType];
  };

  return (
    <BarWrapper>
      <Box width={rem(48)}>
        <Button handleClick={handleAdd} disabled={mediaData.isLoading}>
          <PlusIcon width={rem(18)} height={rem(18)} /> <AddItemText>Add Item</AddItemText>
        </Button>
      </Box>
      <RightWrapper>
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
