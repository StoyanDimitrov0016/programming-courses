import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: Prisma.EmployeeCreateInput) {
    return this.db.employee.create({ data });
  }

  async findAll(role?: Role) {
    if (role) return this.db.employee.findMany({ where: { role } });
    return this.db.employee.findMany();
  }

  async findOne(id: number) {
    return this.db.employee.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.EmployeeUpdateInput) {
    return this.db.employee.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.db.employee.delete({ where: { id } });
  }
}
