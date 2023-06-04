import { useQuery } from "@tanstack/react-query";
import client from '@/src/lib/axios';

export const RECOGNITION_LIST_KEY = 'recognition_list';
export const useRecognitionList = () => {
  return useQuery(
    [RECOGNITION_LIST_KEY], 
    () => client.get('/recognitions'),
    {
      select: (data) => data.data
    }
  )
}