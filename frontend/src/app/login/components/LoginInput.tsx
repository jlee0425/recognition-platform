import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

const loginInputCss = {
  label: css({
    alignSelf: 'flex-start',
    marginBottom: '8px',
  }),
  input: css({
    padding: '8px',
    borderRadius: '8px',
    borderWidth: '1px',
    '&[aria-invalid=true]': {
      borderColor: '#ff0909'
    }
  })
}

interface Props {
  label: string;
  isPassword?: boolean;
}

const LoginInput = ({ label, isPassword }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <label css={loginInputCss.label}>{label.toUpperCase()}</label>
      <input 
        title={label} 
        placeholder={label} 
        css={loginInputCss.input} 
        type={isPassword ? 'password' : 'text'}
        aria-invalid={errors?.[label]?.type === 'required'}
        {...register(label, {
          required: true
        })} 
      />
    </>
  )
}

export default LoginInput