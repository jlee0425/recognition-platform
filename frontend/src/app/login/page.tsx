'use client';

import Button from '@/src/components/Button';
import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import LoginInput from './components/LoginInput';
import useLoginMutation from './hooks/useLoginMutation';

const loginCss = {
  wrapper: css({
    display: 'grid',
    placeItems: 'center',
    height: '600px'
  }),
  
  form: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    width: 'fit-content',
    border: '1px solid #bdbdbd',
    borderRadius: '8px',

    '> input': {
      marginBottom: '30px'
    }
  }),
  error: css({
    fontSize: '10px',
    color: '#ff0909',
    marginTop: '4px'
  })
}

export type LoginFormProps = {
  username: string;
  password: string;
}

const LoginPage = () => {
  const formMethods = useForm<LoginFormProps>();
  const { handleSubmit, setError, formState: { errors } } = formMethods;
  const { mutate: login, isLoading } = useLoginMutation();

  const handleLogin = (v: LoginFormProps) => {
    login(v, {
      onError: (e: any) => {
        if ([401, 404].includes(e?.response?.status)) {
          setError('username', {
            type: 'notFound'
          });
        }
      },
    })
  }

  return (
    <div css={loginCss.wrapper}>
      <FormProvider {...formMethods}>
        <form css={loginCss.form} onSubmit={handleSubmit(handleLogin)}>
          <LoginInput label="username" />
          <LoginInput label="password" isPassword />
          <Button label="LOGIN" type="submit" aria-disabled={isLoading}/>
          {errors?.username?.type === 'notFound' && (
            <p css={loginCss.error}>Incorrect username and/or password.</p>
          )}
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginPage;