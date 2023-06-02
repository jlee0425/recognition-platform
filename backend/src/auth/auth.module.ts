import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UserService } from 'src/user/services/user/user.service';
import { AuthController } from './contollers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule {}
