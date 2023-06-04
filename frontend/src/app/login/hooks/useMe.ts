import { useQuery } from "@tanstack/react-query";
import client from '../../../lib/axios';

export const useMe = () => {
  return useQuery(
    ['me'],
    () => client.get('/auth/me'),
    {
      select: (data) => data.data
    }
  )
}