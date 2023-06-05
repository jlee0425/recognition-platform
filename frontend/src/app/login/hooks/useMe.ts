import { useQuery } from "@tanstack/react-query";
import client from '@/src/lib/axios';
import { MeInfo } from "@/src/types/user";

export const useMe = () => {
  return useQuery(
    ['me'],
    () => client.get('/auth/me'),
    {
      select: (data) => data.data as MeInfo,
      refetchOnWindowFocus: false,
    }
  )
}