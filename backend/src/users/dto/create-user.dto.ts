import { IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(6, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
