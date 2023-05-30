import { User } from "./user";

export interface Recognition extends User {
  id: number;
  from: User;
  tagList: string[];
  title: string;
  description: string;
}