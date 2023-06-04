import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByUserName(username);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  async fetchUser(userId: number) {
    const user = await this.userService.findOneByUserId(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
