import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  readonly usernameOrEmail: string;

  @IsString()
  readonly password: string;
}
