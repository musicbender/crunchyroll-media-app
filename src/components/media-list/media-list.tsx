import { observer } from 'mobx-react';
import { FC } from 'react';
import { useStore } from '../../stores';

const MediaList: FC = () => {
  const { mediaStore } = useStore();

  console.log('debug', mediaStore.mediaContent, mediaStore.isLoading);

  return <div>debug: {JSON.stringify(mediaStore.mediaContent)}</div>;
};

export default observer(MediaList);
