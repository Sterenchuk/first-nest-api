import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Status } from '@prisma/client'; // Import Prisma Enums

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Status, {
    message: 'Status must be either ACTIVE or INACTIVE',
  })
  status: Status;
}
