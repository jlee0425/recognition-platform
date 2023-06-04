import { useQuery } from "@tanstack/react-query";
import client from '../../../lib/axios';

export const useRecognitionList = () => {
  return useQuery(
    ['recognition_list'], 
    () => client.get('/recognitions'),
    {
      select: (data) => data.data
    }
  )
}