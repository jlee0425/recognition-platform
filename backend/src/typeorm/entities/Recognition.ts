import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecognitionValue } from './RecognitionValue';
import { User } from './User';

@Entity()
export class Recognition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @OneToMany(() => RecognitionValue, (recogValue) => recogValue.recognition)
  values: RecognitionValue[];
}
