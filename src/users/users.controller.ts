import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../auth/public/public.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/crate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  getAll(@Query('status') status?: 'ACTIVE' | 'INACTIVE') {
    return this.usersService.findAll(status);
  }

  // @Post('login')
  // getOneByEmail(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
  //   return this.usersService.findOneByEmail(updateUserDto.email || '');
  // }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
