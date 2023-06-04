import { useQuery } from "@tanstack/react-query";
import client from '@/src/lib/axios';
import { User } from "@/src/types/user";

export const EMPLOYEE_LIST_KEY = 'employee_list';
export const useEmployeeList = () => {
  return useQuery(
    [EMPLOYEE_LIST_KEY], 
    () => client.get('/user'),
    {
      select: (data) => data.data as User[]
    }
  )
}