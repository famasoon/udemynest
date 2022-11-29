import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entitiy';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreteDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return this.userService.pagenate(page);
  }

  @Post()
  async create(@Body() body: UserCreteDto): Promise<User> {
    const hashedPassword = await bcrypt.hash('1234', 12);
    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      hashedPassword,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
