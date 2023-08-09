import * as Yup from 'yup';
import { MediaContentGenre, MediaContentType } from '../../types';

const formSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required.')
    .test('title', 'Title is too long.', (value?: string) => {
      return !!value && value.length < 30;
    }),
  type: Yup.mixed<MediaContentType>().required('Type is required.'),
  genre: Yup.mixed<MediaContentGenre>().required('Genre is required.'),
  releaseYear: Yup.number()
    .required('Release year is required.')
    .test('releaseYear', 'Not a valid year.', (value?: number) => {
      if (!!value && String(value).length !== 4) {
        return false;
      }

      if (!!value && value > new Date().getFullYear()) {
        return false;
      }

      return true;
    }),
  rating: Yup.number()
    .required('Rating year is required.')
    .test('rating', 'Not a valid rating.', (value?: number) => {
      return !!value && value >= 0 && value <= 10;
    }),
});

export default formSchema;
