import { css } from '@emotion/react';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Props as ModalProps } from 'react-modal';
import { useRecogState } from '../RecogModalContext';
import RecogFormInput from './RecogFormInput';
import { RecognitionValue } from '@/src/types/recognition';
import Button from '@/src/components/Button';
import { useRecognitionMutation } from '../../../hooks/useRecognitionMutation';
import { useMe } from '../../../../login/hooks/useMe';

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
  onCloseModal: () => void;
}

export type RecogFormInputProps = Record<RecognitionValue, string>;
const RecogForm = ({ onCloseModal }: Props) => {
  const { data: me } = useMe();
  const { mutate: submitRecognition } = useRecognitionMutation();
  const { user, recogValues } = useRecogState();
  const formMethods = useForm<RecogFormInputProps>();
  const { handleSubmit } = formMethods;

  const handleSubmitForm = (v: RecogFormInputProps) => {
    if (!!me && !!user) {
      submitRecognition({
        senderId: me?.id,
        receiverId: user?.id,
        recognitionList: v
      }, {
        onSuccess: onCloseModal
      })
    }
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