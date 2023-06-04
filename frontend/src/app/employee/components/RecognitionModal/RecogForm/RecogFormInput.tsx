import { CHIP_COLORS } from '@/src/components/RecognitionChip';
import { RecognitionValue } from '@/src/types/recognition';
import { css } from '@emotion/react';
import { useController, useFormContext } from 'react-hook-form';

const formCss = {
  wrapper: css({
    maxWidth: '70%',
    margin: '0 auto',
    marginBottom: '20px',
  }),
  textarea: css({
    width: '100%',
    minHeight: '80px',
    marginTop: '8px',
  }),
  error: css({
    fontSize: '12px',
    display: 'block',
    color: '#fc3131',
  })
}
interface Props {
  recogValue: RecognitionValue;
}

const RecogFormInput = ({ recogValue }: Props) => {
  const { control } = useFormContext();
  const { field, fieldState: { error } } = useController({ 
    control, name: recogValue, rules: {
      required: true 
    } 
  });

  return (
    <div css={formCss.wrapper}>
      <label>
        Describe how the nominee demonstrates excellence as 
        {' '}
        <strong style={{color: CHIP_COLORS[recogValue]}}>{recogValue}</strong>.
      </label>
      <textarea {...field} css={formCss.textarea} />
      {!!error && <span css={formCss.error}>Please fill this field.</span>}
    </div>
  )
}

export default RecogFormInput