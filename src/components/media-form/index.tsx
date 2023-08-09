import { ChangeEvent, FC, useMemo } from 'react';
import { CloseButton, FormTitle, MediaFormWrapper, SelectWrapper } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../stores';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { MediaContentGenre, MediaContentType } from '../../types';
import { formInputConf, mediaGenres, mediaTypes } from '../../constants/form-input-config';
import { Box } from '@rebass/grid';
import InputField from '../common/input-field';
import { rem } from 'polished';
import formSchema from './schema';
import { mediaGenreContent, mediaTypeContent } from '../../constants/content';
import SelectInput from '../common/select-input';
import Button from '../common/button';
import { Cross2Icon } from '@radix-ui/react-icons';

interface FormInputs {
  title: string;
  type: MediaContentType;
  genre: MediaContentGenre;
  releaseYear: number;
  rating: number;
}

interface Props {
  onClose: () => void;
}

type FormInputsKey = keyof FormInputs;

const MediaForm: FC<Props> = ({ onClose }) => {
  const { mediaData, mediaView } = useStore();

  const initialData = useMemo(() => {
    if (!mediaView.editId) return null;
    return mediaData.findOne(mediaView.editId);
  }, [mediaView.editId]);

  const {
    formState: { isDirty },
    control,
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm<FormInputs>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: initialData?.title || '',
      type: initialData?.type || 'movie',
      genre: initialData?.genre || 'action',
      releaseYear: initialData?.releaseYear,
      rating: initialData?.rating || 0,
    },
    shouldFocusError: true,
  });

  const handleValue = (key: FormInputsKey, value: string | number) => {
    console.log('change value', key, value);
    clearErrors(key);
    setValue(key, value, { shouldDirty: true });
  };

  const onSave = (data: FormInputs) => {
    console.log('saved', data);
    // console.log('clicked...');
    // e.preventDefault();

    // console.log('validating?');
    // handleSubmit(
    //   (data: FormInputs) => {
    //     console.log('saved', data);
    //     return;
    //   },
    //   (err) => {
    //     console.error(err);
    //     return;
    //   },
    // );
  };

  return (
    <MediaFormWrapper>
      <CloseButton onClick={onClose}>
        <Cross2Icon width={rem(20)} height={rem(20)} />
      </CloseButton>
      <form onSubmit={handleSubmit(onSave)}>
        <FormTitle>Edit Media Content</FormTitle>

        {formInputConf.map((input) => {
          if (input.type === 'selector') {
            return (
              <SelectWrapper
                mb={rem(24)}
                mr={input.name === 'type' ? rem(16) : 0}
                key={input.name + 'form-input'}
              >
                <Controller
                  name={input.name as FormInputsKey}
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      items={input.name === 'type' ? mediaTypes : mediaGenres}
                      content={input.name === 'type' ? mediaTypeContent : mediaGenreContent}
                      label={input.label}
                      placeholder={input.placeholder}
                      value={field.value as string}
                      onChange={(value: string) => {
                        handleValue(field.name, value);
                      }}
                    />
                  )}
                />
              </SelectWrapper>
            );
          } else {
            return (
              <Box mb={rem(24)} key={input.name + 'form-input'}>
                <Controller
                  name={input.name as FormInputsKey}
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputField
                      type={input.type}
                      label={input.label}
                      placeholder={input.placeholder}
                      id={input.name}
                      name={input.name}
                      ref={field.ref}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleValue(field.name, e.target.value);
                      }}
                      value={(field.value as string) || ''}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Box>
            );
          }
        })}
        <Box>
          <Button type="submit" disabled={!isDirty}>
            Save
          </Button>
        </Box>
      </form>
    </MediaFormWrapper>
  );
};

export default observer(MediaForm);
