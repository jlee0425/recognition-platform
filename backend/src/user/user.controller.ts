import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import mock from 'src/__mock__/userProfile';
import PublicRoute from 'src/utils/PublicRoute';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUsers(@Request() req) {
    return this.userService.fetchUsers(req['user'].userId);
  }

  @PublicRoute()
  @Post('/update-user')
  syncUserProfile() {
    mock.forEach(({ id, ...params }) =>
      this.userService.updateUserProfile(id, params),
    );

    return;
  }

  @PublicRoute()
  @Post('/update-manager')
  linkUserManager() {
    [...Array(20).keys()]
      .map((i) => i + 1)
      .forEach((id) => this.userService.updateUserManager(id));

    return;
  }
}
