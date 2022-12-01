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
  constructor(private userService: UserService) { }

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return this.userService.pagenate(page);
  }

  @Post()
  async create(@Body() body: UserCreteDto): Promise<User> {
    const hashedPassword = await bcrypt.hash('1234', 12);
    const { role_id, ...data } = body;
    return this.userService.create({
      ...data,
      hashedPassword,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;
    await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
