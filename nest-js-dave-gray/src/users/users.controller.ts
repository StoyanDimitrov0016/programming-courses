import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  createOne(@Body(ValidationPipe) data: CreateUserDto) {
    return this.usersService.createOne(data);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, data);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteOne(id);
  }
}
