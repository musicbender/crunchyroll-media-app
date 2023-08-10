import { observer } from 'mobx-react';
import { FC, useMemo } from 'react';
import { useStore } from '../../stores';
import MediaContent from '../../models/media-content';
import MediaItem from '../media-item';
import { CenterWrapper, InnerWrapper, MediaListWrapper, NoItemsText, ResetButton } from './styles';
import Modal from '../common/modal';
import MediaForm from '../media-form';
import Spinner from '../icons/spinner';
import { Box } from '@rebass/grid';
import { ResetIcon } from '@radix-ui/react-icons';
import { rem } from 'polished';
import theme from '../../styles/theme';
import FilterBar from '../filter-bar';
import { mediaFilterContent } from '../../constants/content';

const MediaList: FC = () => {
  const { mediaData, mediaView } = useStore();
  const hasMediaItems = !!mediaData.mediaContent.length;

  const showingDescription = useMemo(() => {
    const prefix = 'Currently showing ';
    const filters = mediaData.filters.length
      ? mediaFilterContent[mediaData.filters[0]]
      : 'Movies, TV Shows, and Games';
    return prefix + filters;
  }, [mediaData.filters]);

  const handleEdit = (isEditing = false, id?: number): void => {
    mediaView.isEditing = isEditing;
    mediaView.editId = id || null;
  };

  const handleAdd = () => {
    mediaView.isEditing = true;
    mediaView.editId = null;
  };

  const handleReset = () => {
    mediaData.reset();
  };

  return (
    <MediaListWrapper>
      <Box mb={rem(32)}>
        <h2>{mediaData.mediaContent.length} Media Items</h2>
      </Box>
      <FilterBar handleAdd={handleAdd} />
      {hasMediaItems && !mediaData.isLoading && (
        <>
          <Box mb={rem(16)}>
            <p>{showingDescription}</p>
          </Box>
          <InnerWrapper>
            {[...mediaData.mediaContent.slice()].map((item: MediaContent, index: number) => (
              <MediaItem item={item} index={index} handleEdit={handleEdit} key={item.id} />
            ))}
          </InnerWrapper>
        </>
      )}
      {mediaData.isLoading && (
        <CenterWrapper>
          <Spinner fill={theme.colors.orangeBase} />
        </CenterWrapper>
      )}
      {!hasMediaItems && !mediaData.isLoading && (
        <CenterWrapper>
          <NoItemsText>No items to show. </NoItemsText>
        </CenterWrapper>
      )}
      <ResetButton onClick={handleReset}>
        <ResetIcon fill={theme.colors.lightGrey} width={rem(24)} height={rem(24)} />
      </ResetButton>
      <Modal isOpen={mediaView.isEditing} onClose={() => handleEdit(false)}>
        <MediaForm onClose={() => handleEdit(false)} />
      </Modal>
    </MediaListWrapper>
  );
};

export default observer(MediaList);
