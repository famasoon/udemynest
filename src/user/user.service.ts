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

  async pagenate(page = 1): Promise<any> {
    const take = 1;
    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...data } = user;
        return data;
      }),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
