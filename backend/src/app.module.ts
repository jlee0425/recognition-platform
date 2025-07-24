import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { RecognitionsModule } from './recognitions/recognitions.module';
import { Recognition } from './typeorm/entities/Recognition';
import { RecognitionValue } from './typeorm/entities/RecognitionValue';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'recognition_program',
      entities: [User, Profile, Recognition, RecognitionValue],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    JwtModule,
    RecognitionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
