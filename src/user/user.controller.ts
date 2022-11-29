import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entitiy';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreteDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
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

  @Get('id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }
}
