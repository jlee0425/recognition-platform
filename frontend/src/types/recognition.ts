import { User } from "./user";

export interface Recognition extends User {
  id: number;
  from: User;
  tagList: string[];
  title: string;
  description: string;
}

export type ReconitionValue = 'LEADER'
| 'PERFORMER'
| 'TEAM_PLAYER'
| 'EASY_GOING'
| 'LISTENER'
| 'LEARNER'
| 'POSITIVE'
| 'CONSTRUCTIVE';