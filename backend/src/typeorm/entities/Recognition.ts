import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { RecognitionValue } from './RecognitionValue';

@Entity()
export class Recognition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  senderId: number;

  @ManyToOne(() => User)
  receiver: User;

  @OneToMany(() => RecognitionValue, (recogValue) => recogValue.recognition)
  values: RecognitionValue[];
}
