import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import PublicRoute from 'src/utils/PublicRoute';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto, @Res() res: Response) {
    const jwt = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.setHeader('Authorization', `Bearer ${jwt.access_token}`);
    res.cookie('access_token', jwt.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({
      messsage: 'login successful',
      token: jwt.access_token,
    });
  }

  @PublicRoute()
  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('access_token', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'logout successful',
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserProfile(@Request() req) {
    return this.authService.fetchUser(req['user'].userId);
  }
}
