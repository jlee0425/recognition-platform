import { css } from '@emotion/react';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Props as ModalProps } from 'react-modal';
import { useRecogState } from '../RecogModalContext';
import RecogFormInput from './RecogFormInput';
import { RecognitionValue } from '@/src/types/recognition';
import Button from '@/src/components/Button';
import { useRecognitionMutation } from '../../../hooks/useRecognitionMutation';
import { useMe } from '@/src/app/login/hooks/useMe';

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
    margin: '0 auto',
    '&[aria-disabled="true"]': {
      pointerEvents: 'none',
      opacity: 0.4
    }
  })
}

interface Props {
  onClickNext: () => void;
}

export type RecogFormInputProps = Record<RecognitionValue, string>;
const RecogForm = ({ onClickNext }: Props) => {
  const { data: me } = useMe();
  const { mutate: submitRecognition, isLoading } = useRecognitionMutation();
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
        onSuccess: onClickNext
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
          <Button label="Submit" type="submit" css={recogFormCss.button} aria-disabled={isLoading} />
        </form>
      </FormProvider>
    </div>
  )
}

export default RecogForm