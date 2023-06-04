import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IS_PUBLIC_ROUTE } from 'src/auth/constants';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SetMetadata(IS_PUBLIC_ROUTE, true)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserProfile(@Request() req) {
    return this.authService.fetchUser(req['user'].userId);
  }
}
