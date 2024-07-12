import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { Request as Req } from 'express';



@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  
  async signUp(@Body() AuthDto: AuthDto): Promise<void> {
    return this.AuthService.signUp(AuthDto.username, AuthDto.email,AuthDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() AuthDto: AuthDto): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(AuthDto.email, AuthDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    console.log("request: ",req.user);
    return req.user;
  }
}
