import { MediaContentGenre, MediaContentType } from '../types';

export const formInputConf = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Cool Title',
  },
  {
    name: 'type',
    type: 'selector',
    label: 'Type',
    placeholder: 'Select type',
  },
  {
    name: 'genre',
    type: 'selector',
    label: 'Genre',
    placeholder: 'Select genre',
  },
  {
    name: 'releaseYear',
    type: 'number',
    label: 'Release Year',
    placeholder: 'Release Year',
  },
  {
    name: 'rating',
    type: 'number',
    label: 'Rating',
    placeholder: '0 - 10',
  },
];

export const mediaTypes: MediaContentType[] = ['movie', 'tv-show', 'game', 'comic', 'book'];

export const mediaTypesLimited: MediaContentType[] = ['movie', 'tv-show', 'game'];

export const mediaGenres: MediaContentGenre[] = [
  'action',
  'comedy',
  'rpg',
  'drama',
  'fantasy',
  'western',
];

export const filterTypes: MediaContentType[] = ['movie', 'tv-show', 'game'];
