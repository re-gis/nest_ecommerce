import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDetails: any) {
    return await this.userService.findByLogin(userDetails);
  }

  @Post('register')
  async register(@Body() userDetails: any) {
    await this.userService.create(userDetails);
  }
}
