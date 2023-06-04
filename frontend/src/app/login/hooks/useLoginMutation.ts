'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { LoginFormProps } from '../page';
import client from '../../../lib/axios';
import cookies from '@/src/lib/cookie';

const useLoginMutation = () => {
  const router = useRouter();
  return useMutation(
    (input: LoginFormProps) => client.post('http://localhost:4000/auth/login', input),
    {
      onSuccess: ({data}) => {
        cookies.set('access_token', data.token);
        router.replace('/employee');
      }
    }
  )
};

export default useLoginMutation;
