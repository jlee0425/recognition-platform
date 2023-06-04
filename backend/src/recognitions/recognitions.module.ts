import { Module } from '@nestjs/common';
import { RecognitionsService } from './recognitions.service';
import { RecognitionsController } from './recognitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserService } from 'src/user/user.service';
import { Recognition } from 'src/typeorm/entities/Recognition';
import { RecognitionValue } from 'src/typeorm/entities/RecognitionValue';
import { Profile } from 'src/typeorm/entities/Profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Recognition, RecognitionValue]),
  ],
  controllers: [RecognitionsController],
  providers: [RecognitionsService, UserService],
})
export class RecognitionsModule {}
