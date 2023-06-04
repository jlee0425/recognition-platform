import { User } from "./user";
import { RECOGNITION_VALUES } from '../components/RecognitionChip';

export type RecognitionValue = typeof RECOGNITION_VALUES[number];

export type RecognitionItem = Record<RecognitionValue, string>;
export interface Recognition extends User {
  id: number;
  from: User;
  tagList: RecognitionItem[];
}