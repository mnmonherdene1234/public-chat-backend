import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { AccessDto } from './dto/access.dto';
import { UserService } from './user.service';

@UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  signUp(@Body() signUpDto: AccessDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: AccessDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    return this.userService.profile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change_username')
  changeUsername(@Req() req: any, @Body('username') username: string) {
    return this.userService.changeUsername(req.user.id, username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change_password')
  changePassword(@Req() req: any, @Body('password') password: string) {
    return this.userService.changePassword(req.user.id, password);
  }
}
