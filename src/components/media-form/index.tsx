import { FC, useMemo } from 'react';
import { MediaFormWrapper } from './styles';
import { useStore } from '../../stores';
import { observer } from 'mobx-react';

const MediaForm: FC = () => {
  const { mediaData, mediaView } = useStore();

  const initialData = useMemo(() => {
    if (!mediaView.editId) return null;
    return mediaData.findOne(mediaView.editId);
  }, [mediaView.editId]);

  return <MediaFormWrapper>MediaForm: {initialData?.title}</MediaFormWrapper>;
};

export default observer(MediaForm);
