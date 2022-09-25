import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@UseInterceptors(LogInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: UserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: UserDto) {
    return this.authService.login(loginDto);
  }
}
