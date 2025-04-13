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
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  createOne(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return { id };
  }
}
