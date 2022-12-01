import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserCreteDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
