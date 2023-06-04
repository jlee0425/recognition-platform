import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import PublicRoute from 'src/utils/PublicRoute';
import mock from 'src/__mock__/userProfile';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fetchUser(id);
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
