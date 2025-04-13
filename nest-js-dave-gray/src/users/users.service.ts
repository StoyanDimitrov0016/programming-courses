import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createOne(data: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const id = this.users.length++;
    const user = { id, ...data };

    this.users.push(user);
    return user;
  }

  updateOne(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    }>,
  ) {
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
