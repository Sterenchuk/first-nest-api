//TODO fix status and role exeptions
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { USER_SELECT_FIELDS, USER_PASSWORD } from './constants/constants';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    return this.databaseService.user.create({
      data: createUserDto,
      select: {
        ...USER_SELECT_FIELDS,
      },
    });
  }

  async findAll(status?: 'ACTIVE' | 'INACTIVE') {
    if (status)
      return this.databaseService.user.findMany({
        where: { status },
        select: {
          ...USER_SELECT_FIELDS,
        },
      });

    return this.databaseService.user.findMany({
      select: {
        ...USER_SELECT_FIELDS,
      },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
      select: {
        ...USER_PASSWORD,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: {
        ...USER_SELECT_FIELDS,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        ...USER_SELECT_FIELDS,
      },
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
      select: {
        ...USER_SELECT_FIELDS,
      },
    });
  }
}
