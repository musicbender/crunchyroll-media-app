import { observer } from 'mobx-react';
import { FC } from 'react';
import { useStore } from '../../stores';
import MediaContent from '../../models/media-content';

const MediaList: FC = () => {
  const { mediaStore } = useStore();

  const handleClick = () => {
    mediaStore.add(
      new MediaContent({
        id: 11,
        title: 'Wut wut',
        type: 'movie',
        genre: 'confused',
        releaseYear: 1982,
        rating: 1,
      }),
    );
  };

  console.log('meh', mediaStore.mediaContent.length);

  return (
    <div>
      <button onClick={handleClick}>add</button>
      {!!mediaStore.mediaContent?.length && (
        <ul>
          {[...mediaStore.mediaContent.slice()].map((item: MediaContent) => (
            <li>{item.title}</li>
          ))}
        </ul>
      )}
      {mediaStore.isLoading && <p>loading...</p>}
    </div>
  );
};

export default observer(MediaList);
