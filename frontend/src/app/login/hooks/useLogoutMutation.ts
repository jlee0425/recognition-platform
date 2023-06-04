import { usePathname, useRouter } from 'next/navigation';
import client from '@/src/lib/axios';
import cookies from "@/src/lib/cookie";
import { useMemo } from 'react';
import queryClient from '@/src/lib/queryClient';

export const useLogoutMutation = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useMemo(() => {
    return typeof window !== 'undefined' && !!cookies.get('access_token');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      client.post('/auth/logout');
      cookies.remove('access_token');
      queryClient.clear();
      replace('/login');
    }
  };

  return { 
    handleLogout,
    isAuthenticated
  };
}