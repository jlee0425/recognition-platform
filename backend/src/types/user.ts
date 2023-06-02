import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';

export interface LoginParams {
  username: string;
  password: string;
}

export interface UpdateUserParams
  extends Pick<User, 'password'>,
    Omit<Profile, 'id'> {}
