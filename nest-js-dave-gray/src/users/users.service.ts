import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@mail.com', role: 'INTERN' },
    { id: 2, name: 'Jane Smith', email: 'jane.s@mail.com', role: 'ENGINEER' },
    { id: 3, name: 'Bob Johnson', email: 'bob.j@mail.com', role: 'ADMIN' },
    { id: 4, name: 'Alice Brown', email: 'alice.b@mail.com', role: 'INTERN' },
    { id: 5, name: 'Tom White', email: 'tom.w@mail.com', role: 'ENGINEER' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const filtered = this.users.filter((user) => user.role === role);
      if (filtered.length === 0) {
        throw new NotFoundException('Unsupported user role.');
      }
      return filtered;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with ID: ${id} not found.`);
    return user;
  }

  createOne(data: CreateUserDto) {
    const id = Math.max(...this.users.map((user) => user.id)) + 1;
    const user = { id, ...data };

    this.users.push(user);
    return user;
  }

  updateOne(id: number, data: UpdateUserDto) {
    const position = this.users.findIndex((user) => user.id === id);
    const user = this.users[position];
    const updated = { ...user, ...data };

    this.users[position] = updated;
    return updated;
  }

  deleteOne(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
