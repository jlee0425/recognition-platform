import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recognition } from './Recognition';

@Entity({ name: 'recognition_value' })
export class RecognitionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  detail: string;

  @ManyToOne(() => Recognition, (recog) => recog.values)
  recognition: Recognition;
}
