import { useQuery } from "@tanstack/react-query";
import client from '@/src/lib/axios';
import { SectionType } from "../page";

export const RECOGNITION_LIST_KEY = 'recognition_list';
export const useRecognitionList = (section: SectionType) => {
  return useQuery(
    [RECOGNITION_LIST_KEY, section], 
    () => client.get(`/recognitions/${section !== 'sent' ? section : ''}`),
    {
      select: (data) => data.data,
      refetchOnWindowFocus: false,
    }
  )
}