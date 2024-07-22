import { IsString, IsOptional, IsBoolean, IsInt, MinLength } from 'class-validator';

export class TodoDto {
  @IsString()
  @MinLength(1)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly isCompleted?: boolean;

  
//   readonly userId?: number;
}