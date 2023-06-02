import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UpdateUserParams } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profilerRepository: Repository<Profile>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  fetchUsers() {
    return this.userRepository.find({ relations: ['profile'] });
  }

  fetchUser(id: number) {
    return this.userRepository.findOne({
      relations: ['profile'],
      where: { id },
    });
  }

  async updateUserProfile(id: number, params: Partial<UpdateUserParams>) {
    const user = await this.userRepository.findOneBy({ id });
    const newProfile = this.profilerRepository.create(params);
    const savedProfile = await this.profilerRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }
}
