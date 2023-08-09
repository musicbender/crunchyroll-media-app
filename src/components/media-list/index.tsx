import { observer } from 'mobx-react';
import { FC } from 'react';
import { useStore } from '../../stores';
import MediaContent from '../../models/media-content';
import MediaItem from '../media-item';
import { InnerWrapper, MediaListWrapper } from './styles';
import Modal from '../common/modal';
import MediaForm from '../media-form';
../common/select
const MediaList: FC = () => {
  const { mediaData, mediaView } = useStore();

  // mock
  const handleClick = () => {
    mediaData.add(
      new MediaContent({
        id: 1111111,
        title: 'Wut wut',
        type: 'movie',
        genre: 'action',
        releaseYear: 1982,
        rating: 1,
      }),
    );
  };

  const handleEdit = (isEditing = false, id?: number): void => {
    mediaView.isEditing = isEditing;
    mediaView.editId = id || null;
  };

  return (
    <MediaListWrapper>
      <button onClick={handleClick}>add</button>
      {!!mediaData.mediaContent?.length && (
        <InnerWrapper>
          {[...mediaData.mediaContent.slice()].map((item: MediaContent, index: number) => (
            <MediaItem item={item} index={index} handleEdit={handleEdit} key={item.id} />
          ))}
        </InnerWrapper>
      )}
      {mediaData.isLoading && <p>loading...</p>}
      <Modal isOpen={mediaView.isEditing} onClose={() => handleEdit(false)}>
        <MediaForm />
      </Modal>
    </MediaListWrapper>
  );
};

export default observer(MediaList);
