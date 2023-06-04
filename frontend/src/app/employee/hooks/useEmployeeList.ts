import { useQuery } from "@tanstack/react-query";
import client from '../../../lib/axios';
import { User } from "@/src/types/user";

export const useEmployeeList = () => {
  return useQuery(
    ['employee_list'], 
    () => client.get('/user'),
    {
      select: (data) => data.data as User[]
    }
  )
}