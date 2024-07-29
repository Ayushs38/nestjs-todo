import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ email: 'email', username: 'username' });
  }

  async validate(username: string, email: string,  password: string): Promise<any> {
    const user = await this.authService.validateUser(username, email, password);
    if (!user) {
      throw new UnauthorizedException("error validating user");
    }
    // console.log("User local strategy:", user);
    return {
      user: user
    };
  }
}
