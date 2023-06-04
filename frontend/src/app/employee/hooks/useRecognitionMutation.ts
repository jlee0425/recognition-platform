import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from '../../../lib/axios';
import { RecognitionValue } from "@/src/types/recognition";
import { RecogFormInputProps } from "../components/RecognitionModal/RecogForm";

type RecognitionMutationParams = {
  senderId: number;
  receiverId: number;
  recognitionList: RecogFormInputProps;
}

export const useRecognitionMutation = () => {
  const qc = useQueryClient();
  return useMutation(
    ['recognition_list'], 
    (data: RecognitionMutationParams) => client.post('/recognitions', data),
    {
      onSuccess: () => qc.invalidateQueries(['recognition_list'])
    }
  )
}