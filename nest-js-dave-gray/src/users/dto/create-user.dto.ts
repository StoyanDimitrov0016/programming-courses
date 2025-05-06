import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message:
      'Valid role required. Supported roles: INTERN, ENGINEER, and ADMIN',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
