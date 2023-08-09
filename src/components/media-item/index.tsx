import { FC } from 'react';
import MediaContent from '../../models/media-content';

import {
  CardWrapper,
  InnerWrapper,
  ContentWrapper,
  Title,
  IconCircle,
  SubTitle,
  IconButton,
  ActionIconsWrapper,
} from './styles';
import { Box } from '@rebass/grid';
import Chip from '../common/chip';
import Movie from '../icons/movie';
import TV from '../icons/tv';
import GameController from '../icons/game-controller';
import Book from '../icons/book';
import Comic from '../icons/comic';
import Question from '../icons/question';
import { mediaTypeContent } from '../../constants/content';
import theme from '../../styles/theme';
import { rem } from 'polished';
import Delete from '../icons/delete';
import Edit from '../icons/edit';

interface Props {
  item: MediaContent;
  index: number;
  handleEdit: (isEditing: boolean, id?: number) => void;
}

const MediaItem: FC<Props> = ({ item, index, handleEdit }) => {
  const Icon = (() => {
    switch (item.type) {
      case 'movie':
        return Movie;
      case 'tv-show':
        return TV;
      case 'game':
        return GameController;
      case 'book':
        return Book;
      case 'comic':
        return Comic;
      default:
        return Question;
    }
  })();

  return (
    <CardWrapper index={index}>
      <InnerWrapper>
        <ContentWrapper>
          <SubTitle>{mediaTypeContent[item.type]}</SubTitle>
          <Title>{item.title}</Title>
        </ContentWrapper>
        <IconCircle>
          <Icon size={36} fill={theme.colors.white} />
        </IconCircle>
      </InnerWrapper>
      <Box mb={rem(32)}>
        <Chip>Genre: {item.genre}</Chip>
        <Chip>Rating: {item.rating}/10</Chip>
        <Chip>Released: {item.releaseYear}</Chip>
      </Box>
      <ActionIconsWrapper>
        <IconButton onClick={() => handleEdit(true, item.id)}>
          <Edit />
        </IconButton>
        <IconButton>
          <Delete />
        </IconButton>
      </ActionIconsWrapper>
    </CardWrapper>
  );
};

export default MediaItem;
