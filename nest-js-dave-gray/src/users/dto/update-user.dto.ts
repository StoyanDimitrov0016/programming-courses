import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// *If Swagger implemented: import { PartialType } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
