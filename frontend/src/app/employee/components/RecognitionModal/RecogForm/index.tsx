import { css } from '@emotion/react';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Props as ModalProps } from 'react-modal';
import { useRecogState } from '../RecogModalContext';
import { RecognitionValue } from '@/src/components/Chip';
import RecogFormInput from './RecogFormInput';
import Button from '@/src/components/Button';

const recogFormCss = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  }),
  button: css({
    display: 'block',
    width: '50%',
    margin: '0 auto'
  })
}

interface Props {
  onCloseModal: ModalProps['onRequestClose'];
}

type RecogFormInputProps = Record<RecognitionValue, string>;
const RecogForm = ({ onCloseModal }: Props) => {
  const { user, recogValues } = useRecogState();
  const formMethods = useForm<RecogFormInputProps>();
  const { handleSubmit, formState: { isValid } } = formMethods;

  const handleSubmitForm = (v: RecogFormInputProps) => {
    console.log('v', v);
  }

  return (
    <div css={recogFormCss.wrapper}>
      <h2>Recognition Form</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {recogValues.map(v => (
            <RecogFormInput key={v} recogValue={v} />
          ))}
          <Button label="Submit" type="submit" css={recogFormCss.button} />
        </form>
      </FormProvider>
    </div>
  )
}

export default RecogForm