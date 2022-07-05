import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedGuard } from '../auth/guards/authorized-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(AuthorizedGuard)
  GetUsers() {
    return this.userService.getAll();
  }
}
