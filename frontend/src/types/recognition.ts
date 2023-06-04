import { User } from "./user";
import { RECOGNITION_VALUES } from '../components/RecognitionChip';

export type RecognitionValue = typeof RECOGNITION_VALUES[number];

export type RecognitionItem = {
  id: number;
  value: string;
  detail: string;
};
export interface Recognition extends User {
  id: number;
  receiver: User['profile'];
  values: RecognitionItem[];
}