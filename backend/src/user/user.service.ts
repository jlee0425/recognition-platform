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
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async findOneByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByUserId(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'manager', 'manager.profile'],
      select: {
        id: true,
        username: true,
        manager: {
          id: true,
          profile: {
            id: true,
            firstname: true,
            lastname: true,
            location: true,
            department: true,
            description: true,
            phone: true,
            email: true,
          },
        },
        profile: {
          id: true,
          firstname: true,
          lastname: true,
          location: true,
          department: true,
          description: true,
          phone: true,
          email: true,
        },
      },
    });
  }

  async fetchUsers(curUserId: number) {
    const users = await this.userRepository.find({
      relations: ['profile', 'manager'],
      select: {
        id: true,
        profile: {
          id: true,
          firstname: true,
          lastname: true,
          location: true,
          department: true,
          description: true,
          phone: true,
          email: true,
        },
        manager: {
          id: true,
          profile: {
            id: true,
            firstname: true,
            lastname: true,
            location: true,
            department: true,
            description: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    return users.filter((u) => u.id !== curUserId);
  }

  fetchUser(id: number) {
    return this.userRepository.findOne({
      relations: ['profile'],
      where: { id },
    });
  }

  async updateUserProfile(id: number, params: Partial<UpdateUserParams>) {
    const user = await this.userRepository.findOneBy({ id });
    const newProfile = this.profileRepository.create(params);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }

  async updateUserManager(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const manager = await this.userRepository.findOneBy({
      id: id < 11 ? 15 : 1,
    });

    user.manager = manager;
    return this.userRepository.save(user);
  }
}
