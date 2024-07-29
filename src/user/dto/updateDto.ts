import {  IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto{
   @IsString()
   @MinLength(1)
   readonly username?: string;

   @IsOptional()
   @IsString()
   readonly profilePicUrl?: string;

   @IsString()
   @MinLength(1)
   readonly firstname: string;

   @IsString()
   @MinLength(1)
   readonly lastname: string;

   @IsOptional()
   @IsString()
   readonly bio?: string;

   @MinLength(10)
   @IsOptional()
   @IsString()
   readonly phoneNumber?: string ;

}