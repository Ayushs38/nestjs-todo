import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() AuthDto: AuthDto) {
    
    return this.authService.signUp(AuthDto.username, AuthDto.email, AuthDto.password);
  }

  @Post('signin')
  async signIn(@Body() AuthDto: AuthDto) {
    return this.authService.login(AuthDto.email, AuthDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req){
    return req.user;
  }
}
