import { observer } from 'mobx-react';
import { FC } from 'react';
import { useStore } from '../../stores';
import MediaContent from '../../models/media-content';
import MediaItem from '../media-item';
import { AddItemText, CenterWrapper, InnerWrapper, MediaListWrapper, NoItemsText } from './styles';
import Modal from '../common/modal';
import MediaForm from '../media-form';
import Spinner from '../icons/spinner';
import Button from '../common/button';
import { Box } from '@rebass/grid';
import { PlusIcon } from '@radix-ui/react-icons';
import { rem } from 'polished';
import theme from '../../styles/theme';
const MediaList: FC = () => {
  const { mediaData, mediaView } = useStore();

  const handleEdit = (isEditing = false, id?: number): void => {
    mediaView.isEditing = isEditing;
    mediaView.editId = id || null;
  };

  const handleAdd = () => {
    mediaView.isEditing = true;
    mediaView.editId = null;
  };

  return (
    <MediaListWrapper>
      <Box mb={rem(32)}>
        <Button handleClick={handleAdd}>
          <PlusIcon width={rem(20)} height={rem(20)} /> <AddItemText>Add Item</AddItemText>
        </Button>
      </Box>
      {!!mediaData.mediaContent?.length && (
        <InnerWrapper>
          {[...mediaData.mediaContent.slice()].map((item: MediaContent, index: number) => (
            <MediaItem item={item} index={index} handleEdit={handleEdit} key={item.id} />
          ))}
        </InnerWrapper>
      )}
      {mediaData.isLoading && (
        <CenterWrapper>
          <Spinner fill={theme.colors.orangeBase} />
        </CenterWrapper>
      )}
      {!mediaData.mediaContent?.length && !mediaData.isLoading && (
        <CenterWrapper>
          <NoItemsText>No items to show. </NoItemsText>
        </CenterWrapper>
      )}
      <Modal isOpen={mediaView.isEditing} onClose={() => handleEdit(false)}>
        <MediaForm onClose={() => handleEdit(false)} />
      </Modal>
    </MediaListWrapper>
  );
};

export default observer(MediaList);
