import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from '@/src/lib/axios';
import { RecogFormInputProps } from "../components/RecognitionModal/RecogForm";
import { RECOGNITION_LIST_KEY } from "./useRecognitionList";

type RecognitionMutationParams = {
  senderId: number;
  receiverId: number;
  recognitionList: RecogFormInputProps;
}

export const useRecognitionMutation = () => {
  const qc = useQueryClient();
  return useMutation(
    [RECOGNITION_LIST_KEY], 
    (data: RecognitionMutationParams) => client.post('/recognitions', data),
    {
      onSuccess: () => qc.invalidateQueries([RECOGNITION_LIST_KEY])
    }
  )
}