import { Injectable } from '@nestjs/common';
import { User } from './models/user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
