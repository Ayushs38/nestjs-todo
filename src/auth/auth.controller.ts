<<<<<<< HEAD
<<<<<<< HEAD
import { Controller, Post, UseGuards, Body, Req, Get, Res, HttpStatus } from '@nestjs/common';
=======
import { Controller, Request, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
>>>>>>> parent of 491cbc4 (signin dto deleted)
=======
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
<<<<<<< HEAD
import { SignInDto } from './signin.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Response, response } from 'express';
=======
import { AuthGuard } from './auth.guard';
import { Request as Req } from 'express';


>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
<<<<<<< HEAD
  async signUp(
    @Body() AuthDto: AuthDto,
    @Res({passthrough: true}) response: Response,
  ) {
    const { message, accessToken } = await this.authService.signUp(AuthDto.username, AuthDto.email, AuthDto.password);
    response.status(HttpStatus.CREATED).json({ message, accessToken });
=======
  
  async signUp(@Body() AuthDto: AuthDto): Promise<void> {
    return this.AuthService.signUp(AuthDto.username, AuthDto.email,AuthDto.password);
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
<<<<<<< HEAD
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
=======
  async signIn(@Body() AuthDto: AuthDto): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(AuthDto.email, AuthDto.password);
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    console.log("request: ",req.user);
    return req.user;
  }
}
