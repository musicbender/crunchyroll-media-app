import { ChangeEvent, FC, useMemo } from 'react';
import { MediaFormWrapper } from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../stores';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { MediaContentGenre, MediaContentType } from '../../types';
import { formInputConf } from '../../constants/form-input-config';
import { Box } from '@rebass/grid';
import InputField from '../common/input-field';
import { rem } from 'polished';
import formSchema from './schema';

interface FormInputs {
  title: string;
  type: MediaContentType;
  genre: MediaContentGenre;
  releaseYear: number;
  rating: number;
}

type FormInputsKey = keyof FormInputs;

const MediaForm: FC = () => {
  const { mediaData, mediaView } = useStore();

  const initialData = useMemo(() => {
    if (!mediaView.editId) return null;
    return mediaData.findOne(mediaView.editId);
  }, [mediaView.editId]);

  const { control, setValue, clearErrors, handleSubmit } = useForm<FormInputs>({
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
    clearErrors(key);
    setValue(key, value, { shouldDirty: true });
  };

  const handleSave = () => {
    handleSubmit((data: FormInputs) => {
      console.log('saved', data);
    });
  };

  return (
    <MediaFormWrapper>
      <form onSubmit={handleSave}>
        {formInputConf.map((input) => {
          if (input.type === 'selector') {
            return <div>selector</div>;
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
      </form>
    </MediaFormWrapper>
  );
};

export default observer(MediaForm);
