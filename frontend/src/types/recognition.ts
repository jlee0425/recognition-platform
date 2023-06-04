import { User } from "./user";
import { RECOGNITION_VALUES } from '../components/RecognitionChip';

export type RecognitionValue = typeof RECOGNITION_VALUES[number];

export type RecognitionItem = {
  id: number;
  value: string;
  detail: string;
};
export interface Recognition {
  id: number;
  receiver: User;
  values: RecognitionItem[];
}