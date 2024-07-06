import { IsEmail, IsString,  MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  readonly username?: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  // @MinLength(6)
  readonly password: string;
}
