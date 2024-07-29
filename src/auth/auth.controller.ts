import { Controller, Post, UseGuards, Body, Req, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() AuthDto: AuthDto,
    @Res({passthrough: true}) response: Response,
  ) {
    const { message, accessToken } = await this.authService.signUp(AuthDto.username, AuthDto.email, AuthDto.password);
    response.status(HttpStatus.CREATED).json({ message, accessToken });
  }

  @Post('signin')
  async signIn(
    @Body() AuthDto: AuthDto,
    @Res({passthrough: true}) response: Response  
  ) {
    const { accessToken } = await this.authService.login(AuthDto.email, AuthDto.password);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });
    response.json({ message: 'Logged in successfully' });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      maxAge: 0,
    });
    response.json({ message: 'Logged out successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req){
    return req.user;
  }
}
