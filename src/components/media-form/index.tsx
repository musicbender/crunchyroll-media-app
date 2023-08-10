import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
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
import MediaContent from '../../models/media-content';
import generateUniqueId from 'generate-unique-id';
import { ErrorText } from '../common/input-field/styles';
import { reaction } from 'mobx';

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

/** Main form for adding and editing media content items */
const MediaForm: FC<Props> = ({ onClose }) => {
  const { mediaData, mediaView } = useStore();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  /** checking what media id is being editing and finding the item out of the data */
  const initialData = useMemo(() => {
    if (!mediaView.editId) return null;
    return mediaData.findOne(mediaView.editId);
  }, [mediaView.editId]);

  const isNew = !initialData;

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

  /** Once saved, let's check the mobx saving state. Once it is finished saving
   * we close the form or show any http request errors */
  useEffect(() => {
    return reaction(
      () => mediaData.isSaving,
      () => {
        if (!mediaData.isSaving && hasSaved) {
          if (!mediaData.error) {
            onClose();
          } else {
            setGlobalError(mediaData.error);
          }
        }
      },
      {
        fireImmediately: false,
      },
    );
  }, [hasSaved]);

  const handleValue = (key: FormInputsKey, value: string | number) => {
    setHasSaved(false);
    clearErrors(key);
    setValue(key, value, { shouldDirty: true });
  };

  // Save the form data with the proper add/edit service
  const onSave = (data: FormInputs) => {
    setHasSaved(false);

    // if this is a new item, generate an id for it
    const id = isNew
      ? +generateUniqueId({
          length: 7,
          useLetters: false,
          useNumbers: true,
        })
      : initialData.id;

    const newItem = new MediaContent({
      id,
      title: data.title,
      type: data.type,
      genre: data.genre,
      releaseYear: data.releaseYear,
      rating: data.rating,
    });

    if (isNew) {
      mediaData.add(newItem);
    } else {
      mediaData.update(newItem);
    }

    setHasSaved(true);
  };

  return (
    <MediaFormWrapper>
      <CloseButton onClick={onClose}>
        <Cross2Icon width={rem(20)} height={rem(20)} />
      </CloseButton>
      {!!globalError && <ErrorText>{globalError}</ErrorText>}
      <form onSubmit={handleSubmit(onSave)}>
        <FormTitle>{isNew ? 'Add' : 'Edit'} Media Content</FormTitle>

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
        <Box my={rem(32)}>
          <Button type="submit" disabled={!isDirty} isLoading={mediaData.isSaving}>
            Save
          </Button>
        </Box>
      </form>
    </MediaFormWrapper>
  );
};

export default observer(MediaForm);
