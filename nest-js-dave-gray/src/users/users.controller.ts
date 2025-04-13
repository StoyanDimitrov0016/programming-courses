import { UsersService } from './users.service';
import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  createOne(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.createOne(user);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body()
    data: Partial<{
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    }>,
  ) {
    return this.usersService.updateOne(parseInt(id), data);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }
}
